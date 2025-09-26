"use server";
import { parseWithZod } from "@conform-to/zod";
import { ResetPasswordSchema } from "../types/auth.scema";
import connectDB from "@/lib/mongo/mongodb";
import { IUser, User } from "../models/User";
import {
  generateToken,
  storeToken,
} from "../services/TokenManager/TokenManager";
import { sendPasswordResetEmail } from "../services/PasswordManager";

export async function resetPassword(initialState: unknown, formData: FormData) {
  const result = parseWithZod(formData, { schema: ResetPasswordSchema });
  if (result.status !== "success") return result.reply();

  try {
    await connectDB();

    const { email } = result.value;

    const existingUser = await User.findOne<IUser>({ email });
    if (existingUser) {
      const { NEXT_PUBLIC_CLIENT_URL } = process.env;

      const token = generateToken();
      await storeToken(email, token);
      const resetPasswordLink = `${NEXT_PUBLIC_CLIENT_URL}/auth/reset-password/${token}`;
      await sendPasswordResetEmail(email, resetPasswordLink);
    }

    return result.reply();
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
}
