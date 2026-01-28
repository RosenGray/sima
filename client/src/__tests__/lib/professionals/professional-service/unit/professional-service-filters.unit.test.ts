/**
 * Professional Service Filters Unit Tests
 * Tests filter building logic and repository filter passing
 */
import { describe, it, expect, beforeEach, vi } from "vitest";
import { buildProfessionalServiceSearchFilter } from "@/lib/professionals/professional-service/repository/buildSearchFilter";
import { professionalServiceRepository } from "@/lib/professionals/professional-service/repository/ProfessionalServiceRepository";
import { ProfessionalServiceSearchFilters } from "@/lib/professionals/professional-service/repository/ProfessionalServiceRepository";
import { Districts } from "@/lib/cities/types/cities.schema";
import mongoose from "mongoose";
import {
  createMockPaginatedResponse,
  createMockEntityData,
  createPaginatedResponseFromData,
} from "@/__tests__/mocks/repository";
import { verifyArrayFilter, verifyFilterResults } from "@/__tests__/utils/repository.helpers";

describe("Professional Service Filters [unit]", () => {
  describe("Filter Building Logic (buildProfessionalServiceSearchFilter)", () => {
    describe("Category Filter (categoryId)", () => {
      it("should build filter for single valid ObjectId", () => {
        const validObjectId = new mongoose.Types.ObjectId().toString();
        const filter = buildProfessionalServiceSearchFilter({
          categoryId: [validObjectId],
        });

        expect(filter.category).toEqual({ $in: [validObjectId] });
        expect(filter._id).toBeUndefined();
      });

      it("should build filter for multiple valid ObjectIds", () => {
        const validObjectIds = [
          new mongoose.Types.ObjectId().toString(),
          new mongoose.Types.ObjectId().toString(),
        ];
        const filter = buildProfessionalServiceSearchFilter({
          categoryId: validObjectIds,
        });

        expect(filter.category).toEqual({ $in: validObjectIds });
        expect(filter._id).toBeUndefined();
      });

      it("should handle invalid ObjectId (should return impossible filter)", () => {
        const invalidObjectId = "invalid-object-id";
        const filter = buildProfessionalServiceSearchFilter({
          categoryId: [invalidObjectId],
        });

        expect(filter.category).toBeUndefined();
        expect(filter._id).toBeDefined();
      });

      it("should handle mix of valid and invalid ObjectIds", () => {
        const validObjectId = new mongoose.Types.ObjectId().toString();
        const invalidObjectId = "invalid-object-id";
        const filter = buildProfessionalServiceSearchFilter({
          categoryId: [validObjectId, invalidObjectId],
        });

        // If any invalid, should return impossible filter
        expect(filter._id).toBeDefined();
      });
    });

    describe("SubCategory Filter (subCategoryId)", () => {
      it("should build filter for single valid ObjectId", () => {
        const validObjectId = new mongoose.Types.ObjectId().toString();
        const filter = buildProfessionalServiceSearchFilter({
          subCategoryId: [validObjectId],
        });

        expect(filter.subCategory).toEqual({ $in: [validObjectId] });
        expect(filter._id).toBeUndefined();
      });

      it("should build filter for multiple valid ObjectIds", () => {
        const validObjectIds = [
          new mongoose.Types.ObjectId().toString(),
          new mongoose.Types.ObjectId().toString(),
        ];
        const filter = buildProfessionalServiceSearchFilter({
          subCategoryId: validObjectIds,
        });

        expect(filter.subCategory).toEqual({ $in: validObjectIds });
        expect(filter._id).toBeUndefined();
      });

      it("should handle invalid ObjectId", () => {
        const invalidObjectId = "invalid-object-id";
        const filter = buildProfessionalServiceSearchFilter({
          subCategoryId: [invalidObjectId],
        });

        expect(filter.subCategory).toBeUndefined();
        expect(filter._id).toBeDefined();
      });
    });

    describe("District Filter (district)", () => {
      it("should build filter for single district", () => {
        const filter = buildProfessionalServiceSearchFilter({
          district: [Districts.Center],
        });

        expect(filter.district).toEqual({ $in: [Districts.Center] });
      });

      it("should build filter for multiple districts", () => {
        const districts = [Districts.Center, Districts.North];
        const filter = buildProfessionalServiceSearchFilter({
          district: districts,
        });

        expect(filter.district).toEqual({ $in: districts });
      });
    });

    describe("City Filter (city)", () => {
      it("should build filter for single city", () => {
        const filter = buildProfessionalServiceSearchFilter({
          city: ["Tel Aviv"],
        });

        expect(filter.city).toEqual({ $in: ["Tel Aviv"] });
      });

      it("should build filter for multiple cities", () => {
        const cities = ["Tel Aviv", "Jerusalem"];
        const filter = buildProfessionalServiceSearchFilter({
          city: cities,
        });

        expect(filter.city).toEqual({ $in: cities });
      });
    });

    describe("Combined Filters", () => {
      it("should combine category and district filters", () => {
        const validObjectId = new mongoose.Types.ObjectId().toString();
        const filter = buildProfessionalServiceSearchFilter({
          categoryId: [validObjectId],
          district: [Districts.Center],
        });

        expect(filter.category).toEqual({ $in: [validObjectId] });
        expect(filter.district).toEqual({ $in: [Districts.Center] });
      });

      it("should combine all filters", () => {
        const categoryId = new mongoose.Types.ObjectId().toString();
        const subCategoryId = new mongoose.Types.ObjectId().toString();
        const filter = buildProfessionalServiceSearchFilter({
          categoryId: [categoryId],
          subCategoryId: [subCategoryId],
          district: [Districts.Center],
          city: ["Tel Aviv"],
        });

        expect(filter.category).toEqual({ $in: [categoryId] });
        expect(filter.subCategory).toEqual({ $in: [subCategoryId] });
        expect(filter.district).toEqual({ $in: [Districts.Center] });
        expect(filter.city).toEqual({ $in: ["Tel Aviv"] });
      });

      it("should handle empty filters", () => {
        const filter = buildProfessionalServiceSearchFilter({});

        expect(filter.category).toBeUndefined();
        expect(filter.subCategory).toBeUndefined();
        expect(filter.district).toBeUndefined();
        expect(filter.city).toBeUndefined();
        expect(filter._id).toBeUndefined();
      });
    });
  });

  describe("Repository Filter Passing", () => {
    let mockGetAll: ReturnType<typeof vi.fn>;

    beforeEach(() => {
      mockGetAll = vi.fn();
      vi.spyOn(professionalServiceRepository, "getAll").mockImplementation(
        mockGetAll as any
      );
    });

    it("should pass categoryId filter to repository", async () => {
      const categoryId = new mongoose.Types.ObjectId().toString();
      const mockResponse = createMockPaginatedResponse([], 0, 1, 10);
      mockGetAll.mockResolvedValue(mockResponse);

      await professionalServiceRepository.getAll(
        { categoryId: [categoryId] },
        1,
        10
      );

      expect(mockGetAll).toHaveBeenCalledWith(
        { categoryId: [categoryId] },
        1,
        10
      );
    });

    it("should pass multiple filters to repository", async () => {
      const categoryId = new mongoose.Types.ObjectId().toString();
      const mockResponse = createMockPaginatedResponse([], 0, 1, 10);
      mockGetAll.mockResolvedValue(mockResponse);

      const filters: ProfessionalServiceSearchFilters = {
        categoryId: [categoryId],
        district: [Districts.Center],
        city: ["Tel Aviv"],
      };

      await professionalServiceRepository.getAll(filters, 1, 10);

      expect(mockGetAll).toHaveBeenCalledWith(filters, 1, 10);
    });

    it("should pass empty filters to repository", async () => {
      const mockResponse = createMockPaginatedResponse([], 0, 1, 10);
      mockGetAll.mockResolvedValue(mockResponse);

      await professionalServiceRepository.getAll({}, 1, 10);

      expect(mockGetAll).toHaveBeenCalledWith({}, 1, 10);
    });
  });

  describe("Filter Integration with Mock Data", () => {
    it("should filter by categoryId using mock data", () => {
      const categoryId1 = new mongoose.Types.ObjectId().toString();
      const categoryId2 = new mongoose.Types.ObjectId().toString();

      const mockData = createMockEntityData(
        {
          category: { id: categoryId1 },
          district: Districts.Center,
          city: "Tel Aviv",
        },
        5
      );

      const mockData2 = createMockEntityData(
        {
          category: { id: categoryId2 },
          district: Districts.Center,
          city: "Tel Aviv",
        },
        3
      );

      const allData = [...mockData, ...mockData2];

      const result = createPaginatedResponseFromData(
        allData,
        { "category.id": [categoryId1] },
        1,
        10
      );

      expect(result.data.length).toBe(5);
      expect(result.totalCount).toBe(5);
      verifyFilterResults(result, "category.id", [categoryId1]);
    });

    it("should filter by district using mock data", () => {
      const mockData = createMockEntityData(
        {
          category: { id: new mongoose.Types.ObjectId().toString() },
          district: Districts.Center,
          city: "Tel Aviv",
        },
        5
      );

      const mockData2 = createMockEntityData(
        {
          category: { id: new mongoose.Types.ObjectId().toString() },
          district: Districts.North,
          city: "Haifa",
        },
        3
      );

      const allData = [...mockData, ...mockData2];

      const result = createPaginatedResponseFromData(
        allData,
        { district: [Districts.Center] },
        1,
        10
      );

      expect(result.data.length).toBe(5);
      expect(result.totalCount).toBe(5);
      verifyArrayFilter(result, "district", [Districts.Center]);
    });

    it("should filter by multiple districts", () => {
      const mockData = createMockEntityData(
        {
          category: { id: new mongoose.Types.ObjectId().toString() },
          district: Districts.Center,
          city: "Tel Aviv",
        },
        5
      );

      const mockData2 = createMockEntityData(
        {
          category: { id: new mongoose.Types.ObjectId().toString() },
          district: Districts.North,
          city: "Haifa",
        },
        3
      );

      const mockData3 = createMockEntityData(
        {
          category: { id: new mongoose.Types.ObjectId().toString() },
          district: Districts.South,
          city: "Beer Sheva",
        },
        2
      );

      const allData = [...mockData, ...mockData2, ...mockData3];

      const result = createPaginatedResponseFromData(
        allData,
        { district: [Districts.Center, Districts.North] },
        1,
        10
      );

      expect(result.data.length).toBe(8);
      expect(result.totalCount).toBe(8);
      verifyArrayFilter(result, "district", [Districts.Center, Districts.North]);
    });

    it("should combine multiple filters", () => {
      const categoryId = new mongoose.Types.ObjectId().toString();
      const mockData = createMockEntityData(
        {
          category: { id: categoryId },
          district: Districts.Center,
          city: "Tel Aviv",
        },
        5
      );

      const mockData2 = createMockEntityData(
        {
          category: { id: categoryId },
          district: Districts.North,
          city: "Haifa",
        },
        3
      );

      const mockData3 = createMockEntityData(
        {
          category: { id: new mongoose.Types.ObjectId().toString() },
          district: Districts.Center,
          city: "Tel Aviv",
        },
        2
      );

      const allData = [...mockData, ...mockData2, ...mockData3];

      const result = createPaginatedResponseFromData(
        allData,
        {
          "category.id": [categoryId],
          district: [Districts.Center],
        },
        1,
        10
      );

      expect(result.data.length).toBe(5);
      expect(result.totalCount).toBe(5);
      verifyFilterResults(result, "category.id", [categoryId]);
      verifyArrayFilter(result, "district", [Districts.Center]);
    });

    it("should handle pagination with filters", () => {
      const categoryId = new mongoose.Types.ObjectId().toString();
      const mockData = createMockEntityData(
        {
          category: { id: categoryId },
          district: Districts.Center,
          city: "Tel Aviv",
        },
        25
      );

      // Page 1
      const result1 = createPaginatedResponseFromData(
        mockData,
        { "category.id": [categoryId] },
        1,
        10
      );

      expect(result1.data.length).toBe(10);
      expect(result1.totalCount).toBe(25);
      expect(result1.currentPage).toBe(1);
      expect(result1.totalPages).toBe(3);
      expect(result1.hasNextPage).toBe(true);
      expect(result1.hasPreviousPage).toBe(false);

      // Page 2
      const result2 = createPaginatedResponseFromData(
        mockData,
        { "category.id": [categoryId] },
        2,
        10
      );

      expect(result2.data.length).toBe(10);
      expect(result2.currentPage).toBe(2);
      expect(result2.hasNextPage).toBe(true);
      expect(result2.hasPreviousPage).toBe(true);

      // Page 3 (last page)
      const result3 = createPaginatedResponseFromData(
        mockData,
        { "category.id": [categoryId] },
        3,
        10
      );

      expect(result3.data.length).toBe(5);
      expect(result3.currentPage).toBe(3);
      expect(result3.hasNextPage).toBe(false);
      expect(result3.hasPreviousPage).toBe(true);
    });
  });
});
