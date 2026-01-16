import { SpecialVehicle, ISpecialVehicle } from "../models/SpecialVehicle";
import connectDB from "@/lib/mongo/mongodb";
import { SerializedSpecialVehicle } from "../types/specialVehicle.types";
import { FilterQuery } from "mongoose";
import sanitize from "mongo-sanitize";

export interface SpecialVehicleSearchFilters {
  category?: string[];
  kind?: string[];
  priceFrom?: number;
  priceTo?: number;
  district?: string[];
  city?: string[];
}

interface PaginatedResponse {
  data: SerializedSpecialVehicle[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

class SpecialVehicleRepository {
  async getAll(
    searchFilters: SpecialVehicleSearchFilters = {},
    currentPage: number = 1,
    pageSize: number = 10
  ): Promise<PaginatedResponse> {
    try {
      await connectDB();

      // Sanitize all incoming filters to prevent NoSQL injection
      const sanitizedFilters: SpecialVehicleSearchFilters = {
        category: sanitize(searchFilters.category),
        kind: sanitize(searchFilters.kind),
        priceFrom: sanitize(searchFilters.priceFrom),
        priceTo: sanitize(searchFilters.priceTo),
        district: sanitize(searchFilters.district),
        city: sanitize(searchFilters.city),
      };

      // Build search filter using MongoDB query
      const searchFilter: FilterQuery<typeof SpecialVehicle> = {};

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
      const totalCount = await SpecialVehicle.countDocuments(searchFilter);
      const totalPages = Math.ceil(totalCount / pageSize);

      // Fetch paginated results
      const specialVehicles = await SpecialVehicle.find(searchFilter)
        .populate("user")
        .sort({ createdAt: -1 }) // Sort by newest first
        .skip(skip)
        .limit(pageSize);

      // Serialize to remove MongoDB ObjectIds and other non-serializable types
      const serialized = JSON.parse(JSON.stringify(specialVehicles));

      return {
        data: serialized,
        totalCount,
        currentPage,
        totalPages,
        hasNextPage: currentPage < totalPages,
        hasPreviousPage: currentPage > 1,
      };
    } catch (error) {
      console.error("Error fetching special vehicles:", error);
      throw new Error("Failed to fetch special vehicles");
    }
  }

  async getByPublicId(publicId: string): Promise<SerializedSpecialVehicle | null> {
    try {
      await connectDB();

      const specialVehicle = await SpecialVehicle.findOne({
        publicId,
      }).populate("user");

      if (!specialVehicle) {
        return null;
      }

      // Serialize to remove MongoDB ObjectIds and other non-serializable types
      const serialized = JSON.parse(JSON.stringify(specialVehicle));

      return serialized;
    } catch (error) {
      console.error("Error fetching special vehicle:", error);
      throw new Error("Failed to fetch special vehicle");
    }
  }

  async create(
    data: Omit<ISpecialVehicle, "id" | "createdAt" | "updatedAt">
  ): Promise<SerializedSpecialVehicle> {
    try {
      await connectDB();

      const specialVehicle = new SpecialVehicle(data);
      await specialVehicle.save();
      await specialVehicle.populate("user");

      // Serialize to remove MongoDB ObjectIds and other non-serializable types
      const serialized = JSON.parse(JSON.stringify(specialVehicle));

      return serialized;
    } catch (error) {
      console.error("Error creating special vehicle:", error);
      throw new Error("Failed to create special vehicle");
    }
  }

  async edit(
    publicId: string,
    updateData: Partial<ISpecialVehicle>
  ): Promise<SerializedSpecialVehicle | null> {
    try {
      await connectDB();

      const specialVehicle = await SpecialVehicle.findOneAndUpdate(
        { publicId },
        { ...updateData },
        { new: true, runValidators: true }
      ).populate("user");

      if (!specialVehicle) {
        return null;
      }

      await specialVehicle.save();

      // Serialize to remove MongoDB ObjectIds and other non-serializable types
      const serialized = JSON.parse(JSON.stringify(specialVehicle));

      return serialized;
    } catch (error) {
      console.error("Error updating special vehicle:", error);
      throw new Error("Failed to update special vehicle");
    }
  }

  async delete(publicId: string): Promise<boolean> {
    try {
      await connectDB();

      const result = await SpecialVehicle.findOneAndDelete({
        publicId,
      });

      return result !== null;
    } catch (error) {
      console.error("Error deleting special vehicle:", error);
      throw new Error("Failed to delete special vehicle");
    }
  }
}

export const specialVehicleRepository = new SpecialVehicleRepository();
