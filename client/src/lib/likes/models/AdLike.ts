import mongoose from "mongoose";

import "@/lib/auth/models/User";
import { EntityType } from "@/lib/constants/entityTypes";

export interface IAdLike {
  id: string;
  user: mongoose.Types.ObjectId;
  entityType: EntityType;
  entityPublicId: string;
  createdAt?: Date;
}

const adLikeSchema = new mongoose.Schema<IAdLike>(
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
      index: true,
    },
    entityPublicId: {
      type: String,
      required: true,
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

adLikeSchema.index(
  { user: 1, entityType: 1, entityPublicId: 1 },
  { unique: true }
);

export const AdLike =
  mongoose.models.AdLike || mongoose.model<IAdLike>("AdLike", adLikeSchema);
