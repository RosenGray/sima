/**
 * Example Unit Test
 * Tests utility functions in isolation
 */
import { describe, it, expect } from "vitest";

// Example: Test a utility function
describe("Common Utilities", () => {
  it("should format number with commas", () => {
    // This is an example - replace with actual utility function tests
    const formatNumber = (num: number): string => {
      return num.toLocaleString("en-US");
    };

    expect(formatNumber(1000)).toBe("1,000");
    expect(formatNumber(1000000)).toBe("1,000,000");
  });

  it("should handle edge cases", () => {
    const formatNumber = (num: number): string => {
      return num.toLocaleString("en-US");
    };

    expect(formatNumber(0)).toBe("0");
    expect(formatNumber(-1000)).toBe("-1,000");
  });
});
