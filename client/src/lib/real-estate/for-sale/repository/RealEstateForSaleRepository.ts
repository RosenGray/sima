import { RealEstateForSale, IRealEstateForSale } from "../models/RealEstateForSale";
import connectDB from "@/lib/mongo/mongodb";
import { SerializedRealEstateForSale } from "../types/realEstateForSale.types";
import { FilterQuery } from "mongoose";
import mongoose from "mongoose";
import sanitize from "mongo-sanitize";

export interface RealEstateForSaleSearchFilters {
  propertyKind?: string[];
  district?: string[];
  city?: string[];
  numberOfRooms?: string[];
  priceFrom?: number;
  priceTo?: number;
  airconditioning?: string[];
  balcony?: string[];
  parking?: string[];
  floor?: string[];
  totalflors?: string[];
  additionalFeatures?: string[];
  furniture?: string[];
  entryDate?: string[];
  year?: string[];
  month?: string[];
  day?: string[];
  textSearch?: string;
}

interface PaginatedResponse {
  data: SerializedRealEstateForSale[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

class RealEstateForSaleRepository {
  /**
   * Get all real estate for sale with search and pagination
   * @param searchFilters - Object containing search criteria
   * @param currentPage - Current page number (1-based)
   * @param pageSize - Number of items per page (default: 10)
   * @returns Promise<PaginatedResponse> - Paginated response with data and metadata
   */
  async getAll(
    searchFilters: RealEstateForSaleSearchFilters = {},
    currentPage: number = 1,
    pageSize: number = 10
  ): Promise<PaginatedResponse> {
    try {
      await connectDB();

      // Sanitize all incoming filters to prevent NoSQL injection
      const sanitizedFilters: RealEstateForSaleSearchFilters = {
        propertyKind: sanitize(searchFilters.propertyKind),
        district: sanitize(searchFilters.district),
        city: sanitize(searchFilters.city),
        numberOfRooms: sanitize(searchFilters.numberOfRooms),
        priceFrom: sanitize(searchFilters.priceFrom),
        priceTo: sanitize(searchFilters.priceTo),
        airconditioning: sanitize(searchFilters.airconditioning),
        balcony: sanitize(searchFilters.balcony),
        parking: sanitize(searchFilters.parking),
        floor: sanitize(searchFilters.floor),
        totalflors: sanitize(searchFilters.totalflors),
        additionalFeatures: sanitize(searchFilters.additionalFeatures),
        furniture: sanitize(searchFilters.furniture),
        entryDate: sanitize(searchFilters.entryDate),
        year: sanitize(searchFilters.year),
        month: sanitize(searchFilters.month),
        day: sanitize(searchFilters.day),
        textSearch: sanitize(searchFilters.textSearch),
      };

      // Build search filter using MongoDB query
      const searchFilter: FilterQuery<typeof RealEstateForSale> = {};

      // Add propertyKind filter
      if (sanitizedFilters.propertyKind) {
        const propertyKindNumbers = sanitizedFilters.propertyKind
          .map((pk) => Number(pk))
          .filter((num) => !Number.isNaN(num) && num >= 1 && num <= 2);

        if (propertyKindNumbers.length > 0) {
          searchFilter.propertyKind = { $in: propertyKindNumbers };
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

      // Add numberOfRooms filter
      if (sanitizedFilters.numberOfRooms) {
        const numberOfRoomsNumbers = sanitizedFilters.numberOfRooms
          .map((nor) => Number(nor))
          .filter((num) => !Number.isNaN(num));

        if (numberOfRoomsNumbers.length > 0) {
          searchFilter.numberOfRooms = { $in: numberOfRoomsNumbers };
        }
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

      // Add airconditioning filter
      if (sanitizedFilters.airconditioning) {
        const airconditioningNumbers = sanitizedFilters.airconditioning
          .map((ac) => Number(ac))
          .filter((num) => !Number.isNaN(num) && num >= 1 && num <= 7);

        if (airconditioningNumbers.length > 0) {
          searchFilter.airconditioning = { $in: airconditioningNumbers };
        }
      }

      // Add balcony filter
      if (sanitizedFilters.balcony) {
        const balconyNumbers = sanitizedFilters.balcony
          .map((b) => Number(b))
          .filter((num) => !Number.isNaN(num) && num >= 0 && num <= 4);

        if (balconyNumbers.length > 0) {
          searchFilter.balcony = { $in: balconyNumbers };
        }
      }

      // Add parking filter
      if (sanitizedFilters.parking) {
        const parkingNumbers = sanitizedFilters.parking
          .map((p) => Number(p))
          .filter((num) => !Number.isNaN(num) && num >= 1 && num <= 6);

        if (parkingNumbers.length > 0) {
          searchFilter.parking = { $in: parkingNumbers };
        }
      }

      // Add floor filter
      if (sanitizedFilters.floor) {
        const floorNumbers = sanitizedFilters.floor
          .map((f) => Number(f))
          .filter((num) => !Number.isNaN(num) && num >= -1 && num <= 50);

        if (floorNumbers.length > 0) {
          searchFilter.floor = { $in: floorNumbers };
        }
      }

      // Add totalflors filter
      if (sanitizedFilters.totalflors) {
        const totalflorsNumbers = sanitizedFilters.totalflors
          .map((tf) => Number(tf))
          .filter((num) => !Number.isNaN(num) && num >= -1 && num <= 50);

        if (totalflorsNumbers.length > 0) {
          searchFilter.totalflors = { $in: totalflorsNumbers };
        }
      }

      // Add additionalFeatures filter
      if (sanitizedFilters.additionalFeatures) {
        const additionalFeaturesNumbers = sanitizedFilters.additionalFeatures
          .map((af) => Number(af))
          .filter((num) => !Number.isNaN(num) && num >= 1 && num <= 8);

        if (additionalFeaturesNumbers.length > 0) {
          searchFilter.additionalFeatures = { $in: additionalFeaturesNumbers };
        }
      }

      // Add furniture filter
      if (sanitizedFilters.furniture) {
        const furnitureNumbers = sanitizedFilters.furniture
          .map((f) => Number(f))
          .filter((num) => !Number.isNaN(num) && num >= 1 && num <= 3);

        if (furnitureNumbers.length > 0) {
          searchFilter.furniture = { $in: furnitureNumbers };
        }
      }

      // Add entryDate filter
      if (sanitizedFilters.entryDate) {
        const entryDateNumbers = sanitizedFilters.entryDate
          .map((ed) => Number(ed))
          .filter((num) => !Number.isNaN(num) && num >= 1 && num <= 2);

        if (entryDateNumbers.length > 0) {
          searchFilter.entryDate = { $in: entryDateNumbers };
        }
      }

      // Add year filter
      if (sanitizedFilters.year) {
        const yearNumbers = sanitizedFilters.year
          .map((y) => Number(y))
          .filter((num) => !Number.isNaN(num));

        if (yearNumbers.length > 0) {
          searchFilter.year = { $in: yearNumbers };
        }
      }

      // Add month filter
      if (sanitizedFilters.month) {
        const monthNumbers = sanitizedFilters.month
          .map((m) => Number(m))
          .filter((num) => !Number.isNaN(num) && num >= 1 && num <= 12);

        if (monthNumbers.length > 0) {
          searchFilter.month = { $in: monthNumbers };
        }
      }

      // Add day filter
      if (sanitizedFilters.day) {
        const dayNumbers = sanitizedFilters.day
          .map((d) => Number(d))
          .filter((num) => !Number.isNaN(num) && num >= 1 && num <= 31);

        if (dayNumbers.length > 0) {
          searchFilter.day = { $in: dayNumbers };
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
      const totalCount = await RealEstateForSale.countDocuments(searchFilter);
      const totalPages = Math.ceil(totalCount / pageSize);

      // Fetch paginated results
      const realEstates = await RealEstateForSale.find(searchFilter)
        .populate("user")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(pageSize);

      // Serialize to remove MongoDB ObjectIds and other non-serializable types
      const serializedRealEstates = JSON.parse(JSON.stringify(realEstates));

      return {
        data: serializedRealEstates,
        totalCount,
        currentPage,
        totalPages,
        hasNextPage: currentPage < totalPages,
        hasPreviousPage: currentPage > 1,
      };
    } catch (error) {
      console.error("Error fetching real estate for sale:", error);
      throw new Error("Failed to fetch real estate for sale");
    }
  }

  /**
   * Get a real estate for sale by publicId
   * @param publicId - The public ID of the real estate
   * @returns Promise<SerializedRealEstateForSale | null> - The real estate or null if not found
   */
  async getByPublicId(
    publicId: string
  ): Promise<SerializedRealEstateForSale | null> {
    try {
      await connectDB();

      const realEstate = await RealEstateForSale.findOne({
        publicId,
      }).populate("user");

      if (!realEstate) {
        return null;
      }

      // Serialize to remove MongoDB ObjectIds and other non-serializable types
      const serializedRealEstate = JSON.parse(JSON.stringify(realEstate));

      return serializedRealEstate;
    } catch (error) {
      console.error("Error fetching real estate for sale:", error);
      throw new Error("Failed to fetch real estate for sale");
    }
  }

  /**
   * Get a real estate for sale by MongoDB _id
   * @param id - The MongoDB _id of the real estate
   * @returns Promise<SerializedRealEstateForSale | null> - The real estate or null if not found
   */
  async getById(id: string): Promise<SerializedRealEstateForSale | null> {
    try {
      await connectDB();

      // Validate ObjectId format
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return null;
      }

      const realEstate = await RealEstateForSale.findById(id).populate("user");

      if (!realEstate) {
        return null;
      }

      // Serialize to remove MongoDB ObjectIds and other non-serializable types
      const serializedRealEstate = JSON.parse(JSON.stringify(realEstate));

      return serializedRealEstate;
    } catch (error) {
      console.error("Error fetching real estate for sale:", error);
      throw new Error("Failed to fetch real estate for sale");
    }
  }

  /**
   * Create a new real estate for sale
   * @param realEstateData - Real estate data to create
   * @returns Promise<SerializedRealEstateForSale> - The created real estate
   */
  async create(
    realEstateData: Omit<
      IRealEstateForSale,
      "id" | "createdAt" | "updatedAt"
    >
  ): Promise<SerializedRealEstateForSale> {
    try {
      await connectDB();

      const realEstate = new RealEstateForSale(realEstateData);
      await realEstate.save();
      await realEstate.populate("user");

      // Serialize to remove MongoDB ObjectIds and other non-serializable types
      const serializedRealEstate = JSON.parse(JSON.stringify(realEstate));

      return serializedRealEstate;
    } catch (error) {
      console.error("Error creating real estate for sale:", error);
      throw new Error("Failed to create real estate for sale");
    }
  }

  /**
   * Update a real estate for sale by publicId
   * @param publicId - The public ID of the real estate to update
   * @param updateData - Partial real estate data to update
   * @returns Promise<SerializedRealEstateForSale | null> - The updated real estate or null if not found
   */
  async edit(
    publicId: string,
    updateData: Partial<IRealEstateForSale>
  ): Promise<SerializedRealEstateForSale | null> {
    try {
      await connectDB();

      const realEstate = await RealEstateForSale.findOneAndUpdate(
        { publicId },
        { ...updateData },
        { new: true, runValidators: true }
      ).populate("user");

      if (!realEstate) {
        return null;
      }

      await realEstate.save();

      // Serialize to remove MongoDB ObjectIds and other non-serializable types
      const serializedRealEstate = JSON.parse(JSON.stringify(realEstate));

      return serializedRealEstate;
    } catch (error) {
      console.error("Error updating real estate for sale:", error);
      throw new Error("Failed to update real estate for sale");
    }
  }

  /**
   * Delete a real estate for sale by publicId
   * @param publicId - The public ID of the real estate to delete
   * @returns Promise<boolean> - True if deleted, false if not found
   */
  async delete(publicId: string): Promise<boolean> {
    try {
      await connectDB();

      const result = await RealEstateForSale.findOneAndDelete({
        publicId,
      });

      return result !== null;
    } catch (error) {
      console.error("Error deleting real estate for sale:", error);
      throw new Error("Failed to delete real estate for sale");
    }
  }
}

export const realEstateForSaleRepository = new RealEstateForSaleRepository();
