import { Car, ICar } from "../models/Car";
import connectDB from "@/lib/mongo/mongodb";
import { SerializedCar } from "../types/cars.types";
import { FilterQuery } from "mongoose";
import mongoose from "mongoose";
import sanitize from "mongo-sanitize";

export interface CarSearchFilters {
  manufacturer?: string[];
  model?: string[];
  yearFrom?: string;
  yearTo?: string;
  numberOfHand?: string[];
  transmission?: string[];
  engineType?: string[];
  district?: string[];
  city?: string[];
  priceFrom?: number;
  priceTo?: number;
  color?: string;
}

export type SortField = 'date' | 'year' | 'price' | 'mileage';
export type SortDirection = 'asc' | 'desc';
export interface SortOptions {
  field: SortField;
  direction: SortDirection;
}

/**
 * Parse sort string (e.g., "date_desc") into SortOptions object
 * Returns null for invalid values (will use default sort)
 */
function parseSortString(sort?: string): SortOptions | null {
  if (!sort || typeof sort !== 'string') {
    return null;
  }

  const parts = sort.split('_');
  if (parts.length !== 2) {
    return null;
  }

  const [field, direction] = parts;
  
  const validFields: SortField[] = ['date', 'year', 'price', 'mileage'];
  const validDirections: SortDirection[] = ['asc', 'desc'];

  if (!validFields.includes(field as SortField) || !validDirections.includes(direction as SortDirection)) {
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
    date: 'createdAt',
    year: 'yearOfManufacture',
    price: 'price',
    mileage: 'mileage',
  };

  const mongoField = fieldMap[sortOptions.field];
  const dir = sortOptions.direction === 'asc' ? 1 : -1;

  return {
    [mongoField]: dir,
    _id: dir,
  };
}

