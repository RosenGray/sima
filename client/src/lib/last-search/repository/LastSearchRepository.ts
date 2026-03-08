import connectDB from "@/lib/mongo/mongodb";
import mongoose from "mongoose";
import { ILastSearch, LastSearch } from "../models/LastSearch";
import { EntityType } from "@/lib/constants/entityTypes";

interface UpsertData {
  entityType: EntityType;
  title: string;
  url: string;
  thumbnail: string;
  searchParamsHash: string;
}

class LastSearchRepository {
  private async enforceCap(userId: mongoose.Types.ObjectId): Promise<void> {
    const old = await LastSearch.find({ user: userId })
      .sort({ updatedAt: -1 })
      .skip(5)
      .select("_id")
      .lean();
    if (old.length) {
      await LastSearch.deleteMany({ _id: { $in: old.map((d) => d._id) } });
    }
  }

  async upsertSearch(
    userId: string,
    data: UpsertData
  ): Promise<ILastSearch | null> {
    await connectDB();
    const user = new mongoose.Types.ObjectId(userId);
    const { entityType, title, url, thumbnail, searchParamsHash } = data;

    await LastSearch.findOneAndUpdate(
      { user, searchParamsHash },
      {
        $set: { title, url, thumbnail, updatedAt: new Date() },
        $setOnInsert: { user, entityType, searchParamsHash },
      },
      { upsert: true, new: true }
    );

    await this.enforceCap(user);

    const doc = await LastSearch.findOne({ user, searchParamsHash }).lean();
    if (!doc) return null;
    return JSON.parse(JSON.stringify(doc)) as ILastSearch;
  }

  async getByUser(userId: string): Promise<ILastSearch[]> {
    await connectDB();
    const user = new mongoose.Types.ObjectId(userId);
    const docs = await LastSearch.find({ user })
      .sort({ updatedAt: -1 })
      .limit(5)
      .lean();
    const serialized = JSON.parse(
      JSON.stringify(docs)
    ) as Array<Record<string, unknown> & { _id: string }>;
    return serialized.map(({ _id, ...rest }) => ({ ...rest, id: _id })) as ILastSearch[];
  }

  async countByUser(userId: string): Promise<number> {
    await connectDB();
    const user = new mongoose.Types.ObjectId(userId);
    return LastSearch.countDocuments({ user });
  }

  async mergeMany(
    userId: string,
    searches: UpsertData[]
  ): Promise<ILastSearch[]> {
    await connectDB();
    const user = new mongoose.Types.ObjectId(userId);

    for (const data of searches.slice(0, 5)) {
      const { entityType, title, url, thumbnail, searchParamsHash } = data;
      await LastSearch.findOneAndUpdate(
        { user, searchParamsHash },
        {
          $set: { title, url, thumbnail, updatedAt: new Date() },
          $setOnInsert: { user, entityType, searchParamsHash },
        },
        { upsert: true }
      );
    }

    await this.enforceCap(user);

    return this.getByUser(userId);
  }

  async deleteById(userId: string, id: string): Promise<boolean> {
    if (!mongoose.Types.ObjectId.isValid(id)) return false;
    await connectDB();
    const user = new mongoose.Types.ObjectId(userId);
    const _id = new mongoose.Types.ObjectId(id);
    const result = await LastSearch.findOneAndDelete({ _id, user });
    return result !== null;
  }
}

export const lastSearchRepository = new LastSearchRepository();
