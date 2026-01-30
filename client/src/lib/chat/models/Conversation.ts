import mongoose from "mongoose";

import "@/lib/auth/models/User";

export interface IAdSnapshot {
  entityType: string;
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

// One conversation per (user1, user2, entityType, entityPublicId)
conversationSchema.index(
  { participants: 1, "adSnapshot.entityType": 1, "adSnapshot.entityPublicId": 1 },
  { unique: true }
);

export const Conversation =
  mongoose.models.Conversation ||
  mongoose.model<IConversation>("Conversation", conversationSchema);
