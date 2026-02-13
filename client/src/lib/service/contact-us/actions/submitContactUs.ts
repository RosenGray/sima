"use server";
import { parseWithZod } from "@conform-to/zod";
import { redirect } from "next/navigation";
import { ContactUsSchema } from "../types/contactUs.schema";

export async function submitContactUs(
  initialState: unknown,
  formData: FormData,
) {
  const result = parseWithZod(formData, { schema: ContactUsSchema });

  if (result.status !== "success") return result.reply();

  await new Promise((resolve) => setTimeout(resolve, 5000));

  redirect("/");
}
