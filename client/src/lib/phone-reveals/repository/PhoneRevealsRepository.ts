import mongoose from "mongoose";
import connectDB from "@/lib/mongo/mongodb";
import { AdPhoneReveal } from "../models/AdPhoneReveal";
import { EntityType } from "@/lib/constants/entityTypes";

interface RecordRevealParams {
  userId: string;
  entityType: EntityType;
  entityPublicId: string;
}

class PhoneRevealsRepository {
  async recordReveal({
    userId,
    entityType,
    entityPublicId,
  }: RecordRevealParams): Promise<void> {
    await connectDB();

    const filter = {
      userId: new mongoose.Types.ObjectId(userId),
      entityType,
      entityPublicId,
    };

    await AdPhoneReveal.findOneAndUpdate(
      filter,
      { $setOnInsert: filter },
      { upsert: true, new: false }
    );
  }

  async getRevealCount(
    entityType: EntityType,
    entityPublicId: string
  ): Promise<number> {
    await connectDB();
    return AdPhoneReveal.countDocuments({ entityType, entityPublicId });
  }

  async getTotalCountForAds(
    ads: { entityType: EntityType; entityPublicId: string }[]
  ): Promise<number> {
    if (ads.length === 0) return 0;
    await connectDB();
    return AdPhoneReveal.countDocuments({ $or: ads });
  }
}

export const phoneRevealsRepository = new PhoneRevealsRepository();
