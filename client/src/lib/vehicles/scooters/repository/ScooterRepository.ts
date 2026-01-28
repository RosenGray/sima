import { Scooter, IScooter } from "../models/Scooter";
import connectDB from "@/lib/mongo/mongodb";
import { SerializedScooter } from "../types/scooter.types";
import { FilterQuery } from "mongoose";
import sanitize from "mongo-sanitize";

export interface ScooterSearchFilters {
  manufacturer?: string[];
  model?: string[];
  yearFrom?: string;
  yearTo?: string;
  numberOfHand?: string[];
  district?: string[];
  city?: string[];
  priceFrom?: number;
  priceTo?: number;
}

interface PaginatedResponse {
  data: SerializedScooter[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

class ScooterRepository {
  /**
   * Get all scooters with search and pagination
   * @param searchFilters - Object containing search criteria
   * @param currentPage - Current page number (1-based)
   * @param pageSize - Number of items per page (default: 10)
   * @returns Promise<PaginatedResponse> - Paginated response with data and metadata
   */
  async getAll(
    searchFilters: ScooterSearchFilters = {},
    currentPage: number = 1,
    pageSize: number = 10
  ): Promise<PaginatedResponse> {
    try {
      await connectDB();

      // Sanitize all incoming filters to prevent NoSQL injection
      const sanitizedFilters: ScooterSearchFilters = {
        manufacturer: sanitize(searchFilters.manufacturer),
        model: sanitize(searchFilters.model),
        yearFrom: sanitize(searchFilters.yearFrom),
        yearTo: sanitize(searchFilters.yearTo),
        numberOfHand: sanitize(searchFilters.numberOfHand),
        district: sanitize(searchFilters.district),
        city: sanitize(searchFilters.city),
        priceFrom: sanitize(searchFilters.priceFrom),
        priceTo: sanitize(searchFilters.priceTo),
      };

      // Build search filter using MongoDB query
      const searchFilter: FilterQuery<typeof Scooter> = {};

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
      const totalCount = await Scooter.countDocuments(searchFilter);
      const totalPages = Math.ceil(totalCount / pageSize);

      // Fetch paginated results
      const scooters = await Scooter.find(searchFilter)
        .populate("user")
        .sort({ createdAt: -1 }) // Sort by newest first
        .skip(skip)
        .limit(pageSize);

      // Serialize to remove MongoDB ObjectIds and other non-serializable types
      const serializedScooters = JSON.parse(JSON.stringify(scooters));

      return {
        data: serializedScooters,
        totalCount,
        currentPage,
        totalPages,
        hasNextPage: currentPage < totalPages,
        hasPreviousPage: currentPage > 1,
      };
    } catch (error) {
      console.error("Error fetching scooters:", error);
      throw new Error("Failed to fetch scooters");
    }
  }

  /**
   * Get a scooter by publicId
   * @param publicId - The public ID of the scooter
   * @returns Promise<SerializedScooter | null> - The scooter or null if not found
   */
  async getByPublicId(publicId: string): Promise<SerializedScooter | null> {
    try {
      await connectDB();

      const scooter = await Scooter.findOne({
        publicId,
      }).populate("user");

      if (!scooter) {
        return null;
      }

      // Serialize to remove MongoDB ObjectIds and other non-serializable types
      const serializedScooter = JSON.parse(JSON.stringify(scooter));

      return serializedScooter;
    } catch (error) {
      console.error("Error fetching scooter:", error);
      throw new Error("Failed to fetch scooter");
    }
  }

  /**
   * Create a new scooter
   * @param scooterData - Scooter data to create
   * @returns Promise<SerializedScooter> - The created scooter
   */
  async create(scooterData: Omit<IScooter, "id" | "createdAt" | "updatedAt">): Promise<SerializedScooter> {
    try {
      await connectDB();

      const scooter = new Scooter(scooterData);
      await scooter.save();
      await scooter.populate("user");

      // Serialize to remove MongoDB ObjectIds and other non-serializable types
      const serializedScooter = JSON.parse(JSON.stringify(scooter));

      return serializedScooter;
    } catch (error) {
      console.error("Error creating scooter:", error);
      throw new Error("Failed to create scooter");
    }
  }

  /**
   * Update a scooter by publicId
   * @param publicId - The public ID of the scooter to update
   * @param updateData - Partial scooter data to update
   * @returns Promise<SerializedScooter | null> - The updated scooter or null if not found
   */
  async edit(
    publicId: string,
    updateData: Partial<IScooter>
  ): Promise<SerializedScooter | null> {
    try {
      await connectDB();

      const scooter = await Scooter.findOneAndUpdate(
        { publicId },
        { ...updateData },
        { new: true, runValidators: true }
      ).populate("user");

      if (!scooter) {
        return null;
      }

      await scooter.save();

      // Serialize to remove MongoDB ObjectIds and other non-serializable types
      const serializedScooter = JSON.parse(JSON.stringify(scooter));

      return serializedScooter;
    } catch (error) {
      console.error("Error updating scooter:", error);
      throw new Error("Failed to update scooter");
    }
  }

  /**
   * Delete a scooter by publicId
   * @param publicId - The public ID of the scooter to delete
   * @returns Promise<boolean> - True if deleted, false if not found
   */
  async delete(publicId: string): Promise<boolean> {
    try {
      await connectDB();

      const result = await Scooter.findOneAndDelete({
        publicId,
      });

      return result !== null;
    } catch (error) {
      console.error("Error deleting scooter:", error);
      throw new Error("Failed to delete scooter");
    }
  }
}

export const scooterRepository = new ScooterRepository();
