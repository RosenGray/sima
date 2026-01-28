import { Job } from "../models/Job";
import { IJob } from "../types/job.types";
import connectDB from "@/lib/mongo/mongodb";
import { SerializedJob } from "../types/job.types";
import { FilterQuery } from "mongoose";
import sanitize from "mongo-sanitize";

export interface JobSearchFilters {
  district?: string[];
  city?: string[];
  textSearch?: string;
}

export type SortField = "date";
export type SortDirection = "asc" | "desc";
export interface SortOptions {
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

  // Section-specific valid fields
  const validFields: SortField[] = ["date"];
  const validDirections: SortDirection[] = ["asc", "desc"];

  // Validate against allowlist
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
 * Maps user-friendly field names to MongoDB field names
 */
function buildSortObject(sortOptions: SortOptions | null): Record<string, 1 | -1> {
  // Default sort: newest first (date_desc)
  if (!sortOptions) {
    return { createdAt: -1 };
  }

  // Map sort fields to MongoDB field names
  const fieldMap: Record<SortField, string> = {
    date: "createdAt",
  };

  const mongoField = fieldMap[sortOptions.field];
  const mongoDirection = sortOptions.direction === "asc" ? 1 : -1;

  return {
    [mongoField]: mongoDirection,
  };
}

interface PaginatedResponse {
  data: SerializedJob[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

class JobRepository {
  /**
   * Get all jobs with search and pagination
   * @param searchFilters - Object containing search criteria
   * @param currentPage - Current page number (1-based)
   * @param pageSize - Number of items per page (default: 10)
   * @param sort - Sort string from URL (e.g., "date_desc")
   * @returns Promise<PaginatedResponse> - Paginated response with data and metadata
   */
  async getAll(
    searchFilters: JobSearchFilters = {},
    currentPage: number = 1,
    pageSize: number = 10,
    sort?: string
  ): Promise<PaginatedResponse> {
    try {
      await connectDB();

      // Sanitize all incoming filters to prevent NoSQL injection
      const sanitizedFilters: JobSearchFilters = {
        district: sanitize(searchFilters.district),
        city: sanitize(searchFilters.city),
        textSearch: sanitize(searchFilters.textSearch),
      };

      // Build search filter using MongoDB query
      const searchFilter: FilterQuery<typeof Job> = {};

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
      const totalCount = await Job.countDocuments(searchFilter);
      const totalPages = Math.ceil(totalCount / pageSize);

      // Parse and build sort object
      const sortOptions = parseSortString(sort);
      const sortObject = buildSortObject(sortOptions);

      // Fetch results
      const results = await Job.find(searchFilter)
        .populate("user")
        .sort(sortObject)
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
      console.error("Error fetching jobs:", error);
      throw new Error("Failed to fetch jobs");
    }
  }

  /**
   * Get a job by publicId
   * @param publicId - The public ID of the job
   * @returns Promise<SerializedJob | null> - The job or null if not found
   */
  async getByPublicId(publicId: string): Promise<SerializedJob | null> {
    try {
      await connectDB();

      const job = await Job.findOne({ publicId }).populate("user");

      if (!job) {
        return null;
      }

      // Serialize to remove MongoDB ObjectIds and other non-serializable types
      const serializedJob = JSON.parse(JSON.stringify(job));

      return serializedJob;
    } catch (error) {
      console.error("Error fetching job by publicId:", error);
      throw new Error("Failed to fetch job");
    }
  }

  /**
   * Create a new job
   * @param data - Job data
   * @returns Promise<SerializedJob> - Created job
   */
  async create(data: Partial<IJob>): Promise<SerializedJob> {
    try {
      await connectDB();

      const job = new Job(data);
      await job.save();
      await job.populate("user");

      return JSON.parse(JSON.stringify(job));
    } catch (error) {
      console.error("Error creating job:", error);
      throw new Error("Failed to create job");
    }
  }

  /**
   * Edit an existing job
   * @param publicId - Public ID of the job
   * @param updateData - Updated job data
   * @returns Promise<SerializedJob | null> - Updated job or null if not found
   */
  async edit(
    publicId: string,
    updateData: Partial<IJob>
  ): Promise<SerializedJob | null> {
    try {
      await connectDB();

      const job = await Job.findOneAndUpdate(
        { publicId },
        { ...updateData },
        { new: true }
      ).populate("user");

      if (!job) {
        return null;
      }

      return JSON.parse(JSON.stringify(job));
    } catch (error) {
      console.error("Error editing job:", error);
      throw new Error("Failed to edit job");
    }
  }

  /**
   * Delete a job
   * @param publicId - Public ID of the job
   * @returns Promise<boolean> - True if deleted, false if not found
   */
  async delete(publicId: string): Promise<boolean> {
    try {
      await connectDB();

      const result = await Job.findOneAndDelete({ publicId });

      return !!result;
    } catch (error) {
      console.error("Error deleting job:", error);
      throw new Error("Failed to delete job");
    }
  }
}

export const jobRepository = new JobRepository();
