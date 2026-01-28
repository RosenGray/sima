import { ProfessionalService } from "../models/ProfessionalService";
import connectDB from "@/lib/mongo/mongodb";
import { SerilizeProfessionalService } from "../types/professional-service.scema";
import { buildProfessionalServiceSearchFilter } from "./buildSearchFilter";

export interface ProfessionalServiceSearchFilters {
  categoryId?: string[];
  subCategoryId?: string[];
  district?: string[];
  city?: string[];
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
    searchFilters: ProfessionalServiceSearchFilters = {},
    currentPage: number = 1,
    pageSize: number = 10
  ): Promise<PaginatedResponse> {
    try {
      await connectDB();

      // Build search filter using extracted function
      const searchFilter = buildProfessionalServiceSearchFilter(searchFilters);

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
