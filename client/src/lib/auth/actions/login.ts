"use server";
import { cookies } from "next/headers";
import { parseWithZod } from "@conform-to/zod";
import { LoginSchema } from "../types/auth.scema";
import connectDB from "@/lib/mongo/mongodb";
import { User } from "../models/User";
import { SIMA_AUTH_SESSION_CONFIG } from "../config";
import { jwtSignUser } from "../utils/auth.utils";
import { PasswordManager } from "../services/PasswordManager";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function loginUser(initialState: unknown, formData: FormData) {
  const result = parseWithZod(formData, { schema: LoginSchema });
  if (result.status !== "success") return result.reply();

  try {
    await connectDB();

    const { email, password } = result.value;
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return result.reply({
        formErrors: ["Неверный email или пароль"],
      });
    }

    const passwordsMatch = await PasswordManager.compare(
      existingUser.password,
      password
    );
    if (!passwordsMatch) {
      return result.reply({
        formErrors: ["Неверный email или пароль"],
      });
    }

    const cookieStore = await cookies();
    const userJwt = jwtSignUser(existingUser);
    cookieStore.set(
      SIMA_AUTH_SESSION_CONFIG.name,
      userJwt,
      SIMA_AUTH_SESSION_CONFIG
    );
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
  revalidatePath('/', 'layout');
  redirect("/auth/success");
}
