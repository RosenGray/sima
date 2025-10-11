"use server";
import connectDB from "@/lib/mongo/mongodb";
import { User } from "../models/User";
import {
  validateVerificationToken,
  deleteVerificationToken,
} from "../services/EmailVerificationManager";
import { VerificationTokenValidationReason, VerifyEmailResult } from "../types/verification.types";

export async function verifyEmail(token: string): Promise<VerifyEmailResult> {
  try {
    await connectDB();

    // Validate the token
    const tokenValidation = await validateVerificationToken(token);
    
    if (!tokenValidation.isValid) {
      let message = "Неверный или истекший токен";

      if (tokenValidation.reason === VerificationTokenValidationReason.TokenExpired) {
        message = "Ссылка для подтверждения истекла";
      } else if (tokenValidation.reason === VerificationTokenValidationReason.TokenNotFound) {
        message = "Неверная ссылка для подтверждения";
      } else if (tokenValidation.reason === VerificationTokenValidationReason.AlreadyVerified) {
        message = "Email уже подтвержден";
      }

      return {
        success: false,
        message,
        reason: tokenValidation.reason,
      };
    }

    // Update user's email verification status and clear verification token
    await User.updateOne(
      { email: tokenValidation.email },
      {
        $set: { isEmailVerified: true },
        $unset: { emailVerificationToken: "", emailVerificationTokenExpiresAt: "" },
      }
    );

    // Delete the token to prevent reuse
    await deleteVerificationToken(token);

    return {
      success: true,
      message: "Email успешно подтвержден!",
    };
  } catch (error) {
    console.error("Error verifying email:", error);
    return {
      success: false,
      message: "Произошла ошибка при подтверждении email",
    };
  }
}

