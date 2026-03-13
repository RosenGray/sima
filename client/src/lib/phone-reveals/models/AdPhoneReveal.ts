import mongoose from "mongoose";

import "@/lib/auth/models/User";
import { EntityType } from "@/lib/constants/entityTypes";

export interface IAdPhoneReveal {
  id: string;
  entityType: EntityType;
  entityPublicId: string;
  userId: mongoose.Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

const adPhoneRevealSchema = new mongoose.Schema<IAdPhoneReveal>(
  {
    entityType: { type: String, required: true },
    entityPublicId: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
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

// One reveal per user per entity ever
adPhoneRevealSchema.index(
  { userId: 1, entityType: 1, entityPublicId: 1 },
  { unique: true }
);

// Fast count queries
adPhoneRevealSchema.index({ entityType: 1, entityPublicId: 1 });

export const AdPhoneReveal =
  mongoose.models.AdPhoneReveal ||
  mongoose.model<IAdPhoneReveal>("AdPhoneReveal", adPhoneRevealSchema);
