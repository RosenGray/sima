/**
 * Example Repository Test
 * Tests repository methods with MongoDB Memory Server
 */
import { describe, it, expect, beforeAll, afterAll, beforeEach } from "vitest";
import {
  setupMongoMemoryServer,
  teardownMongoMemoryServer,
  clearDatabase,
} from "@/__tests__/mocks/mongodb";
import { MongoMemoryServer } from "mongodb-memory-server";
import { carRepository } from "@/lib/vehicles/cars/repository/CarRepository";
import { CarFactory, UserFactory } from "@/__tests__/factories";
import {
  verifyPaginationResponse,
  verifyPaginationCalculations,
} from "@/__tests__/utils/repository.helpers";

describe("CarRepository", () => {
  let mongoServer: MongoMemoryServer;

  beforeAll(async () => {
    const result = await setupMongoMemoryServer();
    mongoServer = result.mongoServer;
  });

  afterAll(async () => {
    await teardownMongoMemoryServer(mongoServer);
  });

  beforeEach(async () => {
    await clearDatabase();
  });

  describe("getAll", () => {
    it("should return paginated cars", async () => {
      // Create test data
      const user = await UserFactory.create();
      await CarFactory.createMany(25, { user: user.id });

      // Test repository method
      const result = await carRepository.getAll({}, 1, 10);

      // Verify response structure
      verifyPaginationResponse(result);
      verifyPaginationCalculations(result, 10);

      // Verify data
      expect(result.data.length).toBe(10);
      expect(result.totalCount).toBe(25);
      expect(result.currentPage).toBe(1);
      expect(result.totalPages).toBe(3);
    });

    it("should filter by manufacturer", async () => {
      const user = await UserFactory.create();
      await CarFactory.create({ user: user.id, manufacturer: "Toyota" });
      await CarFactory.create({ user: user.id, manufacturer: "Honda" });
      await CarFactory.create({ user: user.id, manufacturer: "Toyota" });

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
      const result = await carRepository.getAll({}, 1, 10);

      expect(result.data.length).toBe(0);
      expect(result.totalCount).toBe(0);
      expect(result.totalPages).toBe(0);
    });
  });

  describe("getByPublicId", () => {
    it("should return car by publicId", async () => {
      const user = await UserFactory.create();
      const car = await CarFactory.create({ user: user.id });

      const result = await carRepository.getByPublicId(car.publicId);

      expect(result).toBeDefined();
      expect(result?.publicId).toBe(car.publicId);
      expect(result?.user.id).toBe(user.id);
    });

    it("should return null for non-existent publicId", async () => {
      const result = await carRepository.getByPublicId("non-existent-id");

      expect(result).toBeNull();
    });
  });

  describe("create", () => {
    it("should create a new car", async () => {
      const user = await UserFactory.create();
      const carData = CarFactory.build({ user: user.id });

      await carRepository.create({
        ...carData,
        user: user.id as any,
      });

      const result = await carRepository.getByPublicId(carData.publicId);
      expect(result).toBeDefined();
      expect(result?.manufacturer).toBe(carData.manufacturer);
    });
  });
});
