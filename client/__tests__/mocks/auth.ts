import { vi } from "vitest";
import { SerializedUser } from "@/lib/auth/types/auth.scema";
import { UserRole } from "@/lib/auth/types/auth.scema";

/**
 * Create a mock user
 */
export const createMockUser = (
  overrides?: Partial<SerializedUser>
): SerializedUser => {
  return {
    id: "test-user-id",
    firstName: "Test",
    lastName: "User",
    email: "test@example.com",
    isEmailVerified: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    hasPrivateProfessionalPage: false,
    role: UserRole.User,
    acceptMarketing: false,
    ...overrides,
  };
};

/**
 * Mock getCurrentUser function
 */
export const mockGetCurrentUser = vi.fn(
  async (): Promise<SerializedUser | null> => {
    return createMockUser();
  }
);

/**
 * Mock getCurrentUser to return null (unauthenticated)
 */
export const mockGetCurrentUserUnauthenticated = vi.fn(
  async (): Promise<SerializedUser | null> => {
    return null;
  }
);

/**
 * Mock getCurrentUser with custom user
 */
export const mockGetCurrentUserWithUser = (user: SerializedUser) => {
  return vi.fn(async (): Promise<SerializedUser | null> => {
    return user;
  });
};

/**
 * Reset mock getCurrentUser function
 */
export const resetMockGetCurrentUser = () => {
  mockGetCurrentUser.mockClear();
  mockGetCurrentUser.mockReset();
};

/**
 * Setup mock for auth utils module
 */
export function setupAuthMock() {
  vi.mock("@/lib/auth/utils/auth.utils", () => ({
    getCurrentUser: mockGetCurrentUser,
    jwtSignUser: vi.fn((user: SerializedUser) => "mock-jwt-token"),
    requireAuthOrRedirectTo: vi.fn(async () => createMockUser()),
  }));
}
