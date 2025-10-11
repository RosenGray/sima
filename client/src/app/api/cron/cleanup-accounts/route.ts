import { NextRequest, NextResponse } from "next/server";
import { processAccountCleanup } from "@/lib/auth/services/AccountCleanupService";

// This should be set in your environment variables
const CRON_SECRET = process.env.CRON_SECRET || "your-secret-key-change-this";

export async function POST(request: NextRequest) {
  try {
    // Verify the request is authorized
    const authHeader = request.headers.get("authorization");
    
    if (authHeader !== `Bearer ${CRON_SECRET}`) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    console.log("Starting account cleanup process...");
    const startTime = Date.now();

    // Run the cleanup process
    const result = await processAccountCleanup();

    const executionTime = Date.now() - startTime;

    console.log("Account cleanup completed:", {
      ...result,
      executionTime: `${executionTime}ms`,
    });

    return NextResponse.json({
      success: true,
      message: "Account cleanup completed successfully",
      result: {
        warningsSent: result.warningsSent,
        accountsDeleted: result.accountsDeleted,
        errors: result.errors,
        executionTime: `${executionTime}ms`,
      },
    });
  } catch (error) {
    console.error("Error in cleanup-accounts cron:", error);
    
    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

// Optional: Allow GET requests to check if the endpoint is working
export async function GET() {
  return NextResponse.json({
    message: "Account cleanup cron endpoint is active",
    note: "Use POST with Bearer token to trigger cleanup",
  });
}

