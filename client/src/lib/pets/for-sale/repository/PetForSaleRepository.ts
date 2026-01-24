import { PetForSale, IPetForSale } from "../models/PetForSale";
import connectDB from "@/lib/mongo/mongodb";
import { SerializedPetForSale } from "../types/petForSale.types";
import { FilterQuery } from "mongoose";
import mongoose from "mongoose";
import sanitize from "mongo-sanitize";

export interface PetForSaleSearchFilters {
  animal?: string[];
  kind?: string[];
  priceFrom?: number;
  priceTo?: number;
  district?: string[];
  city?: string[];
  textSearch?: string; // Free text search like Yad2
  adjustments?: string[]; // PetAdjustments enum values (1-9)
}

export type SortField = "date" | "price" | "age";
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

  const validFields: SortField[] = ["date", "price", "age"];
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
 * Maps user-friendly field names to MongoDB field names
 */
function buildSortObject(
  sortOptions: SortOptions | null
): Record<string, 1 | -1> {
  // Default sort: newest first (date_desc)
  if (!sortOptions) {
    return { createdAt: -1 };
  }

  // Map sort fields to MongoDB field names
  const fieldMap: Record<SortField, string> = {
    date: "createdAt",
    price: "price",
    age: "age",
  };

  const mongoField = fieldMap[sortOptions.field];
  const mongoDirection = sortOptions.direction === "asc" ? 1 : -1;

  return {
    [mongoField]: mongoDirection,
  };
}

