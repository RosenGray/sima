import { NextRequest, NextResponse } from "next/server";

const GOOGLE_CLIENT_ID = "472370228271-8orrpd9iin9g2ecvgkuuiha59uriafq9.apps.googleusercontent.com";
const GOOGLE_OAUTH_URL = "https://accounts.google.com/o/oauth2/v2/auth";

export async function GET(request: NextRequest) {
  // Get the base URL for the callback
  const baseUrl = request.nextUrl.origin;
  const redirectUri = `${baseUrl}/api/auth/google/callback`;

  // Build Google OAuth URL
  const params = new URLSearchParams({
    client_id: GOOGLE_CLIENT_ID,
    redirect_uri: redirectUri,
    response_type: "code",
    scope: "openid email profile",
    access_type: "offline",
    prompt: "consent",
  });

  const authUrl = `${GOOGLE_OAUTH_URL}?${params.toString()}`;

  // Redirect to Google OAuth page
  return NextResponse.redirect(authUrl);
}

