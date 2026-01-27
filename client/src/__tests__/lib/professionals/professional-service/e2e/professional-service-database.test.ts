/**
 * Professional Service Database Operations E2E Tests
 * Tests database operations with 200 unique items
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

describe("Professional Service Database Operations [e2e]", () => {
  let mongoServer: MongoMemoryServer;
  let testCategory: any;
  let testSubCategory: any;

  beforeAll(async () => {
    const result = await setupMongoMemoryServer();
    mongoServer = result.mongoServer;

    // Create test category and subcategory
    testCategory = await ServiceCategory.create({
      key: "ConstructionRepair",
      displayName: "Test Category",
      description: "Test description",
      russianDisplayName: "Тестовая категория",
      russianDescription: "Тестовое описание",
      navItem: {
        label: "Test",
        href: "/professional-service",
        id: new mongoose.Types.ObjectId().toString(),
      },
    });

    testSubCategory = await ServiceSubCategory.create({
      key: `ConstructionRepair-Sub-${Date.now()}`,
      displayName: "Test SubCategory",
      description: "Test description",
      russianDisplayName: "Тестовая подкатегория",
      russianDescription: "Тестовое описание",
      serviceCategory: testCategory._id,
      serviceCategoryKey: testCategory.key,
    });
  });

  afterAll(async () => {
    await teardownMongoMemoryServer(mongoServer);
  });

  beforeEach(async () => {
    await clearDatabase();

    // Recreate category and subcategory after clear
    testCategory = await ServiceCategory.create({
      key: "ConstructionRepair",
      displayName: "Test Category",
      description: "Test description",
      russianDisplayName: "Тестовая категория",
      russianDescription: "Тестовое описание",
      navItem: {
        label: "Test",
        href: "/professional-service",
        id: new mongoose.Types.ObjectId().toString(),
      },
    });

    testSubCategory = await ServiceSubCategory.create({
      key: `ConstructionRepair-Sub-${Date.now()}`,
      displayName: "Test SubCategory",
      description: "Test description",
      russianDisplayName: "Тестовая подкатегория",
      russianDescription: "Тестовое описание",
      serviceCategory: testCategory._id,
      serviceCategoryKey: testCategory.key,
    });
  }, 30000); // Increase timeout for setup

  it("should create 200 unique professional services", async () => {
    const user = await UserFactory.create();

    // Create 200 services
    const startTime = Date.now();
    const services = await ProfessionalServiceFactory.createMany(200, {
      user: user.id,
      category: testCategory.id,
      subCategory: testSubCategory.id,
    });
    const endTime = Date.now();

    // Verify all created
    expect(services.length).toBe(200);

    // Verify uniqueness - check publicIds
    const publicIds = services.map((s) => s.publicId);
    const uniquePublicIds = new Set(publicIds);
    expect(uniquePublicIds.size).toBe(200);

    // Verify uniqueness - check users (all should be same user in this test)
    const userIds = services.map((s) => s.user.id || s.user);
    const uniqueUserIds = new Set(userIds);
    expect(uniqueUserIds.size).toBe(1); // All belong to same user

    // Verify all have required fields
    services.forEach((service) => {
      expect(service.publicId).toBeDefined();
      expect(service.category).toBeDefined();
      expect(service.subCategory).toBeDefined();
      expect(service.district).toBeDefined();
      expect(service.city).toBeDefined();
      expect(service.description).toBeDefined();
      expect(service.email).toBeDefined();
      expect(service.phoneNumber).toBeDefined();
      expect(service.images).toBeDefined();
      expect(Array.isArray(service.images)).toBe(true);
      expect(service.images.length).toBeGreaterThan(0);
    });

    // Verify in database
    const result = await professionalServiceRepository.getAll({}, 1, 200);
    expect(result.totalCount).toBe(200);
    expect(result.data.length).toBe(200);

    // Log performance
    const duration = endTime - startTime;
    console.log(`Created 200 services in ${duration}ms (${duration / 200}ms per service)`);
  });

  it("should handle batch creation efficiently", async () => {
    const user = await UserFactory.create();

    // Measure batch creation time
    const startTime = Date.now();
    const services = await ProfessionalServiceFactory.createMany(200, {
      user: user.id,
      category: testCategory.id,
      subCategory: testSubCategory.id,
    });
    const endTime = Date.now();

    const duration = endTime - startTime;
    const avgTimePerService = duration / 200;

    // Verify all created
    expect(services.length).toBe(200);

    // Performance assertion: Should complete in reasonable time
    // (Adjust threshold based on your performance requirements)
    expect(duration).toBeLessThan(30000); // 30 seconds for 200 items
    expect(avgTimePerService).toBeLessThan(150); // 150ms per service average

    console.log(`Batch creation: ${duration}ms total, ${avgTimePerService.toFixed(2)}ms per service`);
  });

  it("should create diverse test data", async () => {
    const user = await UserFactory.create();
    const allDistricts = Object.values(Districts).filter(
      (d) => d !== Districts.All
    );

    // Create services with different categories, districts, cities
    const services = [];
    for (let i = 0; i < 200; i++) {
      const district = allDistricts[i % allDistricts.length];
      const city = `City-${i % 10}`; // 10 different cities

      const service = await ProfessionalServiceFactory.create({
        user: user.id,
        category: testCategory.id,
        subCategory: testSubCategory.id,
        district,
        city,
      });
      services.push(service);
    }

    // Verify data distribution
    const districtCounts: Record<string, number> = {};
    const cityCounts: Record<string, number> = {};

    services.forEach((service) => {
      districtCounts[service.district] = (districtCounts[service.district] || 0) + 1;
      cityCounts[service.city] = (cityCounts[service.city] || 0) + 1;
    });

    // Verify all districts are represented
    allDistricts.forEach((district) => {
      expect(districtCounts[district]).toBeGreaterThan(0);
    });

    // Verify multiple cities are represented
    const uniqueCities = Object.keys(cityCounts);
    expect(uniqueCities.length).toBeGreaterThan(1);

    // Verify all services have category and subCategory
    services.forEach((service) => {
      expect(service.category).toBeDefined();
      expect(service.subCategory).toBeDefined();
    });

    console.log("District distribution:", districtCounts);
    console.log("City distribution (sample):", Object.fromEntries(
      Object.entries(cityCounts).slice(0, 5)
    ));
  });

  it("should test database query performance with 200 items", async () => {
    const user = await UserFactory.create();

    // Create 200 services
    await ProfessionalServiceFactory.createMany(200, {
      user: user.id,
      category: testCategory.id,
      subCategory: testSubCategory.id,
    });

    // Test query performance
    const startTime = Date.now();
    const result = await professionalServiceRepository.getAll({}, 1, 10);
    const endTime = Date.now();

    const queryDuration = endTime - startTime;

    // Verify results
    expect(result.data.length).toBe(10);
    expect(result.totalCount).toBe(200);
    expect(result.totalPages).toBe(20);

    // Performance assertion: Query should be fast
    expect(queryDuration).toBeLessThan(1000); // 1 second for query

    console.log(`Query with 200 items: ${queryDuration}ms`);
  });

  it("should maintain data integrity with 200 items", async () => {
    const user = await UserFactory.create();

    // Create 200 services
    const services = await ProfessionalServiceFactory.createMany(200, {
      user: user.id,
      category: testCategory.id,
      subCategory: testSubCategory.id,
    });

    // Verify all services are retrievable
    for (const service of services.slice(0, 10)) {
      // Sample check - verify first 10
      const retrieved = await professionalServiceRepository.getByPublicId(
        service.publicId
      );
      expect(retrieved).toBeDefined();
      expect(retrieved?.publicId).toBe(service.publicId);
      expect(retrieved?.description).toBe(service.description);
      expect(retrieved?.email).toBe(service.email);
    }

    // Verify total count
    const result = await professionalServiceRepository.getAll({}, 1, 200);
    expect(result.totalCount).toBe(200);
  });
});
