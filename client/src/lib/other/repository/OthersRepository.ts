import { Others } from "../models/Others";
import { IOthers } from "../types/others.types";
import connectDB from "@/lib/mongo/mongodb";
import { SerializedOthers } from "../types/others.types";
import { FilterQuery } from "mongoose";
import sanitize from "mongo-sanitize";

export interface OthersSearchFilters {
  district?: string[];
  city?: string[];
  textSearch?: string;
}

interface PaginatedResponse {
  data: SerializedOthers[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

class OthersRepository {
  /**
   * Get all others with search and pagination
   * @param searchFilters - Object containing search criteria
   * @param currentPage - Current page number (1-based)
   * @param pageSize - Number of items per page (default: 10)
   * @returns Promise<PaginatedResponse> - Paginated response with data and metadata
   */
  async getAll(
    searchFilters: OthersSearchFilters = {},
    currentPage: number = 1,
    pageSize: number = 10
  ): Promise<PaginatedResponse> {
    try {
      await connectDB();

      // Sanitize all incoming filters to prevent NoSQL injection
      const sanitizedFilters: OthersSearchFilters = {
        district: sanitize(searchFilters.district),
        city: sanitize(searchFilters.city),
        textSearch: sanitize(searchFilters.textSearch),
      };

      // Build search filter using MongoDB query
      const searchFilter: FilterQuery<typeof Others> = {};

      // Add district filter
      if (sanitizedFilters.district) {
        searchFilter.district = { $in: sanitizedFilters.district };
      }

      // Add city filter
      if (sanitizedFilters.city) {
        searchFilter.city = { $in: sanitizedFilters.city };
      }

      // Add text search filter (search in title and description)
      if (sanitizedFilters.textSearch?.trim()) {
        const searchTerm = sanitizedFilters.textSearch.trim();
        searchFilter.$or = [
          { title: { $regex: searchTerm, $options: "i" } },
          { description: { $regex: searchTerm, $options: "i" } },
        ];
      }

      // Calculate pagination
      const skip = (currentPage - 1) * pageSize;
      const totalCount = await Others.countDocuments(searchFilter);
      const totalPages = Math.ceil(totalCount / pageSize);

      // Fetch results
      const results = await Others.find(searchFilter)
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
      console.error("Error fetching others:", error);
      throw new Error("Failed to fetch others");
    }
  }

  /**
   * Get an other by publicId
   * @param publicId - The public ID of the other
   * @returns Promise<SerializedOthers | null> - The other or null if not found
   */
  async getByPublicId(publicId: string): Promise<SerializedOthers | null> {
    try {
      await connectDB();

      const other = await Others.findOne({ publicId }).populate("user");

      if (!other) {
        return null;
      }

      // Serialize to remove MongoDB ObjectIds and other non-serializable types
      const serializedOther = JSON.parse(JSON.stringify(other));

      return serializedOther;
    } catch (error) {
      console.error("Error fetching other by publicId:", error);
      throw new Error("Failed to fetch other");
    }
  }

  /**
   * Create a new other
   * @param data - Other data
   * @returns Promise<SerializedOthers> - Created other
   */
  async create(data: Partial<IOthers>): Promise<SerializedOthers> {
    try {
      await connectDB();

      const other = new Others(data);
      await other.save();
      await other.populate("user");

      return JSON.parse(JSON.stringify(other));
    } catch (error) {
      console.error("Error creating other:", error);
      throw new Error("Failed to create other");
    }
  }

  /**
   * Edit an existing other
   * @param publicId - Public ID of the other
   * @param updateData - Updated other data
   * @returns Promise<SerializedOthers | null> - Updated other or null if not found
   */
  async edit(
    publicId: string,
    updateData: Partial<IOthers>
  ): Promise<SerializedOthers | null> {
    try {
      await connectDB();

      const other = await Others.findOneAndUpdate(
        { publicId },
        { ...updateData },
        { new: true }
      ).populate("user");

      if (!other) {
        return null;
      }

      return JSON.parse(JSON.stringify(other));
    } catch (error) {
      console.error("Error editing other:", error);
      throw new Error("Failed to edit other");
    }
  }

  /**
   * Delete an other
   * @param publicId - Public ID of the other
   * @returns Promise<boolean> - True if deleted, false if not found
   */
  async delete(publicId: string): Promise<boolean> {
    try {
      await connectDB();

      const result = await Others.findOneAndDelete({ publicId });

      return !!result;
    } catch (error) {
      console.error("Error deleting other:", error);
      throw new Error("Failed to delete other");
    }
  }
}

export const othersRepository = new OthersRepository();
