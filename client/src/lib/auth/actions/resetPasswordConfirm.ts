"use server";
import { parseWithZod } from "@conform-to/zod";
import { ResetPasswordConfirmSchema } from "../types/auth.scema";
import connectDB from "@/lib/mongo/mongodb";
import { User } from "../models/User";
import { PasswordManager } from "../services/PasswordManager";
import {
  validateToken,
  deleteToken,
} from "../services/TokenManager/TokenManager";
import { redirect } from "next/navigation";

export async function resetPasswordConfirm(
  initialState: unknown,
  formData: FormData
) {
  const result = parseWithZod(formData, { schema: ResetPasswordConfirmSchema });
  if (result.status !== "success") return result.reply();

  try {
    await connectDB();

    const { token, password } = result.value;

    // Validate the token
    const tokenValidation = await validateToken(token);
    if (!tokenValidation.isValid) {
      let errorMessage = "Неверный или истекший токен";

      if (tokenValidation.reason === 1) {
        // TokenExpired
        errorMessage = "Ссылка для сброса пароля истекла";
      } else if (tokenValidation.reason === 0) {
        // TokenNotFound
        errorMessage = "Неверная ссылка для сброса пароля";
      }

      return result.reply({
        formErrors: [errorMessage],
      });
    }

    // Hash the new password
    const hashedPassword = await PasswordManager.toHash(password);

    // Update user's password and clear reset token
    await User.updateOne(
      { email: tokenValidation.email },
      {
        $set: { password: hashedPassword },
        $unset: { resetToken: "", resetTokenExpiresAt: "" },
      }
    );

    // Delete the token to prevent reuse
    await deleteToken(token);
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

  redirect("/auth/success");
}
