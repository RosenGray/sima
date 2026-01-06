"use server";
import connectDB from "@/lib/mongo/mongodb";
import { User } from "../models/User";
import { ResendVerificationResult } from "../types/verification.types";
import {
  generateToken,
  storeVerificationToken,
} from "../services/TokenManager/TokenManager";
import { EmailService } from "@/lib/common/services/EmailService";

export async function resendVerificationEmail(
  email: string
): Promise<ResendVerificationResult> {
  try {
    await connectDB();

    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      // Don't reveal if email exists or not for security
      return {
        success: true,
        message:
          "Если этот адрес зарегистрирован, письмо с подтверждением было отправлено",
      };
    }

    // Check if already verified
    if (user.isEmailVerified) {
      return {
        success: false,
        message: "Email уже подтвержден",
      };
    }

    // Generate new verification token
    const verificationToken = generateToken();
    await storeVerificationToken(email, verificationToken);

    const { NEXT_PUBLIC_CLIENT_URL } = process.env;
    const verificationLink = `${NEXT_PUBLIC_CLIENT_URL}/auth/verify-email/${verificationToken}`;

    // Send verification email
    await EmailService.sendVerificationEmail(email, verificationLink);

    return {
      success: true,
      message: "Новое письмо с подтверждением отправлено! Проверьте вашу почту",
    };
  } catch (error) {
    console.error("Error resending verification email:", error);
    return {
      success: false,
      message: "Произошла ошибка при отправке письма",
    };
  }
}
