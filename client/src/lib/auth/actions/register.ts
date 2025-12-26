"use server";
import { cookies } from "next/headers";
import { parseWithZod } from "@conform-to/zod";
import { RegisterSchema } from "../types/auth.scema";
import connectDB from "@/lib/mongo/mongodb";
import { User } from "../models/User";
import { SIMA_AUTH_SESSION_CONFIG } from "../config";
import { jwtSignUser } from "../utils/auth.utils";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import {
  generateVerificationToken,
  storeVerificationToken,
  sendVerificationEmail,
} from "../services/EmailVerificationManager";
import { Logger } from "@logtail/next";
//
export async function registerUser(initialState: unknown, formData: FormData) {
  const log = new Logger();

  const result = parseWithZod(formData, { schema: RegisterSchema });
  if (result.status !== "success") return result.reply();

  try {
    await connectDB();

    const { firstName, lastName, email, password } = result.value;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return result.reply({
        formErrors: ["Электронная почта уже используется"],
      });
    }
    const user = new User({
      firstName,
      lastName,
      email,
      password,
      isEmailVerified: false,
      acceptMarketing: result.value.acceptMarketing === "on",
    });
    await user.save();

    // Set cookie and redirect immediately (don't wait for email)
    const cookieStore = await cookies();
    const userJwt = jwtSignUser(user);
    cookieStore.set(
      SIMA_AUTH_SESSION_CONFIG.name,
      userJwt,
      SIMA_AUTH_SESSION_CONFIG
    );

    // Generate and send email verification asynchronously (non-blocking)
    // This prevents timeout issues in production
    (async () => {
      try {
        const verificationToken = generateVerificationToken();
        await storeVerificationToken(email, verificationToken);
        const { NEXT_PUBLIC_CLIENT_URL } = process.env;
        const verificationLink = `${NEXT_PUBLIC_CLIENT_URL}/auth/verify-email/${verificationToken}`;
        await sendVerificationEmail(email, verificationLink);
      } catch (emailError) {
        // log.error("Error sending verification email:", emailError as Error);
        // Don't block registration if email fails
      }
    })();
  } catch (error) {
    if (error instanceof Error) {
      return result.reply({
        formErrors: ["Неизвестная ошибка"],
      });
    }
    return result.reply({
      formErrors: ["Неизвестная ошибка"],
    });
  }
  revalidatePath("/", "layout");
  redirect("/auth/success");
}
