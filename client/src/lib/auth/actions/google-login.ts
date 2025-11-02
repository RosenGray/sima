"use server";
import { cookies } from "next/headers";
import { User } from "../models/User";
import { SIMA_AUTH_SESSION_CONFIG } from "../config";
import { jwtSignUser } from "../utils/auth.utils";
import connectDB from "@/lib/mongo/mongodb";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function handleGoogleCallback(email: string) {
  try {
    await connectDB();

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      throw new Error("User not found after Google authentication");
    }

    const cookieStore = await cookies();
    const userJwt = jwtSignUser(existingUser);
    cookieStore.set(
      SIMA_AUTH_SESSION_CONFIG.name,
      userJwt,
      SIMA_AUTH_SESSION_CONFIG
    );

    revalidatePath("/", "layout");
    redirect("/auth/success");
  } catch (error) {
    console.error("Error in handleGoogleCallback:", error);
    throw error;
  }
}

