import { setupServer } from "msw/node";
import { handlers } from "./handlers";

/**
 * MSW server for API route mocking in Node.js environment (tests)
 */
export const server = setupServer(...handlers);

/**
 * Setup MSW server before all tests
 */
export function setupMSW() {
  beforeAll(() => {
    server.listen({ onUnhandledRequest: "error" });
  });

  afterEach(() => {
    server.resetHandlers();
  });

  afterAll(() => {
    server.close();
  });
}