interface PaginatedResponse {
  data: SerializedCar[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

class CarRepository {
  /**
   * Get all cars with search and pagination
   * @param searchFilters - Object containing search criteria
   * @param currentPage - Current page number (1-based)
   * @param pageSize - Number of items per page (default: 10)
   * @param sort - Sort string (e.g., "date_desc", "price_asc")
   * @returns Promise<PaginatedResponse> - Paginated response with data and metadata
   */
  async getAll(
    searchFilters: CarSearchFilters = {},
    currentPage: number = 1,
    pageSize: number = 10,
    sort?: string
  ): Promise<PaginatedResponse> {
    try {
      await connectDB();

      // Sanitize all incoming filters to prevent NoSQL injection
      const sanitizedFilters: CarSearchFilters = {
        manufacturer: sanitize(searchFilters.manufacturer),
        model: sanitize(searchFilters.model),
        yearFrom: sanitize(searchFilters.yearFrom),
        yearTo: sanitize(searchFilters.yearTo),
        numberOfHand: sanitize(searchFilters.numberOfHand),
        transmission: sanitize(searchFilters.transmission),
        engineType: sanitize(searchFilters.engineType),
        district: sanitize(searchFilters.district),
        city: sanitize(searchFilters.city),
        priceFrom: sanitize(searchFilters.priceFrom),
        priceTo: sanitize(searchFilters.priceTo),
        color: sanitize(searchFilters.color),
      };

      // Build search filter using MongoDB query
      const searchFilter: FilterQuery<typeof Car> = {};

      // Add manufacturer filter
      if (sanitizedFilters.manufacturer) {
        searchFilter.manufacturer = { $in: sanitizedFilters.manufacturer };
      }

      // Add model filter
      if (sanitizedFilters.model) {
        searchFilter.model = { $in: sanitizedFilters.model };
      }

      // Add year range filters
      // Handle yearFrom (minimum year)
      if (sanitizedFilters.yearFrom) {
        const yearFromNum = Number(sanitizedFilters.yearFrom);
        if (!Number.isNaN(yearFromNum)) {
          searchFilter.yearOfManufacture = { $gte: yearFromNum };
        }
      }

      // Handle yearTo (maximum year)
      if (sanitizedFilters.yearTo) {
        const yearToNum = Number(sanitizedFilters.yearTo);
        if (!Number.isNaN(yearToNum)) {
          // Combine with existing yearOfManufacture filter if exists
          if (searchFilter.yearOfManufacture) {
            searchFilter.yearOfManufacture = {
              ...searchFilter.yearOfManufacture,
              $lte: yearToNum,
            };
          } else {
            searchFilter.yearOfManufacture = { $lte: yearToNum };
          }
        }
      }

      // Add numberOfHand filter
      if (sanitizedFilters.numberOfHand) {
        const numberOfHandNums = sanitizedFilters.numberOfHand
          .map((hand) => Number(hand))
          .filter((num) => !Number.isNaN(num) && num >= 1);
        if (numberOfHandNums.length > 0) {
          searchFilter.numberOfHand = { $in: numberOfHandNums };
        }
      }

      // Add transmission filter
      if (sanitizedFilters.transmission) {
        searchFilter.transmission = { $in: sanitizedFilters.transmission };
      }

      // Add engineType filter
      if (sanitizedFilters.engineType) {
        searchFilter.engineType = { $in: sanitizedFilters.engineType };
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
      // Handle priceFrom (minimum price)
      if (sanitizedFilters.priceFrom !== undefined && sanitizedFilters.priceFrom !== null) {
        const priceFromNum = Number(sanitizedFilters.priceFrom);
        if (!Number.isNaN(priceFromNum) && priceFromNum >= 0) {
          searchFilter.price = { $gte: priceFromNum };
        }
      }

      // Handle priceTo (maximum price)
      if (sanitizedFilters.priceTo !== undefined && sanitizedFilters.priceTo !== null) {
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

      // Add color filter (text search with regex)
      if (sanitizedFilters.color?.trim()) {
        searchFilter.color = {
          $regex: sanitizedFilters.color.trim(),
          $options: "i", // Case-insensitive
        };
      }

      // Calculate pagination
      const skip = (currentPage - 1) * pageSize;

      // Get total count for pagination
      const totalCount = await Car.countDocuments(searchFilter);
      const totalPages = Math.ceil(totalCount / pageSize);

      // Parse and build sort object
      const sortOptions = parseSortString(sort);
      const sortObject = buildSortObject(sortOptions);

      // Fetch paginated results
      const cars = await Car.find(searchFilter)
        .populate("user")
        .sort(sortObject)
        .skip(skip)
        .limit(pageSize);

      // Serialize to remove MongoDB ObjectIds and other non-serializable types
      const serializedCars = JSON.parse(JSON.stringify(cars));

      return {
        data: serializedCars,
        totalCount,
        currentPage,
        totalPages,
        hasNextPage: currentPage < totalPages,
        hasPreviousPage: currentPage > 1,
      };
    } catch (error) {
      console.error("Error fetching cars:", error);
      throw new Error("Failed to fetch cars");
    }
  }

  /**
   * Get a car by publicId
   * @param publicId - The public ID of the car
   * @returns Promise<SerializedCar | null> - The car or null if not found
   */
  async getByPublicId(publicId: string): Promise<SerializedCar | null> {
    try {
      await connectDB();

      const car = await Car.findOne({
        publicId,
      }).populate("user");

      if (!car) {
        return null;
      }

      // Serialize to remove MongoDB ObjectIds and other non-serializable types
      const serializedCar = JSON.parse(JSON.stringify(car));

      return serializedCar;
    } catch (error) {
      console.error("Error fetching car:", error);
      throw new Error("Failed to fetch car");
    }
  }

  /**
   * Get a car by MongoDB _id
   * @param id - The MongoDB _id of the car
   * @returns Promise<SerializedCar | null> - The car or null if not found
   */
  async getById(id: string): Promise<SerializedCar | null> {
    try {
      await connectDB();

      // Validate ObjectId format
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return null;
      }

      const car = await Car.findById(id).populate("user");

      if (!car) {
        return null;
      }

      // Serialize to remove MongoDB ObjectIds and other non-serializable types
      const serializedCar = JSON.parse(JSON.stringify(car));

      return serializedCar;
    } catch (error) {
      console.error("Error fetching car:", error);
      throw new Error("Failed to fetch car");
    }
  }

  /**
   * Create a new car
   * @param carData - Car data to create
   * @returns Promise<SerializedCar> - The created car
   */
  async create(carData: Omit<ICar, "id" | "createdAt" | "updatedAt">): Promise<SerializedCar> {
    try {
      await connectDB();

      const car = new Car(carData);
      await car.save();
      await car.populate("user");

      // Serialize to remove MongoDB ObjectIds and other non-serializable types
      const serializedCar = JSON.parse(JSON.stringify(car));

      return serializedCar;
    } catch (error) {
      console.error("Error creating car:", error);
      throw new Error("Failed to create car");
    }
  }

  /**
   * Update a car by publicId
   * @param publicId - The public ID of the car to update
   * @param updateData - Partial car data to update
   * @returns Promise<SerializedCar | null> - The updated car or null if not found
   */
  async edit(
    publicId: string,
    updateData: Partial<ICar>
  ): Promise<SerializedCar | null> {
    try {
      await connectDB();

      const car = await Car.findOneAndUpdate(
        { publicId },
        { ...updateData },
        { new: true, runValidators: true }
      ).populate("user");

      if (!car) {
        return null;
      }

      await car.save();

      // Serialize to remove MongoDB ObjectIds and other non-serializable types
      const serializedCar = JSON.parse(JSON.stringify(car));

      return serializedCar;
    } catch (error) {
      console.error("Error updating car:", error);
      throw new Error("Failed to update car");
    }
  }

  /**
   * Delete a car by publicId
   * @param publicId - The public ID of the car to delete
   * @returns Promise<boolean> - True if deleted, false if not found
   */
  async delete(publicId: string): Promise<boolean> {
    try {
      await connectDB();

      const result = await Car.findOneAndDelete({
        publicId,
      });

      return result !== null;
    } catch (error) {
      console.error("Error deleting car:", error);
      throw new Error("Failed to delete car");
    }
  }
}

export const carRepository = new CarRepository();

