import { ProfessionalService } from "../models/ProfessionalService";
import connectDB from "@/lib/mongo/mongodb";
import { SerilizeProfessionalService } from "../types/professional-service.scema";
import { FilterQuery } from "mongoose";
import mongoose from "mongoose";
import sanitize from "mongo-sanitize";

export interface SearchFilters {
  textSearch?: string;
  categoryId?: string;
  subCategoryId?: string;
  district?: string;
  city?: string;
  description?: string;
}

interface PaginatedResponse {
  data: SerilizeProfessionalService[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

class ProfessionalServiceRepository {
  /**
   * Get all professional services with search and pagination
   * @param searchFilters - Object containing search criteria
   * @param currentPage - Current page number (1-based)
   * @param pageSize - Number of items per page (default: 10)
   * @returns Promise<PaginatedResponse> - Paginated response with data and metadata
   */
  async getAll(
    searchFilters: SearchFilters = {}, 
    currentPage: number = 1, 
    pageSize: number = 10
  ): Promise<PaginatedResponse> {
    try {
      await connectDB();
      console.log('searchFilters',searchFilters);

      // Sanitize all incoming filters to prevent NoSQL injection
      const sanitizedFilters: SearchFilters = {
        textSearch: sanitize(searchFilters.textSearch),
        categoryId: sanitize(searchFilters.categoryId),
        subCategoryId: sanitize(searchFilters.subCategoryId),
        district: sanitize(searchFilters.district),
        city: sanitize(searchFilters.city),
        description: sanitize(searchFilters.description),
      };

      // Build search filter using MongoDB text index and structured filters
      const searchFilter: FilterQuery<typeof ProfessionalService> = {};

      // Add text search using MongoDB text index (fast and efficient)
      if (sanitizedFilters.textSearch?.trim()) {
        searchFilter.$text = { $search: sanitizedFilters.textSearch.trim() };
      }

      // Add category filter
      if (sanitizedFilters.categoryId) {
        // Validate ObjectId format before adding to filter
        if (mongoose.Types.ObjectId.isValid(sanitizedFilters.categoryId)) {
          searchFilter.category = sanitizedFilters.categoryId;
        } else {
          // Invalid ObjectId - return empty results by adding impossible filter
          searchFilter._id = new mongoose.Types.ObjectId();
        }
      }

      // Add subcategory filter
      if (sanitizedFilters.subCategoryId) {
        // Validate ObjectId format before adding to filter
        if (mongoose.Types.ObjectId.isValid(sanitizedFilters.subCategoryId)) {
          searchFilter.subCategory = sanitizedFilters.subCategoryId;
        } else {
          // Invalid ObjectId - return empty results by adding impossible filter
          searchFilter._id = new mongoose.Types.ObjectId();
        }
      }

      // Add district filter
      if (sanitizedFilters.district?.trim()) {
        searchFilter.district = sanitizedFilters.district.trim();
      }

      // Add city filter
      if (sanitizedFilters.city?.trim()) {
        console.log('sanitizedFilters.city',sanitizedFilters.city);
        searchFilter.city = sanitizedFilters.city.trim();
      }

      if (sanitizedFilters.description?.trim()) {
        searchFilter.description = { $regex: sanitizedFilters.description.trim(), $options: 'i' };
      }


 

      // Calculate pagination
      const skip = (currentPage - 1) * pageSize;
      
      // Get total count for pagination
      const totalCount = await ProfessionalService.countDocuments(searchFilter);
      const totalPages = Math.ceil(totalCount / pageSize);

      // Fetch paginated results
      const professionalServices = await ProfessionalService.find(searchFilter)
        .populate("category")
        .populate("subCategory")
        .populate("user")
        .sort({ createdAt: -1 }) // Sort by newest first
        .skip(skip)
        .limit(pageSize);

      // Serialize to remove MongoDB ObjectIds and other non-serializable types
      const serializedServices = JSON.parse(
        JSON.stringify(professionalServices)
      );

      //fake await 10 seconds
      await new Promise((resolve) => setTimeout(resolve, 10000));

      return {
        data: serializedServices,
        totalCount,
        currentPage,
        totalPages,
        hasNextPage: currentPage < totalPages,
        hasPreviousPage: currentPage > 1,
      };
    } catch (error) {
      console.error("Error fetching professional services:", error);
      throw new Error("Failed to fetch professional services");
    }
  }

  /**
   * Get a professional service by publicId
   * @param publicId - The public ID of the professional service
   * @returns Promise<SerilizeProfessionalService | null> - The professional service or null if not found
   */
  async getByPublicId(
    publicId: string
  ): Promise<SerilizeProfessionalService | null> {
    try {
      await connectDB();

      const professionalService = await ProfessionalService.findOne({
        publicId,
      })
        .populate("category")
        .populate("subCategory")
        .populate("user");

      if (!professionalService) {
        return null;
      }

      // Serialize to remove MongoDB ObjectIds and other non-serializable types
      const serializedService = JSON.parse(JSON.stringify(professionalService));

      return serializedService;
    } catch (error) {
      console.error("Error fetching professional service:", error);
      throw new Error("Failed to fetch professional service");
    }
  }
}

export const professionalServiceRepository =
  new ProfessionalServiceRepository();
