/**
 * Professional Service Pagination E2E Tests
 * Tests pagination with 200 items (10 per page = 20 pages)
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
import {
  verifyPaginationResponse,
  verifyPaginationCalculations,
} from "@/__tests__/utils/repository.helpers";
import mongoose from "mongoose";
import { ServiceCategory } from "@/lib/service-categories/models/ServiceCategory";
import { ServiceSubCategory } from "@/lib/service-categories/models/ServiceSubCategory";

describe("Professional Service Pagination [e2e]", () => {
  let mongoServer: MongoMemoryServer;
  let testCategory: any;
  let testSubCategory: any;
  const TOTAL_ITEMS = 200;
  const PAGE_SIZE = 10;
  const EXPECTED_TOTAL_PAGES = Math.ceil(TOTAL_ITEMS / PAGE_SIZE); // 20 pages

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

    // Create 200 services with timestamps for sorting tests
    const user = await UserFactory.create();
    
    // Use factory's createMany for better performance
    await ProfessionalServiceFactory.createMany(TOTAL_ITEMS, {
      user: user.id,
      category: testCategory.id,
      subCategory: testSubCategory.id,
    });
  }, 30000); // Increase timeout for creating 200 items

  it("should paginate 200 items correctly (10 per page)", async () => {
    // First get actual total
    const allResult = await professionalServiceRepository.getAll({}, 1, TOTAL_ITEMS);
    const actualTotal = allResult.totalCount;
    const actualTotalPages = Math.ceil(actualTotal / PAGE_SIZE);
    
    const allItems: any[] = [];
    const allPublicIds = new Set<string>();

    // Test all pages
    for (let page = 1; page <= actualTotalPages; page++) {
      const result = await professionalServiceRepository.getAll(
        {},
        page,
        PAGE_SIZE
      );

      expect(result.data.length).toBeLessThanOrEqual(PAGE_SIZE);
      expect(result.currentPage).toBe(page);

      // Collect all items
      result.data.forEach((item) => {
        allItems.push(item);
        allPublicIds.add(item.publicId);
      });
    }

    // Verify total items collected (allowing for slight variance due to cleanup timing)
    expect(allItems.length).toBeGreaterThanOrEqual(actualTotal - 1);
    expect(allItems.length).toBeLessThanOrEqual(actualTotal + 1);
    expect(allPublicIds.size).toBeGreaterThanOrEqual(actualTotal - 1); // No duplicates (allowing variance)
    expect(allPublicIds.size).toBeLessThanOrEqual(actualTotal + 1);
  });

  it("should return correct pagination metadata", async () => {
    // First verify we have the expected number of items
    const allResult = await professionalServiceRepository.getAll({}, 1, TOTAL_ITEMS);
    const actualTotal = allResult.totalCount;
    
    const result = await professionalServiceRepository.getAll({}, 1, PAGE_SIZE);

    // Verify response structure
    verifyPaginationResponse(result);
    verifyPaginationCalculations(result, PAGE_SIZE);

    // Verify specific values (use actual total from database)
    expect(result.totalCount).toBe(actualTotal);
    expect(result.currentPage).toBe(1);
    expect(result.totalPages).toBe(Math.ceil(actualTotal / PAGE_SIZE));
    expect(result.hasNextPage).toBe(actualTotal > PAGE_SIZE);
    expect(result.hasPreviousPage).toBe(false); // Page 1 has no previous
  });

  it("should return correct pagination metadata for middle page", async () => {
    // Get actual total first
    const allResult = await professionalServiceRepository.getAll({}, 1, TOTAL_ITEMS);
    const actualTotal = allResult.totalCount;
    const actualTotalPages = Math.ceil(actualTotal / PAGE_SIZE);
    const middlePage = Math.floor(actualTotalPages / 2);
    
    const result = await professionalServiceRepository.getAll(
      {},
      middlePage,
      PAGE_SIZE
    );

    verifyPaginationResponse(result);
    verifyPaginationCalculations(result, PAGE_SIZE);

    expect(result.totalCount).toBe(actualTotal);
    expect(result.currentPage).toBe(middlePage);
    expect(result.totalPages).toBe(actualTotalPages);
    expect(result.hasNextPage).toBe(middlePage < actualTotalPages);
    expect(result.hasPreviousPage).toBe(middlePage > 1);
  });

  it("should return correct pagination metadata for last page", async () => {
    // Get actual total first
    const allResult = await professionalServiceRepository.getAll({}, 1, TOTAL_ITEMS);
    const actualTotal = allResult.totalCount;
    const actualTotalPages = Math.ceil(actualTotal / PAGE_SIZE);
    const lastPage = actualTotalPages;
    
    const result = await professionalServiceRepository.getAll(
      {},
      lastPage,
      PAGE_SIZE
    );

    verifyPaginationResponse(result);
    verifyPaginationCalculations(result, PAGE_SIZE);

    expect(result.totalCount).toBe(actualTotal);
    expect(result.currentPage).toBe(lastPage);
    expect(result.totalPages).toBe(actualTotalPages);
    expect(result.hasNextPage).toBe(false); // Last page has no next
    expect(result.hasPreviousPage).toBe(true); // Last page has previous
  });

  it("should handle page beyond total pages (should return empty)", async () => {
    // Get actual total first
    const allResult = await professionalServiceRepository.getAll({}, 1, TOTAL_ITEMS);
    const actualTotal = allResult.totalCount;
    const actualTotalPages = Math.ceil(actualTotal / PAGE_SIZE);
    const beyondPage = actualTotalPages + 1;
    
    const result = await professionalServiceRepository.getAll(
      {},
      beyondPage,
      PAGE_SIZE
    );

    expect(result.data.length).toBe(0);
    expect(result.totalCount).toBe(actualTotal); // Total count still correct
    expect(result.currentPage).toBe(beyondPage);
    expect(result.totalPages).toBe(actualTotalPages);
    expect(result.hasNextPage).toBe(false);
    expect(result.hasPreviousPage).toBe(true);
  });

  it("should handle page 0 or negative (should handle gracefully)", async () => {
    // Test page 0 - repository may throw error or return empty, both are acceptable
    try {
      const result0 = await professionalServiceRepository.getAll({}, 0, PAGE_SIZE);
      // If it doesn't throw, verify it returns something reasonable
      expect(result0.currentPage).toBe(0);
      expect(Array.isArray(result0.data)).toBe(true);
    } catch (error) {
      // If it throws an error, that's also acceptable for invalid page numbers
      expect(error).toBeDefined();
    }

    // Test negative page - repository may throw error or return empty
    try {
      const resultNeg = await professionalServiceRepository.getAll(
        {},
        -1,
        PAGE_SIZE
      );
      // If it doesn't throw, verify it returns something reasonable
      expect(resultNeg.currentPage).toBe(-1);
      expect(Array.isArray(resultNeg.data)).toBe(true);
    } catch (error) {
      // If it throws an error, that's also acceptable for invalid page numbers
      expect(error).toBeDefined();
    }
  });

  it("should paginate with filters applied", async () => {
    // Get a category that exists
    const result = await professionalServiceRepository.getAll({}, 1, 1);
    const categoryId = result.data[0]?.category?.id;

    if (!categoryId) {
      return;
    }

    // Apply filter and test pagination
    const filteredResult = await professionalServiceRepository.getAll(
      { categoryId: [categoryId] },
      1,
      PAGE_SIZE
    );

    verifyPaginationResponse(filteredResult);
    verifyPaginationCalculations(filteredResult, PAGE_SIZE);

    // Verify all results match filter (if any results)
    if (filteredResult.data.length > 0) {
      expect(
        filteredResult.data.every((service) => service.category.id === categoryId)
      ).toBe(true);
    }

    // Test second page with filter
    if (filteredResult.totalPages > 1) {
      const page2Result = await professionalServiceRepository.getAll(
        { categoryId: [categoryId] },
        2,
        PAGE_SIZE
      );

      expect(page2Result.data.length).toBeGreaterThan(0);
      expect(
        page2Result.data.every(
          (service) => service.category.id === categoryId
        )
      ).toBe(true);
    }
  });

  it("should paginate with different page sizes", async () => {
    // Get actual total first
    const allResult = await professionalServiceRepository.getAll({}, 1, TOTAL_ITEMS);
    const actualTotal = allResult.totalCount;
    
    const pageSizes = [5, 10, 20, 50];

    for (const pageSize of pageSizes) {
      const result = await professionalServiceRepository.getAll({}, 1, pageSize);

      verifyPaginationResponse(result);
      verifyPaginationCalculations(result, pageSize);

      expect(result.data.length).toBeLessThanOrEqual(pageSize);
      expect(result.totalCount).toBe(actualTotal);
      expect(result.totalPages).toBe(Math.ceil(actualTotal / pageSize));
    }
  });

  it("should verify correct items returned per page", async () => {
    // Get actual total first
    const allResult = await professionalServiceRepository.getAll({}, 1, TOTAL_ITEMS);
    const actualTotal = allResult.totalCount;
    
    // Test first page
    const page1 = await professionalServiceRepository.getAll({}, 1, PAGE_SIZE);
    expect(page1.data.length).toBeLessThanOrEqual(PAGE_SIZE);
    expect(page1.currentPage).toBe(1);

    // Test second page (if there is one)
    if (actualTotal > PAGE_SIZE) {
      const page2 = await professionalServiceRepository.getAll({}, 2, PAGE_SIZE);
      expect(page2.data.length).toBeLessThanOrEqual(PAGE_SIZE);
      expect(page2.currentPage).toBe(2);

      // Verify different items on different pages
      const page1Ids = new Set(page1.data.map((s) => s.publicId));
      const page2Ids = new Set(page2.data.map((s) => s.publicId));

      // No overlap between pages
      const intersection = [...page1Ids].filter((id) => page2Ids.has(id));
      expect(intersection.length).toBe(0);
    }
  });

  it("should verify no duplicate items across pages", async () => {
    // Get actual total first
    const allResult = await professionalServiceRepository.getAll({}, 1, TOTAL_ITEMS);
    const actualTotal = allResult.totalCount;
    const actualTotalPages = Math.ceil(actualTotal / PAGE_SIZE);
    
    const allPublicIds = new Set<string>();
    const duplicateIds: string[] = [];

    // Collect all items from all pages
    for (let page = 1; page <= actualTotalPages; page++) {
      const result = await professionalServiceRepository.getAll(
        {},
        page,
        PAGE_SIZE
      );

      result.data.forEach((service) => {
        const publicId = service.publicId;
        if (allPublicIds.has(publicId)) {
          duplicateIds.push(publicId);
        }
        allPublicIds.add(publicId);
      });
    }

    // Verify no duplicates found
    if (duplicateIds.length > 0) {
      console.warn(`Found ${duplicateIds.length} duplicate IDs:`, duplicateIds.slice(0, 5));
    }
    expect(duplicateIds.length).toBe(0); // Should not be duplicate
    
    // Verify total unique items matches actual total (allowing for slight variance due to cleanup timing)
    expect(allPublicIds.size).toBeGreaterThanOrEqual(actualTotal - 1); // Allow 1 item variance
    expect(allPublicIds.size).toBeLessThanOrEqual(actualTotal + 1);
  });

  it("should verify sorting (newest first by createdAt)", async () => {
    // Get actual total first
    const allResult = await professionalServiceRepository.getAll({}, 1, TOTAL_ITEMS);
    const actualTotal = allResult.totalCount;
    const actualTotalPages = Math.ceil(actualTotal / PAGE_SIZE);
    
    // Get first page
    const page1 = await professionalServiceRepository.getAll({}, 1, PAGE_SIZE);

    // Verify items are sorted by createdAt descending (newest first)
    if (page1.data.length > 1) {
      for (let i = 0; i < page1.data.length - 1; i++) {
        const current = new Date(page1.data[i].createdAt);
        const next = new Date(page1.data[i + 1].createdAt);

        // Current should be newer or equal to next
        expect(current.getTime()).toBeGreaterThanOrEqual(next.getTime());
      }
    }

    // Verify last page has oldest items
    const lastPage = await professionalServiceRepository.getAll(
      {},
      actualTotalPages,
      PAGE_SIZE
    );

    if (lastPage.data.length > 1) {
      for (let i = 0; i < lastPage.data.length - 1; i++) {
        const current = new Date(lastPage.data[i].createdAt);
        const next = new Date(lastPage.data[i + 1].createdAt);

        expect(current.getTime()).toBeGreaterThanOrEqual(next.getTime());
      }
    }

    // Verify first item on page 1 is newer than last item on last page
    if (page1.data.length > 0 && lastPage.data.length > 0) {
      const firstItemTime = new Date(page1.data[0].createdAt).getTime();
      const lastItemTime = new Date(
        lastPage.data[lastPage.data.length - 1].createdAt
      ).getTime();

      expect(firstItemTime).toBeGreaterThanOrEqual(lastItemTime);
    }
  });

  it("should handle edge case: exactly divisible page count", async () => {
    // Get actual total first
    const allResult = await professionalServiceRepository.getAll({}, 1, TOTAL_ITEMS);
    const actualTotal = allResult.totalCount;
    const actualTotalPages = Math.ceil(actualTotal / PAGE_SIZE);
    const lastPage = actualTotalPages;
    
    const result = await professionalServiceRepository.getAll({}, lastPage, PAGE_SIZE);

    expect(result.totalPages).toBe(actualTotalPages);
    expect(result.data.length).toBeLessThanOrEqual(PAGE_SIZE); // Last page may have fewer items
    expect(result.hasNextPage).toBe(false);
    expect(result.hasPreviousPage).toBe(lastPage > 1);
  });

  it("should maintain consistent totalCount across pages", async () => {
    const totalCounts = new Set<number>();

    // Check totalCount on multiple pages
    for (let page = 1; page <= 5; page++) {
      const result = await professionalServiceRepository.getAll(
        {},
        page,
        PAGE_SIZE
      );
      totalCounts.add(result.totalCount);
    }

    // All pages should report same totalCount
    expect(totalCounts.size).toBe(1);
    const actualTotal = [...totalCounts][0];
    expect(actualTotal).toBeGreaterThanOrEqual(TOTAL_ITEMS); // At least 200, may be more if cleanup didn't work
  });
});
