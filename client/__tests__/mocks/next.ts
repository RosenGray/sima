import { vi } from "vitest";

/**
 * Mock Next.js redirect function
 */
export const mockRedirect = vi.fn((url: string) => {
  // In tests, we just track the call
  return;
});

/**
 * Mock Next.js revalidatePath function
 */
export const mockRevalidatePath = vi.fn((path: string, type?: "layout" | "page") => {
  // In tests, we just track the call
  return;
});

/**
 * Reset all Next.js mocks
 */
export const resetNextMocks = () => {
  mockRedirect.mockClear();
  mockRevalidatePath.mockClear();
};

/**
 * Setup mocks for Next.js navigation and cache modules
 */
export function setupNextMocks() {
  vi.mock("next/navigation", () => ({
    redirect: mockRedirect,
    useRouter: () => ({
      push: vi.fn(),
      replace: vi.fn(),
      refresh: vi.fn(),
      back: vi.fn(),
      forward: vi.fn(),
      prefetch: vi.fn(),
    }),
    usePathname: () => "/",
    useSearchParams: () => new URLSearchParams(),
  }));

  vi.mock("next/cache", () => ({
    revalidatePath: mockRevalidatePath,
    revalidateTag: vi.fn(),
  }));
}
