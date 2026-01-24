import { PetForFree, IPetForFree } from "../models/PetForFree";
import connectDB from "@/lib/mongo/mongodb";
import { SerializedPetForFree } from "../types/petForFree.types";
import { FilterQuery } from "mongoose";
import mongoose from "mongoose";
import sanitize from "mongo-sanitize";

export interface PetForFreeSearchFilters {
  animal?: string[];
  kind?: string[];
  district?: string[];
  city?: string[];
  textSearch?: string;
  adjustments?: string[];
}

export type SortField = "date" | "age";
export type SortDirection = "asc" | "desc";
export interface SortOptions {
  field: SortField;
  direction: SortDirection;
}

function parseSortString(sort?: string): SortOptions | null {
  if (!sort || typeof sort !== "string") {
    return null;
  }

  const parts = sort.split("_");
  if (parts.length !== 2) {
    return null;
  }

  const [field, direction] = parts;

  const validFields: SortField[] = ["date", "age"];
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

function buildSortObject(
  sortOptions: SortOptions | null
): Record<string, 1 | -1> {
  if (!sortOptions) {
    return { createdAt: -1 };
  }

  const fieldMap: Record<SortField, string> = {
    date: "createdAt",
    age: "age",
  };

  const mongoField = fieldMap[sortOptions.field];
  const mongoDirection = sortOptions.direction === "asc" ? 1 : -1;

  return {
    [mongoField]: mongoDirection,
  };
}

interface PaginatedResponse {
  data: SerializedPetForFree[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

class PetForFreeRepository {
  async getAll(
    searchFilters: PetForFreeSearchFilters = {},
    currentPage: number = 1,
    pageSize: number = 10,
    sort?: string
  ): Promise<PaginatedResponse> {
    try {
      await connectDB();

      const sanitizedFilters: PetForFreeSearchFilters = {
        animal: sanitize(searchFilters.animal),
        kind: sanitize(searchFilters.kind),
        district: sanitize(searchFilters.district),
        city: sanitize(searchFilters.city),
        textSearch: sanitize(searchFilters.textSearch),
        adjustments: sanitize(searchFilters.adjustments),
      };

      const searchFilter: FilterQuery<typeof PetForFree> = {};

      if (sanitizedFilters.animal) {
        searchFilter.animal = { $in: sanitizedFilters.animal };
      }

      if (sanitizedFilters.kind) {
        searchFilter.kind = { $in: sanitizedFilters.kind };
      }

      if (sanitizedFilters.district) {
        searchFilter.district = { $in: sanitizedFilters.district };
      }

      if (sanitizedFilters.city) {
        searchFilter.city = { $in: sanitizedFilters.city };
      }

      if (sanitizedFilters.adjustments) {
        const adjustmentNumbers = sanitizedFilters.adjustments
          .map((adj) => Number(adj))
          .filter((num) => !Number.isNaN(num) && num >= 1 && num <= 9);

        if (adjustmentNumbers.length > 0) {
          searchFilter.adjustments = { $in: adjustmentNumbers };
        }
      }

      if (sanitizedFilters.textSearch?.trim()) {
        const searchTerm = sanitizedFilters.textSearch.trim();
        searchFilter.$or = [
          { description: { $regex: searchTerm, $options: "i" } },
        ];
      }

      const skip = (currentPage - 1) * pageSize;

      const totalCount = await PetForFree.countDocuments(searchFilter);
      const totalPages = Math.ceil(totalCount / pageSize);

      const sortOptions = parseSortString(sort);
      const sortObject = buildSortObject(sortOptions);

      const pets = await PetForFree.find(searchFilter)
        .populate("user")
        .sort(sortObject)
        .skip(skip)
        .limit(pageSize);

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
      console.error("Error fetching pets for free:", error);
      throw new Error("Failed to fetch pets for free");
    }
  }

  async getByPublicId(
    publicId: string
  ): Promise<SerializedPetForFree | null> {
    try {
      await connectDB();

      const pet = await PetForFree.findOne({ publicId }).populate("user");

      if (!pet) {
        return null;
      }

      return JSON.parse(JSON.stringify(pet));
    } catch (error) {
      console.error("Error fetching pet for free:", error);
      throw new Error("Failed to fetch pet for free");
    }
  }

  async getById(id: string): Promise<SerializedPetForFree | null> {
    try {
      await connectDB();

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return null;
      }

      const pet = await PetForFree.findById(id).populate("user");

      if (!pet) {
        return null;
      }

      return JSON.parse(JSON.stringify(pet));
    } catch (error) {
      console.error("Error fetching pet for free:", error);
      throw new Error("Failed to fetch pet for free");
    }
  }

  async create(
    petData: Omit<IPetForFree, "id" | "createdAt" | "updatedAt">
  ): Promise<SerializedPetForFree> {
    try {
      await connectDB();

      const pet = new PetForFree(petData);
      await pet.save();
      await pet.populate("user");

      return JSON.parse(JSON.stringify(pet));
    } catch (error) {
      console.error("Error creating pet for free:", error);
      throw new Error("Failed to create pet for free");
    }
  }

  async edit(
    publicId: string,
    updateData: Partial<IPetForFree>
  ): Promise<SerializedPetForFree | null> {
    try {
      await connectDB();

      const pet = await PetForFree.findOneAndUpdate(
        { publicId },
        { ...updateData },
        { new: true, runValidators: true }
      ).populate("user");

      if (!pet) {
        return null;
      }

      await pet.save();

      return JSON.parse(JSON.stringify(pet));
    } catch (error) {
      console.error("Error updating pet for free:", error);
      throw new Error("Failed to update pet for free");
    }
  }

  async delete(publicId: string): Promise<boolean> {
    try {
      await connectDB();

      const result = await PetForFree.findOneAndDelete({ publicId });

      return result !== null;
    } catch (error) {
      console.error("Error deleting pet for free:", error);
      throw new Error("Failed to delete pet for free");
    }
  }
}

export const petForFreeRepository = new PetForFreeRepository();
