/**
 * Car Repository Unit Tests
 * Tests repository methods with mocked Mongoose methods
 */
import { describe, it, expect, beforeEach, vi } from "vitest";
import { carRepository } from "@/lib/vehicles/cars/repository/CarRepository";
import { Car } from "@/lib/vehicles/cars/models/Car";
import connectDB from "@/lib/mongo/mongodb";
import {
  verifyPaginationResponse,
  verifyPaginationMetadata,
} from "@/__tests__/utils/repository.helpers";
import {
  createMockPaginatedResponse,
  createMockEntityData,
} from "@/__tests__/mocks/repository";
import mongoose from "mongoose";

// Mock dependencies
const mocks = vi.hoisted(() => {
  return {
    mockConnectDB: vi.fn(),
    mockFind: vi.fn(),
    mockCountDocuments: vi.fn(),
    mockFindOne: vi.fn(),
    mockFindOneAndUpdate: vi.fn(),
    mockFindOneAndDelete: vi.fn(),
    mockSave: vi.fn(),
    mockPopulate: vi.fn(),
    mockSort: vi.fn(),
    mockSkip: vi.fn(),
    mockLimit: vi.fn(),
  };
});

vi.mock("@/lib/mongo/mongodb", () => ({
  default: mocks.mockConnectDB,
}));

