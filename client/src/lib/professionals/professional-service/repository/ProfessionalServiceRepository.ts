import { ProfessionalService } from "../models/ProfessionalService";
import connectDB from "@/lib/mongo/mongodb";
import { SerilizeProfessionalService } from "../types/professional-service.scema";
import { FilterQuery } from "mongoose";
import mongoose from "mongoose";
import sanitize from "mongo-sanitize";

export interface ProfessionalServiceSearchFilters {
  categoryId?: string[];
  subCategoryId?: string[];
  district?: string[];
  city?: string[];
}

type SortField = "date";
type SortDirection = "asc" | "desc";

interface SortOptions {
  field: SortField;
  direction: SortDirection;
}

/**
 * Parse sort string (e.g., "date_desc") into SortOptions object
 * Returns null for invalid values (will use default sort)
 */
function parseSortString(sort?: string): SortOptions | null {
  if (!sort || typeof sort !== "string") {
    return null;
  }

  const parts = sort.split("_");
  if (parts.length !== 2) {
    return null;
  }

  const [field, direction] = parts;

  const validFields: SortField[] = ["date"];
  const validDirections: SortDirection[] = ["asc", "desc"];

  if (
    !validFields.includes(field as SortField) ||
    !validDirections.includes(direction as SortDirection)
  ) {
    return null;
  }

  return {
    field: field as SortField,
    direction: direction as SortDirection,
  };
}

/**
 * Build MongoDB sort object from SortOptions
 * Maps user-friendly field names to MongoDB field names.
 * Always includes _id as tiebreaker for deterministic pagination when primary field has ties.
 */
function buildSortObject(sortOptions: SortOptions | null): Record<string, 1 | -1> {
  // Default sort: newest first (date_desc)
  if (!sortOptions) {
    return { createdAt: -1, _id: -1 };
  }

  // Map sort fields to MongoDB field names
  const fieldMap: Record<SortField, string> = {
    date: "createdAt",
  };

  const mongoField = fieldMap[sortOptions.field];
  const dir = sortOptions.direction === "asc" ? 1 : -1;

  return {
    [mongoField]: dir,
    _id: dir,
  };
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
   * @param sort - Sort string (e.g., "date_desc", "date_asc")
   * @returns Promise<PaginatedResponse> - Paginated response with data and metadata
   */
  async getAll(
    searchFilters: ProfessionalServiceSearchFilters = {},
    currentPage: number = 1,
    pageSize: number = 10,
    sort?: string
  ): Promise<PaginatedResponse> {
    try {
      await connectDB();
  

      // Sanitize all incoming filters to prevent NoSQL injection
      const sanitizedFilters: ProfessionalServiceSearchFilters = {
        // textSearch: sanitize(searchFilters.textSearch),
        categoryId: sanitize(searchFilters.categoryId),
        subCategoryId: sanitize(searchFilters.subCategoryId),
        district: sanitize(searchFilters.district),
        city: sanitize(searchFilters.city),
        // description: sanitize(searchFilters.description),
      };

      // Build search filter using MongoDB text index and structured filters
      const searchFilter: FilterQuery<typeof ProfessionalService> = {};

      // Add text search using MongoDB text index (fast and efficient)
      // if (sanitizedFilters.textSearch?.trim()) {
      //   searchFilter.$text = { $search: sanitizedFilters.textSearch.trim() };
      // }

      // Add category filter
      if (sanitizedFilters.categoryId) {
        // Validate ObjectId format before adding to filter
        const isValidObjectId = sanitizedFilters.categoryId.every((id) => mongoose.Types.ObjectId.isValid(id));
        if (isValidObjectId) {
          searchFilter.category = { $in: sanitizedFilters.categoryId }; // sanitizedFilters.categoryId;
        } else {
          // Invalid ObjectId - return empty results by adding impossible filter
          searchFilter._id = new mongoose.Types.ObjectId();
        }
      }

      // Add subcategory filter
      if (sanitizedFilters.subCategoryId) {
        // Validate ObjectId format before adding to filter
        const isValidObjectId = sanitizedFilters.subCategoryId.every((id) => mongoose.Types.ObjectId.isValid(id));
        if (isValidObjectId) {
          searchFilter.subCategory = { $in: sanitizedFilters.subCategoryId };
        } else {
          // Invalid ObjectId - return empty results by adding impossible filter
          searchFilter._id = new mongoose.Types.ObjectId();
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

      // if (sanitizedFilters.description?.trim()) {
      //   searchFilter.description = {
      //     $regex: sanitizedFilters.description.trim(),
      //     $options: "i",
      //   };
      // }

      // Calculate pagination
      const skip = (currentPage - 1) * pageSize;

      // Get total count for pagination
      const totalCount = await ProfessionalService.countDocuments(searchFilter);
      const totalPages = Math.ceil(totalCount / pageSize);

      // Parse and build sort object
      const sortOptions = parseSortString(sort);
      const sortObject = buildSortObject(sortOptions);

      // Fetch paginated results
      const professionalServices = await ProfessionalService.find(searchFilter)
        .populate("category")
        .populate("subCategory")
        .populate("user")
        .sort(sortObject)
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
