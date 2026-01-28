/**
 * Helper functions for repository testing
 * Note: MongoDB-dependent helpers have been removed in favor of mocking
 */

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
 * Verify that all items in result match the filter criteria
 */
export function verifyFilterResults<T>(
  result: { data: T[] },
  filterKey: string,
  expectedValues: any[]
): void {
  expect(result.data.length).toBeGreaterThan(0);
  expect(
    result.data.every((item: any) => {
      const itemValue = item[filterKey];
      // Handle nested properties (e.g., category.id)
      const actualValue = typeof itemValue === "object" && itemValue?.id
        ? itemValue.id
        : itemValue;
      return expectedValues.includes(actualValue);
    })
  ).toBe(true);
}

/**
 * Verify that filter was applied correctly (for array filters)
 */
export function verifyArrayFilter<T>(
  result: { data: T[] },
  filterKey: string,
  expectedValues: any[]
): void {
  verifyFilterResults(result, filterKey, expectedValues);
}

/**
 * Verify pagination metadata is correct
 */
export function verifyPaginationMetadata(
  response: {
    totalCount: number;
    currentPage: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  },
  pageSize: number
): void {
  const expectedTotalPages = Math.ceil(response.totalCount / pageSize);
  expect(response.totalPages).toBe(expectedTotalPages);
  expect(response.hasNextPage).toBe(response.currentPage < response.totalPages);
  expect(response.hasPreviousPage).toBe(response.currentPage > 1);
}
