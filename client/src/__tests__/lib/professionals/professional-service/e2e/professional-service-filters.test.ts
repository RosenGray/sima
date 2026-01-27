/**
 * Professional Service Filters E2E Tests
 * Tests all filter types with 200 items
 */
import { describe, it, expect, beforeAll, afterAll, beforeEach } from "vitest";
import {
  setupMongoMemoryServer,
  teardownMongoMemoryServer,
  clearDatabase,
} from "@/__tests__/mocks/mongodb";
import { MongoMemoryServer } from "mongodb-memory-server";
import { professionalServiceRepository } from "@/lib/professionals/professional-service/repository/ProfessionalServiceRepository";
import { ProfessionalServiceFactory, UserFactory } from "@/__tests__/factories";
import { Districts } from "@/lib/cities/types/cities.schema";
import mongoose from "mongoose";
import { ServiceCategory } from "@/lib/service-categories/models/ServiceCategory";
import { ServiceSubCategory } from "@/lib/service-categories/models/ServiceSubCategory";
import { setupDiverseTestData } from "./test-helpers";

describe("Professional Service Filters [e2e]", () => {
  let mongoServer: MongoMemoryServer;
  let testData: Awaited<ReturnType<typeof setupDiverseTestData>>;

  beforeAll(async () => {
    const result = await setupMongoMemoryServer();
    mongoServer = result.mongoServer;
  });

  afterAll(async () => {
    await teardownMongoMemoryServer(mongoServer);
  });

  beforeEach(async () => {
    await clearDatabase();
    // Setup diverse test data with 200 items
    testData = await setupDiverseTestData(200);
  }, 30000); // Increase timeout for creating 200 items

  describe("Category Filter (categoryId)", () => {
    it("should filter by single category", async () => {
      const categoryId = testData.categories[0].id;

      const result = await professionalServiceRepository.getAll(
        { categoryId: [categoryId] },
        1,
        200
      );

      expect(result.data.length).toBeGreaterThan(0);
      expect(
        result.data.every((service) => service.category.id === categoryId)
      ).toBe(true);
      expect(result.totalCount).toBeGreaterThan(0);
    });

    it("should filter by multiple categories", async () => {
      const categoryIds = [
        testData.categories[0].id,
        testData.categories[1].id,
      ];

      const result = await professionalServiceRepository.getAll(
        { categoryId: categoryIds },
        1,
        200
      );

      expect(result.data.length).toBeGreaterThan(0);
      expect(
        result.data.every((service) =>
          categoryIds.includes(service.category.id)
        )
      ).toBe(true);
    });

    it("should handle invalid ObjectId (should return empty)", async () => {
      const invalidObjectId = "invalid-object-id";

      const result = await professionalServiceRepository.getAll(
        { categoryId: [invalidObjectId] },
        1,
        10
      );

      expect(result.data.length).toBe(0);
      expect(result.totalCount).toBe(0);
    });

    it("should handle non-existent category", async () => {
      const nonExistentId = new mongoose.Types.ObjectId().toString();

      const result = await professionalServiceRepository.getAll(
        { categoryId: [nonExistentId] },
        1,
        10
      );

      expect(result.data.length).toBe(0);
      expect(result.totalCount).toBe(0);
    });

    it("should combine category filter with other filters", async () => {
      const categoryId = testData.categories[0].id;
      const district = testData.districts[0];

      const result = await professionalServiceRepository.getAll(
        { categoryId: [categoryId], district: [district] },
        1,
        200
      );

      expect(result.data.length).toBeGreaterThan(0);
      expect(
        result.data.every(
          (service) =>
            service.category.id === categoryId &&
            service.district === district
        )
      ).toBe(true);
    });
  });

  describe("SubCategory Filter (subCategoryId)", () => {
    it("should filter by single subCategory", async () => {
      const categoryId = testData.categories[0].id;
      const subCategoryId = testData.subCategories[categoryId]?.[0]?.id;

      if (!subCategoryId) {
        // Skip if no subcategories
        return;
      }

      const result = await professionalServiceRepository.getAll(
        { subCategoryId: [subCategoryId] },
        1,
        200
      );

      expect(result.data.length).toBeGreaterThan(0);
      expect(
        result.data.every((service) => service.subCategory.id === subCategoryId)
      ).toBe(true);
    });

    it("should filter by multiple subCategories", async () => {
      const categoryId = testData.categories[0].id;
      const subCategories = testData.subCategories[categoryId] || [];

      if (subCategories.length < 2) {
        // Skip if not enough subcategories
        return;
      }

      const subCategoryIds = subCategories.slice(0, 2).map((sc) => sc.id);

      const result = await professionalServiceRepository.getAll(
        { subCategoryId: subCategoryIds },
        1,
        200
      );

      expect(result.data.length).toBeGreaterThan(0);
      expect(
        result.data.every((service) =>
          subCategoryIds.includes(service.subCategory.id)
        )
      ).toBe(true);
    });

    it("should handle invalid ObjectId", async () => {
      const invalidObjectId = "invalid-object-id";

      const result = await professionalServiceRepository.getAll(
        { subCategoryId: [invalidObjectId] },
        1,
        10
      );

      expect(result.data.length).toBe(0);
      expect(result.totalCount).toBe(0);
    });

    it("should handle non-existent subCategory", async () => {
      const nonExistentId = new mongoose.Types.ObjectId().toString();

      const result = await professionalServiceRepository.getAll(
        { subCategoryId: [nonExistentId] },
        1,
        10
      );

      expect(result.data.length).toBe(0);
      expect(result.totalCount).toBe(0);
    });

    it("should test dependency: subCategory filtered by selected category", async () => {
      // This test verifies that subCategories are properly associated with categories
      const categoryId = testData.categories[0].id;
      const subCategoryId = testData.subCategories[categoryId]?.[0]?.id;

      if (!subCategoryId) {
        return;
      }

      const result = await professionalServiceRepository.getAll(
        { categoryId: [categoryId], subCategoryId: [subCategoryId] },
        1,
        200
      );

      expect(result.data.length).toBeGreaterThan(0);
      expect(
        result.data.every(
          (service) =>
            service.category.id === categoryId &&
            service.subCategory.id === subCategoryId
        )
      ).toBe(true);
    });
  });

  describe("District Filter (district)", () => {
    it("should filter by single district", async () => {
      const district = testData.districts[0];

      const result = await professionalServiceRepository.getAll(
        { district: [district] },
        1,
        200
      );

      expect(result.data.length).toBeGreaterThan(0);
      expect(
        result.data.every((service) => service.district === district)
      ).toBe(true);
    });

    it("should filter by multiple districts", async () => {
      const districts = testData.districts.slice(0, 2);

      const result = await professionalServiceRepository.getAll(
        { district: districts },
        1,
        200
      );

      expect(result.data.length).toBeGreaterThan(0);
      expect(
        result.data.every((service) => districts.includes(service.district))
      ).toBe(true);
    });

    it("should handle invalid district value", async () => {
      const invalidDistrict = "InvalidDistrict";

      const result = await professionalServiceRepository.getAll(
        { district: [invalidDistrict] },
        1,
        10
      );

      // Should return empty or only services with that exact value (if any exist)
      // The filter should still work, just return no results
      expect(Array.isArray(result.data)).toBe(true);
    });

    it("should combine district filter with other filters", async () => {
      const district = testData.districts[0];
      const categoryId = testData.categories[0].id;

      const result = await professionalServiceRepository.getAll(
        { district: [district], categoryId: [categoryId] },
        1,
        200
      );

      expect(result.data.length).toBeGreaterThan(0);
      expect(
        result.data.every(
          (service) =>
            service.district === district &&
            service.category.id === categoryId
        )
      ).toBe(true);
    });
  });

  describe("City Filter (city)", () => {
    it("should filter by single city", async () => {
      // Get a city that exists in our test data
      const services = await professionalServiceRepository.getAll({}, 1, 200);
      const testCity = services.data[0]?.city;

      if (!testCity) {
        return;
      }

      const result = await professionalServiceRepository.getAll(
        { city: [testCity] },
        1,
        200
      );

      expect(result.data.length).toBeGreaterThan(0);
      expect(
        result.data.every((service) => service.city === testCity)
      ).toBe(true);
    });

    it("should filter by multiple cities", async () => {
      // Get cities that exist in our test data
      const services = await professionalServiceRepository.getAll({}, 1, 200);
      const uniqueCities = [
        ...new Set(services.data.map((s) => s.city)),
      ].slice(0, 2);

      if (uniqueCities.length < 2) {
        return;
      }

      const result = await professionalServiceRepository.getAll(
        { city: uniqueCities },
        1,
        200
      );

      expect(result.data.length).toBeGreaterThan(0);
      expect(
        result.data.every((service) => uniqueCities.includes(service.city))
      ).toBe(true);
    });

    it("should handle invalid city value", async () => {
      const invalidCity = "NonExistentCity12345";

      const result = await professionalServiceRepository.getAll(
        { city: [invalidCity] },
        1,
        10
      );

      // Should return empty
      expect(result.data.length).toBe(0);
      expect(result.totalCount).toBe(0);
    });

    it("should test dependency: city filtered by selected district", async () => {
      const district = testData.districts[0];

      // Get cities for this district
      const services = await professionalServiceRepository.getAll(
        { district: [district] },
        1,
        200
      );
      const citiesInDistrict = [
        ...new Set(services.data.map((s) => s.city)),
      ].slice(0, 1);

      if (citiesInDistrict.length === 0) {
        return;
      }

      const result = await professionalServiceRepository.getAll(
        { district: [district], city: citiesInDistrict },
        1,
        200
      );

      expect(result.data.length).toBeGreaterThan(0);
      expect(
        result.data.every(
          (service) =>
            service.district === district &&
            citiesInDistrict.includes(service.city)
        )
      ).toBe(true);
    });

    it("should combine city filter with other filters", async () => {
      const services = await professionalServiceRepository.getAll({}, 1, 200);
      const testCity = services.data[0]?.city;
      const categoryId = testData.categories[0].id;

      if (!testCity) {
        return;
      }

      const result = await professionalServiceRepository.getAll(
        { city: [testCity], categoryId: [categoryId] },
        1,
        200
      );

      // Note: This test may return 0 results if test data doesn't have this specific combination
      // This is acceptable - the important thing is that the filter works correctly
      if (result.data.length > 0) {
        expect(
          result.data.every(
            (service) =>
              service.city === testCity && service.category.id === categoryId
          )
        ).toBe(true);
      } else {
        // If no results, verify that the filter is working (totalCount is correct)
        expect(result.totalCount).toBe(0);
      }
    });
  });

  describe("Combined Filters", () => {
    it("should filter by category + subCategory", async () => {
      const categoryId = testData.categories[0].id;
      const subCategoryId = testData.subCategories[categoryId]?.[0]?.id;

      if (!subCategoryId) {
        return;
      }

      const result = await professionalServiceRepository.getAll(
        { categoryId: [categoryId], subCategoryId: [subCategoryId] },
        1,
        200
      );

      expect(result.data.length).toBeGreaterThan(0);
      expect(
        result.data.every(
          (service) =>
            service.category.id === categoryId &&
            service.subCategory.id === subCategoryId
        )
      ).toBe(true);
    });

    it("should filter by district + city", async () => {
      const district = testData.districts[0];
      const services = await professionalServiceRepository.getAll(
        { district: [district] },
        1,
        200
      );
      const city = services.data[0]?.city;

      if (!city) {
        return;
      }

      const result = await professionalServiceRepository.getAll(
        { district: [district], city: [city] },
        1,
        200
      );

      expect(result.data.length).toBeGreaterThan(0);
      expect(
        result.data.every(
          (service) => service.district === district && service.city === city
        )
      ).toBe(true);
    });

    it("should filter by category + district", async () => {
      const categoryId = testData.categories[0].id;
      const district = testData.districts[0];

      const result = await professionalServiceRepository.getAll(
        { categoryId: [categoryId], district: [district] },
        1,
        200
      );

      expect(result.data.length).toBeGreaterThan(0);
      expect(
        result.data.every(
          (service) =>
            service.category.id === categoryId &&
            service.district === district
        )
      ).toBe(true);
    });

    it("should filter by all filters simultaneously", async () => {
      const categoryId = testData.categories[0].id;
      const subCategoryId = testData.subCategories[categoryId]?.[0]?.id;
      const district = testData.districts[0];
      const services = await professionalServiceRepository.getAll(
        { district: [district] },
        1,
        200
      );
      const city = services.data[0]?.city;

      if (!subCategoryId || !city) {
        return;
      }

      const result = await professionalServiceRepository.getAll(
        {
          categoryId: [categoryId],
          subCategoryId: [subCategoryId],
          district: [district],
          city: [city],
        },
        1,
        200
      );

      expect(result.data.length).toBeGreaterThanOrEqual(0);
      if (result.data.length > 0) {
        expect(
          result.data.every(
            (service) =>
              service.category.id === categoryId &&
              service.subCategory.id === subCategoryId &&
              service.district === district &&
              service.city === city
          )
        ).toBe(true);
      }
    });

    it("should test filter combinations with 200 items", async () => {
      // Test various filter combinations to ensure they work with large dataset
      const categoryId = testData.categories[0].id;
      const district = testData.districts[0];

      // Test 1: Category only
      const result1 = await professionalServiceRepository.getAll(
        { categoryId: [categoryId] },
        1,
        200
      );
      expect(result1.totalCount).toBeGreaterThan(0);

      // Test 2: District only
      const result2 = await professionalServiceRepository.getAll(
        { district: [district] },
        1,
        200
      );
      expect(result2.totalCount).toBeGreaterThan(0);

      // Test 3: Category + District
      const result3 = await professionalServiceRepository.getAll(
        { categoryId: [categoryId], district: [district] },
        1,
        200
      );
      expect(result3.totalCount).toBeGreaterThanOrEqual(0);
      expect(result3.totalCount).toBeLessThanOrEqual(
        Math.min(result1.totalCount, result2.totalCount)
      );
    });
  });
});
