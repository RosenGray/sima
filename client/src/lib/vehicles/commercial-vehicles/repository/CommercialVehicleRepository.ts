import { CommercialVehicle, ICommercialVehicle } from "../models/CommercialVehicle";
import connectDB from "@/lib/mongo/mongodb";
import { SerializedCommercialVehicle } from "../types/commercialVehicle.types";
import { FilterQuery } from "mongoose";
import mongoose from "mongoose";
import sanitize from "mongo-sanitize";

export interface CommercialVehicleSearchFilters {
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
  data: SerializedCommercialVehicle[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

class CommercialVehicleRepository {
  /**
   * Get all commercial vehicles with search and pagination
   * @param searchFilters - Object containing search criteria
   * @param currentPage - Current page number (1-based)
   * @param pageSize - Number of items per page (default: 10)
   * @returns Promise<PaginatedResponse> - Paginated response with data and metadata
   */
  async getAll(
    searchFilters: CommercialVehicleSearchFilters = {},
    currentPage: number = 1,
    pageSize: number = 10
  ): Promise<PaginatedResponse> {
    try {
      await connectDB();

      // Sanitize all incoming filters to prevent NoSQL injection
      const sanitizedFilters: CommercialVehicleSearchFilters = {
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
      const searchFilter: FilterQuery<typeof CommercialVehicle> = {};

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
      const totalCount = await CommercialVehicle.countDocuments(searchFilter);
      const totalPages = Math.ceil(totalCount / pageSize);

      // Fetch paginated results
      const commercialVehicles = await CommercialVehicle.find(searchFilter)
        .populate("user")
        .sort({ createdAt: -1 }) // Sort by newest first
        .skip(skip)
        .limit(pageSize);

      // Serialize to remove MongoDB ObjectIds and other non-serializable types
      const serialized = JSON.parse(JSON.stringify(commercialVehicles));

      return {
        data: serialized,
        totalCount,
        currentPage,
        totalPages,
        hasNextPage: currentPage < totalPages,
        hasPreviousPage: currentPage > 1,
      };
    } catch (error) {
      console.error("Error fetching commercial vehicles:", error);
      throw new Error("Failed to fetch commercial vehicles");
    }
  }

  /**
   * Get a commercial vehicle by publicId
   * @param publicId - The public ID of the commercial vehicle
   * @returns Promise<SerializedCommercialVehicle | null> - The commercial vehicle or null if not found
   */
  async getByPublicId(publicId: string): Promise<SerializedCommercialVehicle | null> {
    try {
      await connectDB();

      const commercialVehicle = await CommercialVehicle.findOne({
        publicId,
      }).populate("user");

      if (!commercialVehicle) {
        return null;
      }

      // Serialize to remove MongoDB ObjectIds and other non-serializable types
      const serialized = JSON.parse(JSON.stringify(commercialVehicle));

      return serialized;
    } catch (error) {
      console.error("Error fetching commercial vehicle:", error);
      throw new Error("Failed to fetch commercial vehicle");
    }
  }

  /**
   * Create a new commercial vehicle
   * @param commercialVehicleData - Commercial vehicle data to create
   * @returns Promise<SerializedCommercialVehicle> - The created commercial vehicle
   */
  async create(
    commercialVehicleData: Omit<ICommercialVehicle, "id" | "createdAt" | "updatedAt">
  ): Promise<SerializedCommercialVehicle> {
    try {
      await connectDB();

      const commercialVehicle = new CommercialVehicle(commercialVehicleData);
      await commercialVehicle.save();
      await commercialVehicle.populate("user");

      // Serialize to remove MongoDB ObjectIds and other non-serializable types
      const serialized = JSON.parse(JSON.stringify(commercialVehicle));

      return serialized;
    } catch (error) {
      console.error("Error creating commercial vehicle:", error);
      throw new Error("Failed to create commercial vehicle");
    }
  }

  /**
   * Update a commercial vehicle by publicId
   * @param publicId - The public ID of the commercial vehicle to update
   * @param updateData - Partial commercial vehicle data to update
   * @returns Promise<SerializedCommercialVehicle | null> - The updated commercial vehicle or null if not found
   */
  async edit(
    publicId: string,
    updateData: Partial<ICommercialVehicle>
  ): Promise<SerializedCommercialVehicle | null> {
    try {
      await connectDB();

      const commercialVehicle = await CommercialVehicle.findOneAndUpdate(
        { publicId },
        { ...updateData },
        { new: true, runValidators: true }
      ).populate("user");

      if (!commercialVehicle) {
        return null;
      }

      await commercialVehicle.save();

      // Serialize to remove MongoDB ObjectIds and other non-serializable types
      const serialized = JSON.parse(JSON.stringify(commercialVehicle));

      return serialized;
    } catch (error) {
      console.error("Error updating commercial vehicle:", error);
      throw new Error("Failed to update commercial vehicle");
    }
  }

  /**
   * Delete a commercial vehicle by publicId
   * @param publicId - The public ID of the commercial vehicle to delete
   * @returns Promise<boolean> - True if deleted, false if not found
   */
  async delete(publicId: string): Promise<boolean> {
    try {
      await connectDB();

      const result = await CommercialVehicle.findOneAndDelete({
        publicId,
      });

      return result !== null;
    } catch (error) {
      console.error("Error deleting commercial vehicle:", error);
      throw new Error("Failed to delete commercial vehicle");
    }
  }
}

export const commercialVehicleRepository = new CommercialVehicleRepository();
