import { Car, ICar } from "../models/Car";
import connectDB from "@/lib/mongo/mongodb";
import { SerializedCar } from "../types/cars.types";
import { FilterQuery } from "mongoose";
import mongoose from "mongoose";

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
   * Get all cars with pagination
   * @param currentPage - Current page number (1-based)
   * @param pageSize - Number of items per page (default: 10)
   * @returns Promise<PaginatedResponse> - Paginated response with data and metadata
   */
  async getAll(
    currentPage: number = 1,
    pageSize: number = 10
  ): Promise<PaginatedResponse> {
    try {
      await connectDB();

      // Build search filter (empty for now, filters will be added later)
      const searchFilter: FilterQuery<typeof Car> = {};

      // Calculate pagination
      const skip = (currentPage - 1) * pageSize;

      // Get total count for pagination
      const totalCount = await Car.countDocuments(searchFilter);
      const totalPages = Math.ceil(totalCount / pageSize);

      // Fetch paginated results
      const cars = await Car.find(searchFilter)
        .populate("user")
        .sort({ createdAt: -1 }) // Sort by newest first
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

