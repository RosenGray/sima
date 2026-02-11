import mongoose from "mongoose";

import "@/lib/auth/models/User";
import { EntityType } from "@/lib/constants/entityTypes";

export interface IAdSnapshot {
  entityType: EntityType;
  entityPublicId: string;
  title: string;
  thumbnailUrl: string;
  price?: number;
  adLink: string;
  adRemoved: boolean;
}

export interface IConversation {
  id: string;
  publicId: string;
  /** Deterministic key: sorted participant IDs + entityType + entityPublicId. Used for unique index (array fields create multikey indexes and break uniqueness per conversation). */
  conversationKey: string;
  participants: mongoose.Types.ObjectId[];
  adSnapshot: IAdSnapshot;
  deletedByUserIds: mongoose.Types.ObjectId[];
  createdAt?: Date;
  updatedAt?: Date;
}

const adSnapshotSchema = new mongoose.Schema<IAdSnapshot>(
  {
    entityType: { type: String, required: true },
    entityPublicId: { type: String, required: true },
    title: { type: String, required: true },
    thumbnailUrl: { type: String, required: true },
    price: { type: Number, required: false },
    adLink: { type: String, required: true },
    adRemoved: { type: Boolean, required: true, default: false },
  },
  { _id: false }
);

const conversationSchema = new mongoose.Schema<IConversation>(
  {
    publicId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    conversationKey: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    participants: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
      required: true,
      index: true,
    },
    adSnapshot: {
      type: adSnapshotSchema,
      required: true,
    },
    deletedByUserIds: {
      type: [mongoose.Schema.Types.ObjectId],
      default: [],
      index: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (_doc, ret: Record<string, unknown>) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

// One conversation per (participant set + ad). Cannot use participants array in unique index
// because MongoDB multikey index would create one entry per participant and block multiple
// conversations about the same ad (e.g. owner+user2 and owner+user3). conversationKey
// is a single string (sorted participant IDs + entityType + entityPublicId) so unique works.

export const Conversation =
  mongoose.models.Conversation ||
  mongoose.model<IConversation>("Conversation", conversationSchema);