interface PaginatedResponse {
  data: SerializedPetForSale[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

class PetForSaleRepository {
  /**
   * Get all pets for sale with search and pagination
   * @param searchFilters - Object containing search criteria
   * @param currentPage - Current page number (1-based)
   * @param pageSize - Number of items per page (default: 10)
   * @param sort - Sort string (e.g., "date_desc", "price_asc")
   * @returns Promise<PaginatedResponse> - Paginated response with data and metadata
   */
  async getAll(
    searchFilters: PetForSaleSearchFilters = {},
    currentPage: number = 1,
    pageSize: number = 10,
    sort?: string
  ): Promise<PaginatedResponse> {
    try {
      await connectDB();

      // Sanitize all incoming filters to prevent NoSQL injection
      const sanitizedFilters: PetForSaleSearchFilters = {
        animal: sanitize(searchFilters.animal),
        kind: sanitize(searchFilters.kind),
        priceFrom: sanitize(searchFilters.priceFrom),
        priceTo: sanitize(searchFilters.priceTo),
        district: sanitize(searchFilters.district),
        city: sanitize(searchFilters.city),
        textSearch: sanitize(searchFilters.textSearch),
        adjustments: sanitize(searchFilters.adjustments),
      };

      // Build search filter using MongoDB query
      const searchFilter: FilterQuery<typeof PetForSale> = {};

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

      // Add adjustments filter
      if (sanitizedFilters.adjustments) {
        // Convert string array to number array and validate
        const adjustmentNumbers = sanitizedFilters.adjustments
          .map((adj) => Number(adj))
          .filter((num) => !Number.isNaN(num) && num >= 1 && num <= 9);

        if (adjustmentNumbers.length > 0) {
          // Match documents where adjustments array contains any of the selected values
          searchFilter.adjustments = { $in: adjustmentNumbers };
        }
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

      // Add text search filter (search in description)
      if (sanitizedFilters.textSearch?.trim()) {
        const searchTerm = sanitizedFilters.textSearch.trim();
        searchFilter.$or = [
          { description: { $regex: searchTerm, $options: "i" } },
        ];
      }

      // Calculate pagination
      const skip = (currentPage - 1) * pageSize;

      // Get total count for pagination
      const totalCount = await PetForSale.countDocuments(searchFilter);
      const totalPages = Math.ceil(totalCount / pageSize);

      // Parse and build sort object
      const sortOptions = parseSortString(sort);
      const sortObject = buildSortObject(sortOptions);

      // Fetch paginated results
      const pets = await PetForSale.find(searchFilter)
        .populate("user")
        .sort(sortObject)
        .skip(skip)
        .limit(pageSize);

      // Serialize to remove MongoDB ObjectIds and other non-serializable types
      const serializedPets = JSON.parse(JSON.stringify(pets));

      return {
        data: serializedPets,
        totalCount,
        currentPage,
        totalPages,
        hasNextPage: currentPage < totalPages,
        hasPreviousPage: currentPage > 1,
      };
    } catch (error) {
      console.error("Error fetching pets for sale:", error);
      throw new Error("Failed to fetch pets for sale");
    }
  }

  /**
   * Get a pet for sale by publicId
   * @param publicId - The public ID of the pet
   * @returns Promise<SerializedPetForSale | null> - The pet or null if not found
   */
  async getByPublicId(
    publicId: string
  ): Promise<SerializedPetForSale | null> {
    try {
      await connectDB();

      const pet = await PetForSale.findOne({
        publicId,
      }).populate("user");

      if (!pet) {
        return null;
      }

      // Serialize to remove MongoDB ObjectIds and other non-serializable types
      const serializedPet = JSON.parse(JSON.stringify(pet));

      return serializedPet;
    } catch (error) {
      console.error("Error fetching pet for sale:", error);
      throw new Error("Failed to fetch pet for sale");
    }
  }

  /**
   * Get a pet for sale by MongoDB _id
   * @param id - The MongoDB _id of the pet
   * @returns Promise<SerializedPetForSale | null> - The pet or null if not found
   */
  async getById(id: string): Promise<SerializedPetForSale | null> {
    try {
      await connectDB();

      // Validate ObjectId format
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return null;
      }

      const pet = await PetForSale.findById(id).populate("user");

      if (!pet) {
        return null;
      }

      // Serialize to remove MongoDB ObjectIds and other non-serializable types
      const serializedPet = JSON.parse(JSON.stringify(pet));

      return serializedPet;
    } catch (error) {
      console.error("Error fetching pet for sale:", error);
      throw new Error("Failed to fetch pet for sale");
    }
  }

  /**
   * Create a new pet for sale
   * @param petData - Pet data to create
   * @returns Promise<SerializedPetForSale> - The created pet
   */
  async create(
    petData: Omit<IPetForSale, "id" | "createdAt" | "updatedAt">
  ): Promise<SerializedPetForSale> {
    try {
      await connectDB();

      const pet = new PetForSale(petData);
      await pet.save();
      await pet.populate("user");

      // Serialize to remove MongoDB ObjectIds and other non-serializable types
      const serializedPet = JSON.parse(JSON.stringify(pet));

      return serializedPet;
    } catch (error) {
      console.error("Error creating pet for sale:", error);
      throw new Error("Failed to create pet for sale");
    }
  }

  /**
   * Update a pet for sale by publicId
   * @param publicId - The public ID of the pet to update
   * @param updateData - Partial pet data to update
   * @returns Promise<SerializedPetForSale | null> - The updated pet or null if not found
   */
  async edit(
    publicId: string,
    updateData: Partial<IPetForSale>
  ): Promise<SerializedPetForSale | null> {
    try {
      await connectDB();

      const pet = await PetForSale.findOneAndUpdate(
        { publicId },
        { ...updateData },
        { new: true, runValidators: true }
      ).populate("user");

      if (!pet) {
        return null;
      }

      await pet.save();

      // Serialize to remove MongoDB ObjectIds and other non-serializable types
      const serializedPet = JSON.parse(JSON.stringify(pet));

      return serializedPet;
    } catch (error) {
      console.error("Error updating pet for sale:", error);
      throw new Error("Failed to update pet for sale");
    }
  }

  /**
   * Delete a pet for sale by publicId
   * @param publicId - The public ID of the pet to delete
   * @returns Promise<boolean> - True if deleted, false if not found
   */
  async delete(publicId: string): Promise<boolean> {
    try {
      await connectDB();

      const result = await PetForSale.findOneAndDelete({
        publicId,
      });

      return result !== null;
    } catch (error) {
      console.error("Error deleting pet for sale:", error);
      throw new Error("Failed to delete pet for sale");
    }
  }
}

export const petForSaleRepository = new PetForSaleRepository();
