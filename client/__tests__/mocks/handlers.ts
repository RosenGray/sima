import { http, HttpResponse } from "msw";

/**
 * MSW request handlers for API routes
 */
export const handlers = [
  // Auth routes
  http.post("/api/auth/register", () => {
    return HttpResponse.json(
      {
        success: true,
        message: "User registered successfully",
      },
      { status: 200 }
    );
  }),

  http.post("/api/auth/login", () => {
    return HttpResponse.json(
      {
        success: true,
        message: "Login successful",
        token: "mock-jwt-token",
      },
      { status: 200 }
    );
  }),

  http.post("/api/auth/logout", () => {
    return HttpResponse.json(
      {
        success: true,
        message: "Logout successful",
      },
      { status: 200 }
    );
  }),

  // ReCAPTCHA route
  http.post("/api/recaptcha", () => {
    return HttpResponse.json(
      {
        success: true,
        message: "ReCAPTCHA verified",
      },
      { status: 200 }
    );
  }),

  // Status route
  http.get("/api/status", () => {
    return HttpResponse.json(
      {
        status: "ok",
        timestamp: new Date().toISOString(),
      },
      { status: 200 }
    );
  }),

  // Cache revalidation route
  http.get("/api/revalidate-cache", () => {
    return HttpResponse.json(
      {
        revalidated: true,
        tags: [],
        message: "Cache cleared",
      },
      { status: 200 }
    );
  }),

  http.post("/api/revalidate-cache", () => {
    return HttpResponse.json(
      {
        revalidated: true,
        tags: [],
        message: "Cache cleared",
      },
      { status: 200 }
    );
  }),

  // Cron route
  http.post("/api/cron/cleanup-accounts", () => {
    return HttpResponse.json(
      {
        success: true,
        message: "Account cleanup completed successfully",
        result: {
          warningsSent: 0,
          accountsDeleted: 0,
          errors: 0,
          executionTime: "50ms",
        },
      },
      { status: 200 }
    );
  }),
];
