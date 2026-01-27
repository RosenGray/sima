import mongoose from "mongoose";
import { clearDatabase } from "../mocks/mongodb";

/**
 * Clean up all collections in the database
 */
export async function cleanupDatabase(): Promise<void> {
  await clearDatabase();
}

/**
 * Get count of documents in a collection
 */
export async function getCollectionCount(
  model: mongoose.Model<any>
): Promise<number> {
  return await model.countDocuments();
}

/**
 * Helper to verify pagination response structure
 */
export function verifyPaginationResponse(response: {
  data: any[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}) {
  expect(response).toHaveProperty("data");
  expect(response).toHaveProperty("totalCount");
  expect(response).toHaveProperty("currentPage");
  expect(response).toHaveProperty("totalPages");
  expect(response).toHaveProperty("hasNextPage");
  expect(response).toHaveProperty("hasPreviousPage");
  expect(Array.isArray(response.data)).toBe(true);
  expect(typeof response.totalCount).toBe("number");
  expect(typeof response.currentPage).toBe("number");
  expect(typeof response.totalPages).toBe("number");
  expect(typeof response.hasNextPage).toBe("boolean");
  expect(typeof response.hasPreviousPage).toBe("boolean");
}

/**
 * Helper to verify pagination calculations
 */
export function verifyPaginationCalculations(
  response: {
    data: any[];
    totalCount: number;
    currentPage: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  },
  pageSize: number
) {
  const expectedTotalPages = Math.ceil(response.totalCount / pageSize);
  expect(response.totalPages).toBe(expectedTotalPages);
  expect(response.hasNextPage).toBe(response.currentPage < response.totalPages);
  expect(response.hasPreviousPage).toBe(response.currentPage > 1);
  expect(response.data.length).toBeLessThanOrEqual(pageSize);
}

/**
 * Helper to test filter functionality
 */
export async function testFilter<T>(
  repository: {
    getAll: (filters: any, page?: number, pageSize?: number) => Promise<any>;
  },
  filterKey: string,
  filterValue: any,
  model: mongoose.Model<T>
) {
  // Create test data with and without the filter value
  const withFilter = await model.create({
    [filterKey]: filterValue,
    // Add other required fields as needed
  });

  const withoutFilter = await model.create({
    [filterKey]: "different-value",
    // Add other required fields as needed
  });

  // Test filter
  const result = await repository.getAll({ [filterKey]: [filterValue] });

  expect(result.data.length).toBeGreaterThan(0);
  expect(
    result.data.every((item: any) => item[filterKey] === filterValue)
  ).toBe(true);

  // Cleanup
  await model.deleteMany({ _id: { $in: [withFilter._id, withoutFilter._id] } });
}
