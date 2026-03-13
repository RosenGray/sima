import mongoose from "mongoose";

import "@/lib/auth/models/User";
import { EntityType } from "@/lib/constants/entityTypes";

export interface IAdView {
  id: string;
  entityType: EntityType;
  entityPublicId: string;
  userId?: mongoose.Types.ObjectId;
  ip?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const adViewSchema = new mongoose.Schema<IAdView>(
  {
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
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      sparse: true,
    },
    ip: {
      type: String,
      sparse: true,
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

adViewSchema.index(
  { userId: 1, entityType: 1, entityPublicId: 1 },
  { unique: true, partialFilterExpression: { userId: { $exists: true } } }
);

adViewSchema.index(
  { ip: 1, entityType: 1, entityPublicId: 1 },
  { unique: true, partialFilterExpression: { ip: { $exists: true } } }
);

adViewSchema.index({ entityType: 1, entityPublicId: 1 });

export const AdView =
  mongoose.models.AdView || mongoose.model<IAdView>("AdView", adViewSchema);
