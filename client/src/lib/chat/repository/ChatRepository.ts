import connectDB from "@/lib/mongo/mongodb";
import mongoose from "mongoose";
import { nanoid } from "nanoid";
import sanitize from "mongo-sanitize";
import { Conversation } from "../models/Conversation";
import { Message } from "../models/Message";
import { User } from "@/lib/auth/models/User";
import type {
  AdSnapshot,
  SerializedConversationListItem,
  SerializedConversationWithMessages,
  SerializedMessage,
} from "../types/chat.types";
import type { IAdSnapshot } from "../models/Conversation";

interface LeanConversation {
  _id: mongoose.Types.ObjectId;
  publicId: string;
  participants: mongoose.Types.ObjectId[];
  adSnapshot: IAdSnapshot;
  updatedAt?: Date;
}

function toObjectId(id: string): mongoose.Types.ObjectId {
  return new mongoose.Types.ObjectId(id);
}

function sortParticipantIds(a: string, b: string): [string, string] {
  return a < b ? [a, b] : [b, a];
}

/** Deterministic key for one conversation per (participant set + ad). */
function buildConversationKey(
  p0: string,
  p1: string,
  entityType: string,
  entityPublicId: string
): string {
  return `${p0}_${p1}_${entityType}_${entityPublicId}`;
}

export class ChatRepository {
  async getOrCreateConversation(
    userId: string,
    adOwnerId: string,
    adEntityType: string,
    adPublicId: string,
    adSnapshot: IAdSnapshot
  ): Promise<{ publicId: string }> {
    await connectDB();

    const uid = sanitize(userId);
    const ownerId = sanitize(adOwnerId);
    if (uid === ownerId) {
      throw new Error("Cannot create chat with yourself");
    }

    const [p0, p1] = sortParticipantIds(uid, ownerId);
    const participantIds = [toObjectId(p0), toObjectId(p1)];
    const conversationKey = buildConversationKey(
      p0,
      p1,
      sanitize(adEntityType),
      sanitize(adPublicId)
    );

    // Find existing conversation by deterministic key (avoids multikey unique index issues)
    let conv = await Conversation.findOne({ conversationKey });

    // Backfill conversationKey for docs created before this field existed
    if (!conv) {
      conv = await Conversation.findOne({
        participants: { $all: participantIds },
        "adSnapshot.entityType": sanitize(adEntityType),
        "adSnapshot.entityPublicId": sanitize(adPublicId),
      });
      if (conv) {
        await Conversation.updateOne(
          { _id: conv._id },
          { $set: { conversationKey } }
        );
        conv.conversationKey = conversationKey;
      }
    }

    if (!conv) {
      conv = await Conversation.create({
        publicId: nanoid(10),
        conversationKey,
        participants: participantIds,
        adSnapshot: {
          entityType: adSnapshot.entityType,
          entityPublicId: adSnapshot.entityPublicId,
          title: adSnapshot.title,
          thumbnailUrl: adSnapshot.thumbnailUrl,
          price: adSnapshot.price,
          adLink: adSnapshot.adLink,
          adRemoved: adSnapshot.adRemoved ?? false,
        },
        deletedByUserIds: [],
      });
    }

    return { publicId: conv.publicId };
  }

  async getConversationsByUserId(
    userId: string
  ): Promise<SerializedConversationListItem[]> {
    await connectDB();

    const uid = toObjectId(sanitize(userId));

    const conversations = (await Conversation.find({
      participants: uid,
      deletedByUserIds: { $ne: uid },
    })
      .sort({ updatedAt: -1 })
      .lean()) as unknown as LeanConversation[];

    const list: SerializedConversationListItem[] = [];

    for (const c of conversations) {
      const otherId = c.participants.find(
        (p) => p.toString() !== userId
      );
      if (!otherId) continue;

      const [lastMessage] = await Message.find({
        conversation: c._id,
      })
        .sort({ createdAt: -1 })
        .limit(1)
        .lean();

      const user = await User.findById(otherId).lean();
      if (!user) continue;

      const raw = user as Record<string, unknown>;
      const serializedUser = {
        ...JSON.parse(JSON.stringify(user)),
        id: (raw._id as mongoose.Types.ObjectId)?.toString?.() ?? raw.id,
        lastSeenAt:
          raw.lastSeenAt != null
            ? new Date(raw.lastSeenAt as Date).toISOString()
            : undefined,
      };

      list.push({
        publicId: c.publicId,
        otherParticipant: serializedUser,
        adSnapshot: c.adSnapshot as AdSnapshot,
        lastMessageSnippet: lastMessage
          ? String(lastMessage.body).slice(0, 80)
          : undefined,
        lastMessageAt: lastMessage?.createdAt
          ? new Date(lastMessage.createdAt).toISOString()
          : c.updatedAt
            ? new Date(c.updatedAt).toISOString()
            : undefined,
      });
    }

    return list;
  }

