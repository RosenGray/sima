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
   * @returns Promise<PaginatedResponse> - Paginated response with data and metadata
   */
  async getAll(
    searchFilters: JobSearchFilters = {},
    currentPage: number = 1,
    pageSize: number = 10
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

      // Fetch results
      const results = await Job.find(searchFilter)
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
