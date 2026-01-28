import { vi } from "vitest";

/**
 * Paginated response structure
 */
export interface PaginatedResponse<T = any> {
  data: T[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

/**
 * Creates a mock paginated response
 */
export function createMockPaginatedResponse<T>(
  data: T[],
  totalCount: number,
  currentPage: number = 1,
  pageSize: number = 10
): PaginatedResponse<T> {
  const totalPages = Math.ceil(totalCount / pageSize);
  return {
    data,
    totalCount,
    currentPage,
    totalPages,
    hasNextPage: currentPage < totalPages,
    hasPreviousPage: currentPage > 1,
  };
}

/**
 * Creates a mock repository with configurable methods
 */
export function createMockRepository<T = any>() {
  const mockGetAll = vi.fn<[any?, number?, number?], Promise<PaginatedResponse<T>>>();
  const mockGetByPublicId = vi.fn<[string], Promise<T | null>>();
  const mockCreate = vi.fn<[any], Promise<T>>();
  const mockUpdate = vi.fn<[string, any], Promise<T>>();
  const mockDelete = vi.fn<[string], Promise<void>>();

  return {
    getAll: mockGetAll,
    getByPublicId: mockGetByPublicId,
    create: mockCreate,
    update: mockUpdate,
    delete: mockDelete,
    // Helper to reset all mocks
    reset: () => {
      mockGetAll.mockReset();
      mockGetByPublicId.mockReset();
      mockCreate.mockReset();
      mockUpdate.mockReset();
      mockDelete.mockReset();
    },
    // Helper to verify filter was called correctly
    verifyGetAllCalledWith: (
      filters: any,
      page: number = 1,
      pageSize: number = 10
    ) => {
      expect(mockGetAll).toHaveBeenCalledWith(filters, page, pageSize);
    },
  };
}

/**
 * Creates mock data for testing filters
 */
export function createMockEntityData<T extends Record<string, any>>(
  baseData: T,
  count: number = 10
): T[] {
  return Array.from({ length: count }, (_, index) => ({
    ...baseData,
    id: `mock-id-${index}`,
    publicId: `mock-public-id-${index}`,
  }));
}

/**
 * Filters mock data based on filter criteria
 * Supports nested properties using dot notation (e.g., "category.id")
 */
export function filterMockData<T extends Record<string, any>>(
  data: T[],
  filters: Record<string, any>
): T[] {
  return data.filter((item) => {
    for (const [key, value] of Object.entries(filters)) {
      if (value === undefined || value === null) continue;

      // Get value from item (support nested properties with dot notation)
      let itemValue: any;
      if (key.includes(".")) {
        // Handle nested properties (e.g., "category.id")
        const keys = key.split(".");
        itemValue = keys.reduce((obj, k) => obj?.[k], item);
      } else {
        itemValue = item[key];
      }

      // Handle array filters ($in)
      if (Array.isArray(value)) {
        if (value.length === 0) continue;
        if (!value.includes(itemValue)) {
          return false;
        }
      }
      // Handle single value filters
      else if (itemValue !== value) {
        return false;
      }
    }
    return true;
  });
}

/**
 * Creates a paginated response from filtered data
 */
export function createPaginatedResponseFromData<T>(
  allData: T[],
  filters: Record<string, any>,
  currentPage: number = 1,
  pageSize: number = 10
): PaginatedResponse<T> {
  const filteredData = filterMockData(allData, filters);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedData = filteredData.slice(startIndex, endIndex);

  return createMockPaginatedResponse(
    paginatedData,
    filteredData.length,
    currentPage,
    pageSize
  );
}
