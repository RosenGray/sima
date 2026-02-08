import {
  CommercialRealEstate,
  ICommercialRealEstate,
} from "../models/CommercialRealEstate";
import connectDB from "@/lib/mongo/mongodb";
import {
  SerializedCommercialRealEstate,
  CommercialPropertyKind,
  DealKind,
} from "../types/commercialRealEstate.types";
import { FilterQuery } from "mongoose";
import mongoose from "mongoose";
import sanitize from "mongo-sanitize";

export interface CommercialRealEstateSearchFilters {
  propertyKind?: string[];
  dealKind?: string[];
  district?: string[];
  city?: string[];
  priceFrom?: number;
  priceTo?: number;
  squaremeterFrom?: number;
  squaremeterTo?: number;
  additionalFeatures?: string[];
  textSearch?: string; // searches streetname + description
}

interface PaginatedResponse {
  data: SerializedCommercialRealEstate[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

class CommercialRealEstateRepository {
  /**
   * Get all commercial real estate with search and pagination
   * @param searchFilters - Object containing search criteria
   * @param currentPage - Current page number (1-based)
   * @param pageSize - Number of items per page (default: 10)
   * @returns Promise<PaginatedResponse> - Paginated response with data and metadata
   */
  async getAll(
    searchFilters: CommercialRealEstateSearchFilters = {},
    currentPage: number = 1,
    pageSize: number = 10
  ): Promise<PaginatedResponse> {
    try {
      await connectDB();

      // Sanitize all incoming filters to prevent NoSQL injection
      const sanitizedFilters: CommercialRealEstateSearchFilters = {
        propertyKind: sanitize(searchFilters.propertyKind),
        dealKind: sanitize(searchFilters.dealKind),
        district: sanitize(searchFilters.district),
        city: sanitize(searchFilters.city),
        priceFrom: sanitize(searchFilters.priceFrom),
        priceTo: sanitize(searchFilters.priceTo),
        squaremeterFrom: sanitize(searchFilters.squaremeterFrom),
        squaremeterTo: sanitize(searchFilters.squaremeterTo),
        additionalFeatures: sanitize(searchFilters.additionalFeatures),
        textSearch: sanitize(searchFilters.textSearch),
      };

      // Build search filter using MongoDB query
      const searchFilter: FilterQuery<typeof CommercialRealEstate> = {};

      const validCommercialPropertyKindValues = Object.values(
        CommercialPropertyKind
      ).filter(
        (v): v is CommercialPropertyKind => typeof v === "number"
      );
      const validDealKindValues = Object.values(DealKind).filter(
        (v): v is DealKind => typeof v === "number"
      );

      // Add propertyKind filter
      if (sanitizedFilters.propertyKind) {
        const propertyKindNumbers = sanitizedFilters.propertyKind
          .map((pk) => Number(pk))
          .filter(
            (num) =>
              !Number.isNaN(num) &&
              validCommercialPropertyKindValues.includes(num as CommercialPropertyKind)
          );

        if (propertyKindNumbers.length > 0) {
          searchFilter.propertyKind = { $in: propertyKindNumbers };
        }
      }

      // Add dealKind filter
      if (sanitizedFilters.dealKind) {
        const dealKindNumbers = sanitizedFilters.dealKind
          .map((dk) => Number(dk))
          .filter(
            (num) =>
              !Number.isNaN(num) && validDealKindValues.includes(num as DealKind)
          );

        if (dealKindNumbers.length > 0) {
          searchFilter.dealKind = { $in: dealKindNumbers };
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
      if (
        sanitizedFilters.priceFrom !== undefined &&
        sanitizedFilters.priceFrom !== null
      ) {
        const priceFromNum = Number(sanitizedFilters.priceFrom);
        if (!Number.isNaN(priceFromNum) && priceFromNum >= 0) {
          searchFilter.price = { $gte: priceFromNum };
        }
      }

      if (
        sanitizedFilters.priceTo !== undefined &&
        sanitizedFilters.priceTo !== null
      ) {
        const priceToNum = Number(sanitizedFilters.priceTo);
        if (!Number.isNaN(priceToNum) && priceToNum >= 0) {
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

      // Add squaremeter range filters
      if (
        sanitizedFilters.squaremeterFrom !== undefined &&
        sanitizedFilters.squaremeterFrom !== null
      ) {
        const squaremeterFromNum = Number(sanitizedFilters.squaremeterFrom);
        if (!Number.isNaN(squaremeterFromNum) && squaremeterFromNum >= 0) {
          searchFilter.squaremeter = { $gte: squaremeterFromNum };
        }
      }

      if (
        sanitizedFilters.squaremeterTo !== undefined &&
        sanitizedFilters.squaremeterTo !== null
      ) {
        const squaremeterToNum = Number(sanitizedFilters.squaremeterTo);
        if (!Number.isNaN(squaremeterToNum) && squaremeterToNum >= 0) {
          if (searchFilter.squaremeter) {
            searchFilter.squaremeter = {
              ...searchFilter.squaremeter,
              $lte: squaremeterToNum,
            };
          } else {
            searchFilter.squaremeter = { $lte: squaremeterToNum };
          }
        }
      }

      // Add additionalFeatures filter
      if (sanitizedFilters.additionalFeatures) {
        const additionalFeaturesNumbers = sanitizedFilters.additionalFeatures
          .map((af) => Number(af))
          .filter((num) => !Number.isNaN(num) && num >= 1 && num <= 7);

        if (additionalFeaturesNumbers.length > 0) {
          searchFilter.additionalFeatures = { $in: additionalFeaturesNumbers };
        }
      }

      // Add text search filter (search in description and streetname)
      if (sanitizedFilters.textSearch?.trim()) {
        const searchTerm = sanitizedFilters.textSearch.trim();
        searchFilter.$or = [
          { description: { $regex: searchTerm, $options: "i" } },
          { streetname: { $regex: searchTerm, $options: "i" } },
        ];
      }

      // Calculate pagination
      const skip = (currentPage - 1) * pageSize;

      // Get total count for pagination
      const totalCount = await CommercialRealEstate.countDocuments(searchFilter);
      const totalPages = Math.ceil(totalCount / pageSize);

      // Fetch paginated results
      const commercialRealEstates = await CommercialRealEstate.find(
        searchFilter
      )
        .populate("user")
        .sort({ createdAt: -1, _id: -1 })
        .skip(skip)
        .limit(pageSize);

      // Serialize to remove MongoDB ObjectIds and other non-serializable types
      const serializedCommercialRealEstates = JSON.parse(
        JSON.stringify(commercialRealEstates)
      );

      return {
        data: serializedCommercialRealEstates,
        totalCount,
        currentPage,
        totalPages,
        hasNextPage: currentPage < totalPages,
        hasPreviousPage: currentPage > 1,
      };
    } catch (error) {
      console.error("Error fetching commercial real estate:", error);
      throw new Error("Failed to fetch commercial real estate");
    }
  }

  /**
   * Get a commercial real estate by publicId
   * @param publicId - The public ID of the commercial real estate
   * @returns Promise<SerializedCommercialRealEstate | null> - The commercial real estate or null if not found
   */
  async getByPublicId(
    publicId: string
  ): Promise<SerializedCommercialRealEstate | null> {
    try {
      await connectDB();

      const commercialRealEstate = await CommercialRealEstate.findOne({
        publicId,
      }).populate("user");

      if (!commercialRealEstate) {
        return null;
      }

      // Serialize to remove MongoDB ObjectIds and other non-serializable types
      const serializedCommercialRealEstate = JSON.parse(
        JSON.stringify(commercialRealEstate)
      );

      return serializedCommercialRealEstate;
    } catch (error) {
      console.error("Error fetching commercial real estate:", error);
      throw new Error("Failed to fetch commercial real estate");
    }
  }

  /**
   * Get a commercial real estate by MongoDB _id
   * @param id - The MongoDB _id of the commercial real estate
   * @returns Promise<SerializedCommercialRealEstate | null> - The commercial real estate or null if not found
   */
  async getById(
    id: string
  ): Promise<SerializedCommercialRealEstate | null> {
    try {
      await connectDB();

      // Validate ObjectId format
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return null;
      }

      const commercialRealEstate = await CommercialRealEstate.findById(
        id
      ).populate("user");

      if (!commercialRealEstate) {
        return null;
      }

      // Serialize to remove MongoDB ObjectIds and other non-serializable types
      const serializedCommercialRealEstate = JSON.parse(
        JSON.stringify(commercialRealEstate)
      );

      return serializedCommercialRealEstate;
    } catch (error) {
      console.error("Error fetching commercial real estate:", error);
      throw new Error("Failed to fetch commercial real estate");
    }
  }

  /**
   * Create a new commercial real estate
   * @param commercialRealEstateData - Commercial real estate data to create
   * @returns Promise<SerializedCommercialRealEstate> - The created commercial real estate
   */
  async create(
    commercialRealEstateData: Omit<
      ICommercialRealEstate,
      "id" | "createdAt" | "updatedAt"
    >
  ): Promise<SerializedCommercialRealEstate> {
    try {
      await connectDB();

      const commercialRealEstate = new CommercialRealEstate(
        commercialRealEstateData
      );
      await commercialRealEstate.save();
      await commercialRealEstate.populate("user");

      // Serialize to remove MongoDB ObjectIds and other non-serializable types
      const serializedCommercialRealEstate = JSON.parse(
        JSON.stringify(commercialRealEstate)
      );

      return serializedCommercialRealEstate;
    } catch (error) {
      console.error("Error creating commercial real estate:", error);
      throw new Error("Failed to create commercial real estate");
    }
  }

  /**
   * Update a commercial real estate by publicId
   * @param publicId - The public ID of the commercial real estate to update
   * @param updateData - Partial commercial real estate data to update
   * @returns Promise<SerializedCommercialRealEstate | null> - The updated commercial real estate or null if not found
   */
  async edit(
    publicId: string,
    updateData: Partial<ICommercialRealEstate>
  ): Promise<SerializedCommercialRealEstate | null> {
    try {
      await connectDB();

      const commercialRealEstate = await CommercialRealEstate.findOneAndUpdate(
        { publicId },
        { ...updateData },
        { new: true, runValidators: true }
      ).populate("user");

      if (!commercialRealEstate) {
        return null;
      }

      await commercialRealEstate.save();

      // Serialize to remove MongoDB ObjectIds and other non-serializable types
      const serializedCommercialRealEstate = JSON.parse(
        JSON.stringify(commercialRealEstate)
      );

      return serializedCommercialRealEstate;
    } catch (error) {
      console.error("Error updating commercial real estate:", error);
      throw new Error("Failed to update commercial real estate");
    }
  }

  /**
   * Delete a commercial real estate by publicId
   * @param publicId - The public ID of the commercial real estate to delete
   * @returns Promise<boolean> - True if deleted, false if not found
   */
  async delete(publicId: string): Promise<boolean> {
    try {
      await connectDB();

      const result = await CommercialRealEstate.findOneAndDelete({
        publicId,
      });

      return result !== null;
    } catch (error) {
      console.error("Error deleting commercial real estate:", error);
      throw new Error("Failed to delete commercial real estate");
    }
  }
}

export const commercialRealEstateRepository =
  new CommercialRealEstateRepository();