  async getConversationByPublicId(
    publicId: string,
    userId: string
  ): Promise<SerializedConversationWithMessages | null> {
    await connectDB();

    const uid = toObjectId(sanitize(userId));
    const conv = (await Conversation.findOne({
      publicId: sanitize(publicId),
      participants: uid,
      deletedByUserIds: { $ne: uid },
    }).lean()) as unknown as LeanConversation | null;

    if (!conv) return null;

    const otherId = conv.participants.find(
      (p) => p.toString() !== userId
    );
    if (!otherId) return null;

    const user = await User.findById(otherId).lean();
    if (!user) return null;

    const messages = await Message.find({ conversation: conv._id })
      .sort({ createdAt: 1 })
      .lean();

    const raw = user as Record<string, unknown>;
    const serializedUser = {
      ...JSON.parse(JSON.stringify(user)),
      id: (raw._id as mongoose.Types.ObjectId)?.toString?.() ?? raw.id,
      lastSeenAt:
        raw.lastSeenAt != null
          ? new Date(raw.lastSeenAt as Date).toISOString()
          : undefined,
    };
    const serializedMessages: SerializedMessage[] = messages.map((m) => ({
      id: (m as unknown as { _id: mongoose.Types.ObjectId })._id.toString(),
      conversationId: conv.publicId,
      senderId: (m.sender as mongoose.Types.ObjectId).toString(),
      body: m.body,
      createdAt: new Date(m.createdAt!).toISOString(),
    }));

    return {
      publicId: conv.publicId,
      otherParticipant: serializedUser,
      adSnapshot: conv.adSnapshot as AdSnapshot,
      messages: serializedMessages,
    };
  }

  async getMessages(
    conversationPublicId: string,
    userId: string
  ): Promise<SerializedMessage[]> {
    await connectDB();

    const conv = (await Conversation.findOne({
      publicId: sanitize(conversationPublicId),
      participants: toObjectId(sanitize(userId)),
      deletedByUserIds: { $ne: toObjectId(userId) },
    }).lean()) as unknown as LeanConversation | null;

    if (!conv) return [];

    const messages = await Message.find({ conversation: conv._id })
      .sort({ createdAt: 1 })
      .lean();

    return messages.map((m) => ({
      id: (m as unknown as { _id: mongoose.Types.ObjectId })._id.toString(),
      conversationId: conv.publicId,
      senderId: (m.sender as mongoose.Types.ObjectId).toString(),
      body: m.body,
      createdAt: new Date(m.createdAt!).toISOString(),
    }));
  }

  async createMessage(
    conversationPublicId: string,
    userId: string,
    body: string
  ): Promise<SerializedMessage | null> {
    await connectDB();

    const uid = toObjectId(sanitize(userId));
    const conv = await Conversation.findOne({
      publicId: sanitize(conversationPublicId),
      participants: uid,
      deletedByUserIds: { $ne: uid },
    });

    if (!conv) return null;

    const trimmed = String(body).trim();
    if (!trimmed) return null;

    const msg = await Message.create({
      conversation: conv._id,
      sender: uid,
      body: trimmed,
    });

    await Conversation.updateOne(
      { _id: conv._id },
      { $set: { updatedAt: new Date() } }
    );

    return {
      id: msg._id.toString(),
      conversationId: conv.publicId,
      senderId: userId,
      body: msg.body,
      createdAt: msg.createdAt!.toISOString(),
    };
  }

  async deleteConversationForUser(
    conversationPublicId: string,
    userId: string
  ): Promise<boolean> {
    await connectDB();

    const uid = toObjectId(sanitize(userId));
    const conv = await Conversation.findOne({
      publicId: sanitize(conversationPublicId),
      participants: uid,
    });

    if (!conv) return false;

    // Hard delete: remove all messages and the conversation document from DB
    await Message.deleteMany({ conversation: conv._id });
    await Conversation.deleteOne({ _id: conv._id });
    return true;
  }
}

export const chatRepository = new ChatRepository();
