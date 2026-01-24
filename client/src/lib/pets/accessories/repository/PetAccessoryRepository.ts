import { PetAccessory, IPetAccessory } from "../models/PetAccessory";
import connectDB from "@/lib/mongo/mongodb";
import { SerializedPetAccessory } from "../types/petAccessory.types";
import { FilterQuery } from "mongoose";
import mongoose from "mongoose";
import sanitize from "mongo-sanitize";

export interface PetAccessorySearchFilters {
  animal?: string[];
  kind?: string[];
  district?: string[];
  city?: string[];
  priceFrom?: number;
  priceTo?: number;
  textSearch?: string; // Free text search from description and title
}

interface PaginatedResponse {
  data: SerializedPetAccessory[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

class PetAccessoryRepository {
  /**
   * Get all pet accessories with search and pagination
   * @param searchFilters - Object containing search criteria
   * @param currentPage - Current page number (1-based)
   * @param pageSize - Number of items per page (default: 10)
   * @returns Promise<PaginatedResponse> - Paginated response with data and metadata
   */
  async getAll(
    searchFilters: PetAccessorySearchFilters = {},
    currentPage: number = 1,
    pageSize: number = 10
  ): Promise<PaginatedResponse> {
    try {
      await connectDB();

      // Sanitize all incoming filters to prevent NoSQL injection
      const sanitizedFilters: PetAccessorySearchFilters = {
        animal: sanitize(searchFilters.animal),
        kind: sanitize(searchFilters.kind),
        district: sanitize(searchFilters.district),
        city: sanitize(searchFilters.city),
        priceFrom: sanitize(searchFilters.priceFrom),
        priceTo: sanitize(searchFilters.priceTo),
        textSearch: sanitize(searchFilters.textSearch),
      };

      // Build search filter using MongoDB query
      const searchFilter: FilterQuery<typeof PetAccessory> = {};

      // Add animal filter
      if (sanitizedFilters.animal) {
        searchFilter.animal = { $in: sanitizedFilters.animal };
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

      // Add text search filter (search in description and title)
      if (sanitizedFilters.textSearch?.trim()) {
        const searchTerm = sanitizedFilters.textSearch.trim();
        searchFilter.$or = [
          { description: { $regex: searchTerm, $options: "i" } },
          { title: { $regex: searchTerm, $options: "i" } },
        ];
      }

      // Calculate pagination
      const skip = (currentPage - 1) * pageSize;

      // Get total count for pagination
      const totalCount = await PetAccessory.countDocuments(searchFilter);
      const totalPages = Math.ceil(totalCount / pageSize);

      // Fetch paginated results (default sort by createdAt desc)
      const accessories = await PetAccessory.find(searchFilter)
        .populate("user")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(pageSize);

      // Serialize to remove MongoDB ObjectIds and other non-serializable types
      const serializedAccessories = JSON.parse(JSON.stringify(accessories));

      return {
        data: serializedAccessories,
        totalCount,
        currentPage,
        totalPages,
        hasNextPage: currentPage < totalPages,
        hasPreviousPage: currentPage > 1,
      };
    } catch (error) {
      console.error("Error fetching pet accessories:", error);
      throw new Error("Failed to fetch pet accessories");
    }
  }

  /**
   * Get a pet accessory by publicId
   * @param publicId - The public ID of the accessory
   * @returns Promise<SerializedPetAccessory | null> - The accessory or null if not found
   */
  async getByPublicId(
    publicId: string
  ): Promise<SerializedPetAccessory | null> {
    try {
      await connectDB();

      const accessory = await PetAccessory.findOne({
        publicId,
      }).populate("user");

      if (!accessory) {
        return null;
      }

      // Serialize to remove MongoDB ObjectIds and other non-serializable types
      const serializedAccessory = JSON.parse(JSON.stringify(accessory));

      return serializedAccessory;
    } catch (error) {
      console.error("Error fetching pet accessory:", error);
      throw new Error("Failed to fetch pet accessory");
    }
  }

  /**
   * Get a pet accessory by MongoDB _id
   * @param id - The MongoDB _id of the accessory
   * @returns Promise<SerializedPetAccessory | null> - The accessory or null if not found
   */
  async getById(id: string): Promise<SerializedPetAccessory | null> {
    try {
      await connectDB();

      // Validate ObjectId format
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return null;
      }

      const accessory = await PetAccessory.findById(id).populate("user");

      if (!accessory) {
        return null;
      }

      // Serialize to remove MongoDB ObjectIds and other non-serializable types
      const serializedAccessory = JSON.parse(JSON.stringify(accessory));

      return serializedAccessory;
    } catch (error) {
      console.error("Error fetching pet accessory:", error);
      throw new Error("Failed to fetch pet accessory");
    }
  }

  /**
   * Create a new pet accessory
   * @param accessoryData - Pet accessory data to create
   * @returns Promise<SerializedPetAccessory> - The created accessory
   */
  async create(
    accessoryData: Omit<IPetAccessory, "id" | "createdAt" | "updatedAt">
  ): Promise<SerializedPetAccessory> {
    try {
      await connectDB();

      const accessory = new PetAccessory(accessoryData);
      await accessory.save();
      await accessory.populate("user");

      // Serialize to remove MongoDB ObjectIds and other non-serializable types
      const serializedAccessory = JSON.parse(JSON.stringify(accessory));

      return serializedAccessory;
    } catch (error) {
      console.error("Error creating pet accessory:", error);
      throw new Error("Failed to create pet accessory");
    }
  }

  /**
   * Update a pet accessory by publicId
   * @param publicId - The public ID of the accessory to update
   * @param updateData - Partial accessory data to update
   * @returns Promise<SerializedPetAccessory | null> - The updated accessory or null if not found
   */
  async edit(
    publicId: string,
    updateData: Partial<IPetAccessory>
  ): Promise<SerializedPetAccessory | null> {
    try {
      await connectDB();

      const accessory = await PetAccessory.findOneAndUpdate(
        { publicId },
        { ...updateData },
        { new: true, runValidators: true }
      ).populate("user");

      if (!accessory) {
        return null;
      }

      await accessory.save();

      // Serialize to remove MongoDB ObjectIds and other non-serializable types
      const serializedAccessory = JSON.parse(JSON.stringify(accessory));

      return serializedAccessory;
    } catch (error) {
      console.error("Error updating pet accessory:", error);
      throw new Error("Failed to update pet accessory");
    }
  }

  /**
   * Delete a pet accessory by publicId
   * @param publicId - The public ID of the accessory to delete
   * @returns Promise<boolean> - True if deleted, false if not found
   */
  async delete(publicId: string): Promise<boolean> {
    try {
      await connectDB();

      const result = await PetAccessory.findOneAndDelete({
        publicId,
      });

      return result !== null;
    } catch (error) {
      console.error("Error deleting pet accessory:", error);
      throw new Error("Failed to delete pet accessory");
    }
  }
}

export const petAccessoryRepository = new PetAccessoryRepository();
