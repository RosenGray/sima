import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import connectDB from "@/lib/mongo/mongodb";
import { User } from "@/lib/auth/models/User";
import { jwtSignUser } from "@/lib/auth/utils/auth.utils";
import { SIMA_AUTH_SESSION_CONFIG } from "@/lib/auth/config";

const GOOGLE_CLIENT_ID="your-google-client-id-here";
const GOOGLE_CLIENT_SECRET="your-google-client-secret-here";
const GOOGLE_TOKEN_URL="your-random-secret-string-here";
const GOOGLE_USERINFO_URL="http://localhost:3000";

interface GoogleTokenResponse {
  access_token: string;
  expires_in: number;
  token_type: string;
  scope: string;
  refresh_token?: string;
}

interface GoogleUserInfo {
  id: string;
  email: string;
  verified_email: boolean;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const code = searchParams.get("code");
    const error = searchParams.get("error");

    // Handle OAuth errors
    if (error) {
      console.error("OAuth error:", error);
      return NextResponse.redirect(
        new URL(`/auth/login?error=${error}`, request.url)
      );
    }

    if (!code) {
      return NextResponse.redirect(
        new URL("/auth/login?error=no_code", request.url)
      );
    }

    // Exchange code for access token (Accept-Encoding: identity avoids Node decompression path that can throw transformAlgorithm on Alpine)
    const tokenResponse = await fetch(GOOGLE_TOKEN_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Accept-Encoding": "identity",
      },
      body: new URLSearchParams({
        code,
        client_id: GOOGLE_CLIENT_ID,
        client_secret: GOOGLE_CLIENT_SECRET,
        redirect_uri: `${request.nextUrl.origin}/api/auth/google/callback`,
        grant_type: "authorization_code",
      }),
    });

    if (!tokenResponse.ok) {
      const errorData = await tokenResponse.text();
      console.error("Token exchange failed:", errorData);
      return NextResponse.redirect(
        new URL("/auth/login?error=token_exchange_failed", request.url)
      );
    }

    const tokenData: GoogleTokenResponse = await tokenResponse.json();

    // Get user info from Google (Accept-Encoding: identity avoids Node decompression path)
    const userInfoResponse = await fetch(GOOGLE_USERINFO_URL, {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
        "Accept-Encoding": "identity",
      },
    });

    if (!userInfoResponse.ok) {
      console.error("Failed to fetch user info");
      return NextResponse.redirect(
        new URL("/auth/login?error=userinfo_failed", request.url)
      );
    }

    const googleUser: GoogleUserInfo = await userInfoResponse.json();

    // Connect to database
    await connectDB();

    // Check if user exists
    let dbUser = await User.findOne({ email: googleUser.email });

    if (dbUser) {
      // User exists - link Google account if not already linked
      if (!dbUser.googleId) {
        dbUser.googleId = googleUser.id;
        await dbUser.save();
      }
    } else {
      // Create new user
      dbUser = await User.create({
        email: googleUser.email,
        firstName: googleUser.given_name || googleUser.name.split(" ")[0] || "User",
        lastName: googleUser.family_name || googleUser.name.split(" ").slice(1).join(" ") || "",
        googleId: googleUser.id,
        isEmailVerified: googleUser.verified_email,
      });
    }

    // Generate JWT token using your existing auth system
    const cookieStore = await cookies();
    const userJwt = jwtSignUser(dbUser);
    cookieStore.set(
      SIMA_AUTH_SESSION_CONFIG.name,
      userJwt,
      SIMA_AUTH_SESSION_CONFIG
    );

    // Redirect to success page
    return NextResponse.redirect(new URL("/auth/success", request.url));
  } catch (error) {
    console.error("Error in Google OAuth callback:", error);
    return NextResponse.redirect(
      new URL("/auth/login?error=callback_failed", request.url)
    );
  }
}

