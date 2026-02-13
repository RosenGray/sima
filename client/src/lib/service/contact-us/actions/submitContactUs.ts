"use server";
import { parseWithZod } from "@conform-to/zod";
import { redirect } from "next/navigation";
import { ContactUsSchema } from "../types/contactUs.schema";
import { EmailService } from "@/lib/common/services/EmailService";

export async function submitContactUs(
  initialState: unknown,
  formData: FormData
) {
  const result = parseWithZod(formData, { schema: ContactUsSchema });

  if (result.status !== "success") return result.reply();

  const { name, email, subject, message } = result.value;

  try {
    await EmailService.sendContactUsEmail({ name, email, subject, message });
  } catch {
    return result.reply({
      formErrors: ["Не удалось отправить сообщение. Попробуйте позже."],
    });
  }

  redirect("/");
}