describe("CarRepository [unit]", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.mockConnectDB.mockResolvedValue(undefined);

    // Setup Mongoose query chain mocks
    const mockQueryChain = {
      populate: vi.fn().mockReturnThis(),
      sort: vi.fn().mockReturnThis(),
      skip: vi.fn().mockReturnThis(),
      limit: vi.fn().mockReturnThis(),
      exec: vi.fn(),
    };

    // Mock Car model static methods
    vi.spyOn(Car, "find").mockReturnValue(mockQueryChain as any);
    vi.spyOn(Car, "countDocuments").mockReturnValue(mockQueryChain as any);
    vi.spyOn(Car, "findOne").mockReturnValue(mockQueryChain as any);
    vi.spyOn(Car, "findOneAndUpdate").mockReturnValue(mockQueryChain as any);
    vi.spyOn(Car, "findOneAndDelete").mockReturnValue(mockQueryChain as any);

    // Mock instance methods
    mocks.mockPopulate.mockResolvedValue(undefined);
    mocks.mockSave.mockResolvedValue(undefined);
  });

  describe("getAll", () => {
    it("should return paginated cars", async () => {
      // Create mock data
      const mockCars = createMockEntityData(
        {
          manufacturer: "Toyota",
          model: "Camry",
          yearOfManufacture: 2020,
          user: { id: new mongoose.Types.ObjectId().toString() },
        },
        25
      );

      const mockResponse = createMockPaginatedResponse(
        mockCars.slice(0, 10),
        25,
        1,
        10
      );

      // Mock Mongoose query chain
      const mockQueryChain = {
        populate: vi.fn().mockReturnThis(),
        sort: vi.fn().mockReturnThis(),
        skip: vi.fn().mockReturnThis(),
        limit: vi.fn().mockResolvedValue(mockCars.slice(0, 10)),
        exec: vi.fn().mockResolvedValue(mockCars.slice(0, 10)),
      };

      vi.spyOn(Car, "find").mockReturnValue(mockQueryChain as any);
      vi.spyOn(Car, "countDocuments").mockResolvedValue(25);

      // Test repository method
      const result = await carRepository.getAll({}, 1, 10);

      // Verify response structure
      verifyPaginationResponse(result);
      verifyPaginationMetadata(result, 10);

      // Verify data
      expect(result.data.length).toBe(10);
      expect(result.totalCount).toBe(25);
      expect(result.currentPage).toBe(1);
      expect(result.totalPages).toBe(3);
    });

    it("should filter by manufacturer", async () => {
      const mockToyotaCars = createMockEntityData(
        {
          manufacturer: "Toyota",
          model: "Camry",
          yearOfManufacture: 2020,
          user: { id: new mongoose.Types.ObjectId().toString() },
        },
        2
      );

      const mockQueryChain = {
        populate: vi.fn().mockReturnThis(),
        sort: vi.fn().mockReturnThis(),
        skip: vi.fn().mockReturnThis(),
        limit: vi.fn().mockResolvedValue(mockToyotaCars),
        exec: vi.fn().mockResolvedValue(mockToyotaCars),
      };

      vi.spyOn(Car, "find").mockReturnValue(mockQueryChain as any);
      vi.spyOn(Car, "countDocuments").mockResolvedValue(2);

      const result = await carRepository.getAll(
        { manufacturer: ["Toyota"] },
        1,
        10
      );

      expect(result.data.length).toBe(2);
      expect(
        result.data.every((car) => car.manufacturer === "Toyota")
      ).toBe(true);
    });

    it("should handle empty results", async () => {
      const mockQueryChain = {
        populate: vi.fn().mockReturnThis(),
        sort: vi.fn().mockReturnThis(),
        skip: vi.fn().mockReturnThis(),
        limit: vi.fn().mockResolvedValue([]),
        exec: vi.fn().mockResolvedValue([]),
      };

      vi.spyOn(Car, "find").mockReturnValue(mockQueryChain as any);
      vi.spyOn(Car, "countDocuments").mockResolvedValue(0);

      const result = await carRepository.getAll({}, 1, 10);

      expect(result.data.length).toBe(0);
      expect(result.totalCount).toBe(0);
      expect(result.totalPages).toBe(0);
    });
  });

  describe("getByPublicId", () => {
    it("should return car by publicId", async () => {
      const mockCar = {
        publicId: "test-public-id",
        manufacturer: "Toyota",
        model: "Camry",
        user: { id: new mongoose.Types.ObjectId().toString() },
        toJSON: () => ({
          publicId: "test-public-id",
          manufacturer: "Toyota",
          model: "Camry",
          user: { id: mockCar.user.id },
        }),
      };

      const mockQueryChain = {
        populate: vi.fn().mockResolvedValue(mockCar),
        exec: vi.fn().mockResolvedValue(mockCar),
      };

      vi.spyOn(Car, "findOne").mockReturnValue(mockQueryChain as any);

      const result = await carRepository.getByPublicId("test-public-id");

      expect(result).toBeDefined();
      expect(result?.publicId).toBe("test-public-id");
      expect(result?.manufacturer).toBe("Toyota");
    });

    it("should return null for non-existent publicId", async () => {
      const mockQueryChain = {
        populate: vi.fn().mockResolvedValue(null),
        exec: vi.fn().mockResolvedValue(null),
      };

      vi.spyOn(Car, "findOne").mockReturnValue(mockQueryChain as any);

      const result = await carRepository.getByPublicId("non-existent-id");

      expect(result).toBeNull();
    });
  });

  describe("create", () => {
    it("should create a new car", async () => {
      const mockCarData = {
        publicId: "test-public-id",
        manufacturer: "Toyota",
        model: "Camry",
        yearOfManufacture: 2020,
        user: new mongoose.Types.ObjectId(),
      };

      const mockCarInstance = {
        ...mockCarData,
        save: mocks.mockSave,
        populate: mocks.mockPopulate,
        toJSON: () => ({
          ...mockCarData,
          user: { id: mockCarData.user.toString() },
        }),
      };

      mocks.mockSave.mockResolvedValue(mockCarInstance);
      mocks.mockPopulate.mockResolvedValue(mockCarInstance);

      // Mock Car constructor
      vi.spyOn(Car.prototype, "constructor" as any).mockImplementation(
        () => mockCarInstance
      );
      vi.spyOn(Car.prototype, "save").mockImplementation(mocks.mockSave);
      vi.spyOn(Car.prototype, "populate").mockImplementation(
        mocks.mockPopulate
      );

      const result = await carRepository.create({
        ...mockCarData,
        user: mockCarData.user as any,
      });

      expect(mocks.mockSave).toHaveBeenCalled();
      expect(mocks.mockPopulate).toHaveBeenCalled();
      expect(result).toBeDefined();
    });
  });
});
