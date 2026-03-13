import mongoose from "mongoose";
import connectDB from "@/lib/mongo/mongodb";
import { AdView } from "../models/AdView";
import { EntityType } from "@/lib/constants/entityTypes";

interface RecordViewParams {
  entityType: EntityType;
  entityPublicId: string;
  userId?: string;
  ip?: string;
}

class ViewsRepository {
  async recordView({
    entityType,
    entityPublicId,
    userId,
    ip,
  }: RecordViewParams): Promise<void> {
    await connectDB();

    const filter = userId
      ? {
          userId: new mongoose.Types.ObjectId(userId),
          entityType,
          entityPublicId,
        }
      : { ip, entityType, entityPublicId };

    const doc = userId
      ? { userId: new mongoose.Types.ObjectId(userId), entityType, entityPublicId }
      : { ip, entityType, entityPublicId };

    await AdView.findOneAndUpdate(
      filter,
      { $setOnInsert: doc },
      { upsert: true, new: false }
    );
  }

  async getViewCount(
    entityType: EntityType,
    entityPublicId: string
  ): Promise<number> {
    await connectDB();
    return AdView.countDocuments({ entityType, entityPublicId });
  }

  async getTotalCountForAds(
    ads: { entityType: EntityType; entityPublicId: string }[]
  ): Promise<number> {
    if (ads.length === 0) return 0;
    await connectDB();
    return AdView.countDocuments({ $or: ads });
  }
}

export const viewsRepository = new ViewsRepository();
