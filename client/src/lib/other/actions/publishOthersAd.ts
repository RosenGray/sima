"use server";
import { parseWithZod } from "@conform-to/zod";
import { createOthersSchema } from "../types/others.schema";
import { getCurrentUser } from "@/lib/auth/utils/auth.utils";
import { Others } from "../models/Others";
import connectDB from "@/lib/mongo/mongodb";
import { redirect } from "next/navigation";
import { nanoid } from "nanoid";
import { revalidatePath } from "next/cache";
import { uploadFiles } from "@/lib/files/uploadFiles";
import { checkRateLimits } from "@/lib/rateLimit/rateLimit";
import {
  RATE_LIMIT_ACTION_PUBLISH_HOUR,
  RATE_LIMIT_ACTION_PUBLISH_DAY,
  PUBLISH_LIMITS,
} from "@/lib/constants/rateLimitActions";

export async function publishOthersAd(
  initialState: unknown,
  formData: FormData
) {
  const result = parseWithZod(formData, {
    schema: createOthersSchema({ minNumberOfImages: 1 }),
  });

  if (result.status !== "success") return result.reply();
  const user = await getCurrentUser();
  if (!user) {
    return result.reply({
      formErrors: ["Что-то пошло не так, попробуйте позже"],
    });
  }

  const rateLimit = await checkRateLimits([
    { key: user.id, action: RATE_LIMIT_ACTION_PUBLISH_HOUR, limit: PUBLISH_LIMITS.free.hour, windowSeconds: 3600 },
    { key: user.id, action: RATE_LIMIT_ACTION_PUBLISH_DAY, limit: PUBLISH_LIMITS.free.day, windowSeconds: 86400 },
  ]);
  if (!rateLimit.allowed) {
    return result.reply({
      formErrors: ["Превышен лимит публикаций. Попробуйте позже через час"],
    });
  }

  const { images } = result.value;

  try {
    // Create FormData for file upload
    const uploadFormData = new FormData();

    // Add files to FormData
    images.forEach((file: File) => {
      uploadFormData.append("files", file);
    });

    const uploadResult = await uploadFiles("other", user.id, uploadFormData);

    await connectDB();

    const other = new Others({
      ...result.value,
      user: user.id,
      publicId: nanoid(10),
      status: "active",
      acceptTerms: result.value.acceptTerms === "on",
      images: uploadResult.files,
    });
    await other.save();
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
  revalidatePath("/other", "layout");
  redirect("/other");
}
