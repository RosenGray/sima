import { Motorcycle, IMotorcycle } from "../models/Motorcycle";
import connectDB from "@/lib/mongo/mongodb";
import { SerializedMotorcycle } from "../types/motorcycle.types";
import type { FilterQuery } from "mongoose";
import sanitize from "mongo-sanitize";

export interface MotorcycleSearchFilters {
  manufacturer?: string[];
  model?: string[];
  yearFrom?: string;
  yearTo?: string;
  kind?: string[];
  numberOfHand?: string[];
  district?: string[];
  city?: string[];
  priceFrom?: number;
  priceTo?: number;
  mileage?: string;
}

interface PaginatedResponse {
  data: SerializedMotorcycle[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

class MotorcycleRepository {
  /**
   * Get all motorcycles with search and pagination
   * @param searchFilters - Object containing search criteria
   * @param currentPage - Current page number (1-based)
   * @param pageSize - Number of items per page (default: 10)
   * @returns Promise<PaginatedResponse> - Paginated response with data and metadata
   */
  async getAll(
    searchFilters: MotorcycleSearchFilters = {},
    currentPage: number = 1,
    pageSize: number = 10
  ): Promise<PaginatedResponse> {
    try {
      await connectDB();

      // Sanitize all incoming filters to prevent NoSQL injection
      const sanitizedFilters: MotorcycleSearchFilters = {
        manufacturer: sanitize(searchFilters.manufacturer),
        model: sanitize(searchFilters.model),
        yearFrom: sanitize(searchFilters.yearFrom),
        yearTo: sanitize(searchFilters.yearTo),
        kind: sanitize(searchFilters.kind),
        numberOfHand: sanitize(searchFilters.numberOfHand),
        district: sanitize(searchFilters.district),
        city: sanitize(searchFilters.city),
        priceFrom: sanitize(searchFilters.priceFrom),
        priceTo: sanitize(searchFilters.priceTo),
        mileage: sanitize(searchFilters.mileage),
      };

      // Build search filter using MongoDB query
      const searchFilter: FilterQuery<typeof Motorcycle> = {};

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

      // Add kind filter
      if (sanitizedFilters.kind) {
        searchFilter.kind = { $in: sanitizedFilters.kind };
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
      if (
        sanitizedFilters.priceFrom !== undefined &&
        sanitizedFilters.priceFrom !== null
      ) {
        const priceFromNum = Number(sanitizedFilters.priceFrom);
        if (!Number.isNaN(priceFromNum) && priceFromNum >= 0) {
          searchFilter.price = { $gte: priceFromNum };
        }
      }

      // Handle priceTo (maximum price)
      if (
        sanitizedFilters.priceTo !== undefined &&
        sanitizedFilters.priceTo !== null
      ) {
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

      // Add mileage filter (optional range)
      if (sanitizedFilters.mileage) {
        const mileageNum = Number(sanitizedFilters.mileage);
        if (!Number.isNaN(mileageNum) && mileageNum >= 0) {
          searchFilter.mileage = { $lte: mileageNum };
        }
      }

      // Calculate pagination
      const skip = (currentPage - 1) * pageSize;

      // Get total count for pagination
      const totalCount = await Motorcycle.countDocuments(searchFilter);
      const totalPages = Math.ceil(totalCount / pageSize);

      // Fetch paginated results
      const motorcycles = await Motorcycle.find(searchFilter)
        .populate("user")
        .sort({ createdAt: -1 }) // Sort by newest first
        .skip(skip)
        .limit(pageSize);

      // Serialize to remove MongoDB ObjectIds and other non-serializable types
      const serialized = JSON.parse(JSON.stringify(motorcycles));

      return {
        data: serialized,
        totalCount,
        currentPage,
        totalPages,
        hasNextPage: currentPage < totalPages,
        hasPreviousPage: currentPage > 1,
      };
    } catch (error) {
      console.error("Error fetching motorcycles:", error);
      throw new Error("Failed to fetch motorcycles");
    }
  }

  /**
   * Get a motorcycle by publicId
   * @param publicId - The public ID of the motorcycle
   * @returns Promise<SerializedMotorcycle | null> - The motorcycle or null if not found
   */
  async getByPublicId(publicId: string): Promise<SerializedMotorcycle | null> {
    try {
      await connectDB();

      const motorcycle = await Motorcycle.findOne({
        publicId,
      }).populate("user");

      if (!motorcycle) {
        return null;
      }

      // Serialize to remove MongoDB ObjectIds and other non-serializable types
      const serialized = JSON.parse(JSON.stringify(motorcycle));

      return serialized;
    } catch (error) {
      console.error("Error fetching motorcycle:", error);
      throw new Error("Failed to fetch motorcycle");
    }
  }

  /**
   * Create a new motorcycle
   * @param motorcycleData - Motorcycle data to create
   * @returns Promise<SerializedMotorcycle> - The created motorcycle
   */
  async create(
    motorcycleData: Omit<IMotorcycle, "id" | "createdAt" | "updatedAt">
  ): Promise<SerializedMotorcycle> {
    try {
      await connectDB();

      const motorcycle = new Motorcycle(motorcycleData);
      await motorcycle.save();
      await motorcycle.populate("user");

      // Serialize to remove MongoDB ObjectIds and other non-serializable types
      const serialized = JSON.parse(JSON.stringify(motorcycle));

      return serialized;
    } catch (error) {
      console.error("Error creating motorcycle:", error);
      throw new Error("Failed to create motorcycle");
    }
  }

  /**
   * Update a motorcycle by publicId
   * @param publicId - The public ID of the motorcycle to update
   * @param updateData - Partial motorcycle data to update
   * @returns Promise<SerializedMotorcycle | null> - The updated motorcycle or null if not found
   */
  async edit(
    publicId: string,
    updateData: Partial<IMotorcycle>
  ): Promise<SerializedMotorcycle | null> {
    try {
      await connectDB();

      const motorcycle = await Motorcycle.findOneAndUpdate(
        { publicId },
        { ...updateData },
        { new: true, runValidators: true }
      ).populate("user");

      if (!motorcycle) {
        return null;
      }

      await motorcycle.save();

      // Serialize to remove MongoDB ObjectIds and other non-serializable types
      const serialized = JSON.parse(JSON.stringify(motorcycle));

      return serialized;
    } catch (error) {
      console.error("Error updating motorcycle:", error);
      throw new Error("Failed to update motorcycle");
    }
  }

  /**
   * Delete a motorcycle by publicId
   * @param publicId - The public ID of the motorcycle to delete
   * @returns Promise<boolean> - True if deleted, false if not found
   */
  async delete(publicId: string): Promise<boolean> {
    try {
      await connectDB();

      const result = await Motorcycle.findOneAndDelete({
        publicId,
      });

      return result !== null;
    } catch (error) {
      console.error("Error deleting motorcycle:", error);
      throw new Error("Failed to delete motorcycle");
    }
  }
}

export const motorcycleRepository = new MotorcycleRepository();
