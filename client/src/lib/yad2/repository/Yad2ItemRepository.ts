import { Yad2Item, IYad2Item } from "../models/Yad2Item";
import connectDB from "@/lib/mongo/mongodb";
import { SerializedYad2Item } from "../types/yad2.types";
import { FilterQuery } from "mongoose";
import sanitize from "mongo-sanitize";

export interface Yad2ItemSearchFilters {
  category?: string[];
  subCategory?: string[];
  district?: string[];
  city?: string[];
  priceFrom?: number;
  priceTo?: number;
}

interface PaginatedResponse {
  data: SerializedYad2Item[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

class Yad2ItemRepository {
  /**
   * Get all yad2 items with search and pagination
   * @param searchFilters - Object containing search criteria
   * @param currentPage - Current page number (1-based)
   * @param pageSize - Number of items per page (default: 10)
   * @returns Promise<PaginatedResponse> - Paginated response with data and metadata
   */
  async getAll(
    searchFilters: Yad2ItemSearchFilters = {},
    currentPage: number = 1,
    pageSize: number = 10
  ): Promise<PaginatedResponse> {
    try {
      await connectDB();

      // Sanitize all incoming filters to prevent NoSQL injection
      const sanitizedFilters: Yad2ItemSearchFilters = {
        category: sanitize(searchFilters.category),
        subCategory: sanitize(searchFilters.subCategory),
        district: sanitize(searchFilters.district),
        city: sanitize(searchFilters.city),
        priceFrom: sanitize(searchFilters.priceFrom),
        priceTo: sanitize(searchFilters.priceTo),
      };

      // Build search filter using MongoDB query
      const searchFilter: FilterQuery<typeof Yad2Item> = {};

      // Add category filter
      if (sanitizedFilters.category) {
        searchFilter.category = { $in: sanitizedFilters.category };
      }

      // Add subCategory filter
      if (sanitizedFilters.subCategory) {
        searchFilter.subCategory = { $in: sanitizedFilters.subCategory };
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

      // Calculate pagination
      const skip = (currentPage - 1) * pageSize;
      const totalCount = await Yad2Item.countDocuments(searchFilter);
      const totalPages = Math.ceil(totalCount / pageSize);

      // Fetch results
      const results = await Yad2Item.find(searchFilter)
        .populate("user")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(pageSize);

      // Serialize results
      const serialized = JSON.parse(JSON.stringify(results));

      return {
        data: serialized,
        totalCount,
        currentPage,
        totalPages,
        hasNextPage: currentPage < totalPages,
        hasPreviousPage: currentPage > 1,
      };
    } catch (error) {
      console.error("Error fetching yad2 items:", error);
      throw new Error("Failed to fetch yad2 items");
    }
  }

  /**
   * Get a yad2 item by publicId
   * @param publicId - Public ID of the item
   * @returns Promise<SerializedYad2Item | null> - Serialized item or null if not found
   */
  async getByPublicId(publicId: string): Promise<SerializedYad2Item | null> {
    try {
      await connectDB();

      const item = await Yad2Item.findOne({ publicId }).populate("user");

      if (!item) {
        return null;
      }

      return JSON.parse(JSON.stringify(item));
    } catch (error) {
      console.error("Error fetching yad2 item by publicId:", error);
      throw new Error("Failed to fetch yad2 item");
    }
  }

  /**
   * Create a new yad2 item
   * @param data - Item data
   * @returns Promise<SerializedYad2Item> - Created item
   */
  async create(data: Partial<IYad2Item>): Promise<SerializedYad2Item> {
    try {
      await connectDB();

      const item = new Yad2Item(data);
      await item.save();
      await item.populate("user");

      return JSON.parse(JSON.stringify(item));
    } catch (error) {
      console.error("Error creating yad2 item:", error);
      throw new Error("Failed to create yad2 item");
    }
  }

  /**
   * Edit an existing yad2 item
   * @param publicId - Public ID of the item
   * @param updateData - Updated item data
   * @returns Promise<SerializedYad2Item | null> - Updated item or null if not found
   */
  async edit(
    publicId: string,
    updateData: Partial<IYad2Item>
  ): Promise<SerializedYad2Item | null> {
    try {
      await connectDB();

      const item = await Yad2Item.findOneAndUpdate(
        { publicId },
        { ...updateData },
        { new: true }
      ).populate("user");

      if (!item) {
        return null;
      }

      return JSON.parse(JSON.stringify(item));
    } catch (error) {
      console.error("Error editing yad2 item:", error);
      throw new Error("Failed to edit yad2 item");
    }
  }

  /**
   * Delete a yad2 item
   * @param publicId - Public ID of the item
   * @returns Promise<boolean> - True if deleted, false if not found
   */
  async delete(publicId: string): Promise<boolean> {
    try {
      await connectDB();

      const result = await Yad2Item.findOneAndDelete({ publicId });

      return !!result;
    } catch (error) {
      console.error("Error deleting yad2 item:", error);
      throw new Error("Failed to delete yad2 item");
    }
  }
}

export const yad2ItemRepository = new Yad2ItemRepository();
