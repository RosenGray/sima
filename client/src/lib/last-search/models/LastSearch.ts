import mongoose from "mongoose";

import "@/lib/auth/models/User";
import { EntityType } from "@/lib/constants/entityTypes";

export interface ILastSearch {
  id: string;
  user: mongoose.Types.ObjectId;
  entityType: EntityType;
  title: string;
  url: string;
  thumbnail: string;
  searchParamsHash: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const lastSearchSchema = new mongoose.Schema<ILastSearch>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    entityType: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    searchParamsHash: {
      type: String,
      required: true,
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

// Deduplication — no same search twice per user
lastSearchSchema.index({ user: 1, searchParamsHash: 1 }, { unique: true });
// Fast "5 most recent" query
lastSearchSchema.index({ user: 1, updatedAt: -1 });

export const LastSearch =
  mongoose.models.LastSearch ||
  mongoose.model<ILastSearch>("LastSearch", lastSearchSchema);
