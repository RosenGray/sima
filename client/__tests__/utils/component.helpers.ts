import React from "react";
import { renderWithProviders } from "../test-utils";
import { SerializedUser } from "@/lib/auth/types/auth.scema";
import { createMockUser } from "../mocks/auth";
import { userEvent } from "@testing-library/user-event";
import { vi } from "vitest";

/**
 * Render component with authenticated user
 */
export function renderWithAuth(
  ui: React.ReactElement,
  user?: SerializedUser | null
) {
  const mockUser = user ?? createMockUser();
  return renderWithProviders(ui, { user: mockUser });
}

/**
 * Render component without authenticated user
 */
export function renderWithoutAuth(ui: React.ReactElement) {
  return renderWithProviders(ui, { user: null });
}

/**
 * Mock Next.js router
 */
export const mockRouter = {
  push: vi.fn(),
  replace: vi.fn(),
  refresh: vi.fn(),
  back: vi.fn(),
  forward: vi.fn(),
  prefetch: vi.fn(),
};

/**
 * Mock Next.js pathname
 */
export const mockPathname = "/";

/**
 * Mock Next.js search params
 */
export function createMockSearchParams(
  params: Record<string, string | string[]> = {}
): URLSearchParams {
  const searchParams = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (Array.isArray(value)) {
      value.forEach((v) => searchParams.append(key, v));
    } else {
      searchParams.set(key, value);
    }
  }
  return searchParams;
}

/**
 * Wait for async operations to complete
 */
export async function waitForAsync() {
  await new Promise((resolve) => setTimeout(resolve, 0));
}

/**
 * Helper to test form submission
 */
export async function submitForm(
  form: HTMLFormElement,
  submitButton?: HTMLElement
) {
  const button = submitButton || form.querySelector('button[type="submit"]');
  if (button) {
    await userEvent.click(button as HTMLElement);
  } else {
    form.requestSubmit();
  }
}

// Re-export userEvent for convenience
export { userEvent } from "@testing-library/user-event";
export { vi } from "vitest";
