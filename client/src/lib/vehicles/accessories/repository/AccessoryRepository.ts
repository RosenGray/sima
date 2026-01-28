import { Accessory, IAccessory } from "../models/Accessory";
import connectDB from "@/lib/mongo/mongodb";
import { SerializedAccessory } from "../types/accessory.types";
import { FilterQuery } from "mongoose";
import sanitize from "mongo-sanitize";

export interface AccessorySearchFilters {
  category?: string[];
  kind?: string[];
  priceFrom?: number;
  priceTo?: number;
  district?: string[];
  city?: string[];
}

interface PaginatedResponse {
  data: SerializedAccessory[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

class AccessoryRepository {
  async getAll(
    searchFilters: AccessorySearchFilters = {},
    currentPage: number = 1,
    pageSize: number = 10
  ): Promise<PaginatedResponse> {
    try {
      await connectDB();

      // Sanitize all incoming filters to prevent NoSQL injection
      const sanitizedFilters: AccessorySearchFilters = {
        category: sanitize(searchFilters.category),
        kind: sanitize(searchFilters.kind),
        priceFrom: sanitize(searchFilters.priceFrom),
        priceTo: sanitize(searchFilters.priceTo),
        district: sanitize(searchFilters.district),
        city: sanitize(searchFilters.city),
      };

      // Build search filter using MongoDB query
      const searchFilter: FilterQuery<typeof Accessory> = {};

      // Add category filter
      if (sanitizedFilters.category) {
        searchFilter.category = { $in: sanitizedFilters.category };
      }

      // Add kind filter
      if (sanitizedFilters.kind) {
        searchFilter.kind = { $in: sanitizedFilters.kind };
      }

      // Add district filter
      if (sanitizedFilters.district) {
        searchFilter.district = { $in: sanitizedFilters.district };
      }

      // Add city filter
      if (sanitizedFilters.city) {
        searchFilter.city = { $in: sanitizedFilters.city };
      }

      // Add price range filters
      // Handle priceFrom (minimum price)
      if (sanitizedFilters.priceFrom !== undefined && sanitizedFilters.priceFrom !== null) {
        const priceFromNum = Number(sanitizedFilters.priceFrom);
        if (!Number.isNaN(priceFromNum) && priceFromNum >= 0) {
          searchFilter.price = { $gte: priceFromNum };
        }
      }

      // Handle priceTo (maximum price)
      if (sanitizedFilters.priceTo !== undefined && sanitizedFilters.priceTo !== null) {
        const priceToNum = Number(sanitizedFilters.priceTo);
        if (!Number.isNaN(priceToNum) && priceToNum >= 0) {
          // Combine with existing price filter if exists
          if (searchFilter.price) {
            searchFilter.price = {
              ...searchFilter.price,
              $lte: priceToNum,
            };
          } else {
            searchFilter.price = { $lte: priceToNum };
          }
        }
      }

      // Calculate pagination
      const skip = (currentPage - 1) * pageSize;

      // Get total count for pagination
      const totalCount = await Accessory.countDocuments(searchFilter);
      const totalPages = Math.ceil(totalCount / pageSize);

      // Fetch paginated results
      const accessories = await Accessory.find(searchFilter)
        .populate("user")
        .sort({ createdAt: -1 }) // Sort by newest first
        .skip(skip)
        .limit(pageSize);

      // Serialize to remove MongoDB ObjectIds and other non-serializable types
      const serialized = JSON.parse(JSON.stringify(accessories));

      return {
        data: serialized,
        totalCount,
        currentPage,
        totalPages,
        hasNextPage: currentPage < totalPages,
        hasPreviousPage: currentPage > 1,
      };
    } catch (error) {
      console.error("Error fetching accessories:", error);
      throw new Error("Failed to fetch accessories");
    }
  }

  async getByPublicId(publicId: string): Promise<SerializedAccessory | null> {
    try {
      await connectDB();

      const accessory = await Accessory.findOne({
        publicId,
      }).populate("user");

      if (!accessory) {
        return null;
      }

      // Serialize to remove MongoDB ObjectIds and other non-serializable types
      const serialized = JSON.parse(JSON.stringify(accessory));

      return serialized;
    } catch (error) {
      console.error("Error fetching accessory:", error);
      throw new Error("Failed to fetch accessory");
    }
  }

  async create(
    data: Omit<IAccessory, "id" | "createdAt" | "updatedAt">
  ): Promise<SerializedAccessory> {
    try {
      await connectDB();

      const accessory = new Accessory(data);
      await accessory.save();
      await accessory.populate("user");

      // Serialize to remove MongoDB ObjectIds and other non-serializable types
      const serialized = JSON.parse(JSON.stringify(accessory));

      return serialized;
    } catch (error) {
      console.error("Error creating accessory:", error);
      throw new Error("Failed to create accessory");
    }
  }

  async edit(
    publicId: string,
    updateData: Partial<IAccessory>
  ): Promise<SerializedAccessory | null> {
    try {
      await connectDB();

      const accessory = await Accessory.findOneAndUpdate(
        { publicId },
        { ...updateData },
        { new: true, runValidators: true }
      ).populate("user");

      if (!accessory) {
        return null;
      }

      await accessory.save();

      // Serialize to remove MongoDB ObjectIds and other non-serializable types
      const serialized = JSON.parse(JSON.stringify(accessory));

      return serialized;
    } catch (error) {
      console.error("Error updating accessory:", error);
      throw new Error("Failed to update accessory");
    }
  }

  async delete(publicId: string): Promise<boolean> {
    try {
      await connectDB();

      const result = await Accessory.findOneAndDelete({ publicId });

      return result !== null;
    } catch (error) {
      console.error("Error deleting accessory:", error);
      throw new Error("Failed to delete accessory");
    }
  }
}

export const accessoryRepository = new AccessoryRepository();
