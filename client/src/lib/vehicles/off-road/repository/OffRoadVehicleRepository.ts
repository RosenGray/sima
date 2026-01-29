import { OffRoadVehicle, IOffRoadVehicle } from "../models/OffRoadVehicle";
import connectDB from "@/lib/mongo/mongodb";
import { SerializedOffRoadVehicle } from "../types/offRoadVehicle.types";
import type { FilterQuery } from "mongoose";
import sanitize from "mongo-sanitize";

export interface OffRoadVehicleSearchFilters {
  manufacturer?: string[];
  model?: string[];
  yearFrom?: string;
  yearTo?: string;
  numberOfHand?: string[];
  transmission?: string[];
  district?: string[];
  city?: string[];
  priceFrom?: number;
  priceTo?: number;
  color?: string;
}

interface PaginatedResponse {
  data: SerializedOffRoadVehicle[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

class OffRoadVehicleRepository {
  /**
   * Get all off-road vehicles with search and pagination
   * @param searchFilters - Object containing search criteria
   * @param currentPage - Current page number (1-based)
   * @param pageSize - Number of items per page (default: 10)
   * @returns Promise<PaginatedResponse> - Paginated response with data and metadata
   */
  async getAll(
    searchFilters: OffRoadVehicleSearchFilters = {},
    currentPage: number = 1,
    pageSize: number = 10
  ): Promise<PaginatedResponse> {
    try {
      await connectDB();

      // Sanitize all incoming filters to prevent NoSQL injection
      const sanitizedFilters: OffRoadVehicleSearchFilters = {
        manufacturer: sanitize(searchFilters.manufacturer),
        model: sanitize(searchFilters.model),
        yearFrom: sanitize(searchFilters.yearFrom),
        yearTo: sanitize(searchFilters.yearTo),
        numberOfHand: sanitize(searchFilters.numberOfHand),
        transmission: sanitize(searchFilters.transmission),
        district: sanitize(searchFilters.district),
        city: sanitize(searchFilters.city),
        priceFrom: sanitize(searchFilters.priceFrom),
        priceTo: sanitize(searchFilters.priceTo),
        color: sanitize(searchFilters.color),
      };

      // Build search filter using MongoDB query
      const searchFilter: FilterQuery<typeof OffRoadVehicle> = {};

      // Add manufacturer filter
      if (sanitizedFilters.manufacturer) {
        searchFilter.manufacturer = { $in: sanitizedFilters.manufacturer };
      }

      // Add model filter
      if (sanitizedFilters.model) {
        searchFilter.model = { $in: sanitizedFilters.model };
      }

      // Add year range filters
      // Handle yearFrom (minimum year)
      if (sanitizedFilters.yearFrom) {
        const yearFromNum = Number(sanitizedFilters.yearFrom);
        if (!Number.isNaN(yearFromNum)) {
          searchFilter.yearOfManufacture = { $gte: yearFromNum };
        }
      }

      // Handle yearTo (maximum year)
      if (sanitizedFilters.yearTo) {
        const yearToNum = Number(sanitizedFilters.yearTo);
        if (!Number.isNaN(yearToNum)) {
          // Combine with existing yearOfManufacture filter if exists
          if (searchFilter.yearOfManufacture) {
            searchFilter.yearOfManufacture = {
              ...searchFilter.yearOfManufacture,
              $lte: yearToNum,
            };
          } else {
            searchFilter.yearOfManufacture = { $lte: yearToNum };
          }
        }
      }

      // Add numberOfHand filter
      if (sanitizedFilters.numberOfHand) {
        const numberOfHandNums = sanitizedFilters.numberOfHand
          .map((hand) => Number(hand))
          .filter((num) => !Number.isNaN(num) && num >= 1);
        if (numberOfHandNums.length > 0) {
          searchFilter.numberOfHand = { $in: numberOfHandNums };
        }
      }

      // Add transmission filter
      if (sanitizedFilters.transmission) {
        searchFilter.transmission = { $in: sanitizedFilters.transmission };
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

      // Add color filter (text search with regex)
      if (sanitizedFilters.color?.trim()) {
        searchFilter.color = {
          $regex: sanitizedFilters.color.trim(),
          $options: "i", // Case-insensitive
        };
      }

      // Calculate pagination
      const skip = (currentPage - 1) * pageSize;

      // Get total count for pagination
      const totalCount = await OffRoadVehicle.countDocuments(searchFilter);
      const totalPages = Math.ceil(totalCount / pageSize);

      // Fetch paginated results
      const offRoadVehicles = await OffRoadVehicle.find(searchFilter)
        .populate("user")
        .sort({ createdAt: -1, _id: -1 }) // Sort by newest first; _id tiebreaker for stable pagination
        .skip(skip)
        .limit(pageSize);

      // Serialize to remove MongoDB ObjectIds and other non-serializable types
      const serialized = JSON.parse(JSON.stringify(offRoadVehicles));

      return {
        data: serialized,
        totalCount,
        currentPage,
        totalPages,
        hasNextPage: currentPage < totalPages,
        hasPreviousPage: currentPage > 1,
      };
    } catch (error) {
      console.error("Error fetching off-road vehicles:", error);
      throw new Error("Failed to fetch off-road vehicles");
    }
  }

  /**
   * Get an off-road vehicle by publicId
   * @param publicId - The public ID of the off-road vehicle
   * @returns Promise<SerializedOffRoadVehicle | null> - The off-road vehicle or null if not found
   */
  async getByPublicId(publicId: string): Promise<SerializedOffRoadVehicle | null> {
    try {
      await connectDB();

      const offRoadVehicle = await OffRoadVehicle.findOne({
        publicId,
      }).populate("user");

      if (!offRoadVehicle) {
        return null;
      }

      // Serialize to remove MongoDB ObjectIds and other non-serializable types
      const serialized = JSON.parse(JSON.stringify(offRoadVehicle));

      return serialized;
    } catch (error) {
      console.error("Error fetching off-road vehicle:", error);
      throw new Error("Failed to fetch off-road vehicle");
    }
  }

  /**
   * Create a new off-road vehicle
   * @param offRoadVehicleData - Off-road vehicle data to create
   * @returns Promise<SerializedOffRoadVehicle> - The created off-road vehicle
   */
  async create(
    offRoadVehicleData: Omit<IOffRoadVehicle, "id" | "createdAt" | "updatedAt">
  ): Promise<SerializedOffRoadVehicle> {
    try {
      await connectDB();

      const offRoadVehicle = new OffRoadVehicle(offRoadVehicleData);
      await offRoadVehicle.save();
      await offRoadVehicle.populate("user");

      // Serialize to remove MongoDB ObjectIds and other non-serializable types
      const serialized = JSON.parse(JSON.stringify(offRoadVehicle));

      return serialized;
    } catch (error) {
      console.error("Error creating off-road vehicle:", error);
      throw new Error("Failed to create off-road vehicle");
    }
  }

  /**
   * Update an off-road vehicle by publicId
   * @param publicId - The public ID of the off-road vehicle to update
   * @param updateData - Partial off-road vehicle data to update
   * @returns Promise<SerializedOffRoadVehicle | null> - The updated off-road vehicle or null if not found
   */
  async edit(
    publicId: string,
    updateData: Partial<IOffRoadVehicle>
  ): Promise<SerializedOffRoadVehicle | null> {
    try {
      await connectDB();

      const offRoadVehicle = await OffRoadVehicle.findOneAndUpdate(
        { publicId },
        { ...updateData },
        { new: true, runValidators: true }
      ).populate("user");

      if (!offRoadVehicle) {
        return null;
      }

      await offRoadVehicle.save();

      // Serialize to remove MongoDB ObjectIds and other non-serializable types
      const serialized = JSON.parse(JSON.stringify(offRoadVehicle));

      return serialized;
    } catch (error) {
      console.error("Error updating off-road vehicle:", error);
      throw new Error("Failed to update off-road vehicle");
    }
  }

  /**
   * Delete an off-road vehicle by publicId
   * @param publicId - The public ID of the off-road vehicle to delete
   * @returns Promise<boolean> - True if deleted, false if not found
   */
  async delete(publicId: string): Promise<boolean> {
    try {
      await connectDB();

      const result = await OffRoadVehicle.findOneAndDelete({
        publicId,
      });

      return result !== null;
    } catch (error) {
      console.error("Error deleting off-road vehicle:", error);
      throw new Error("Failed to delete off-road vehicle");
    }
  }
}

export const offRoadVehicleRepository = new OffRoadVehicleRepository();
