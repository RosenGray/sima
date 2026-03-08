"use server";
import { parseWithZod } from "@conform-to/zod";
import { createCarSchema, CarFormData } from "../types/car.schema";
import { getCurrentUser } from "@/lib/auth/utils/auth.utils";
import { redirect } from "next/navigation";
import { nanoid } from "nanoid";
import { revalidatePath } from "next/cache";
import { uploadFiles } from "@/lib/files/uploadFiles";
import { carRepository } from "../repository/CarRepository";
import mongoose from "mongoose";
import { checkRateLimits, formatRateLimitError } from "@/lib/rateLimit/rateLimit";
import {
  RATE_LIMIT_ACTION_PUBLISH_HOUR,
  RATE_LIMIT_ACTION_PUBLISH_DAY,
  PUBLISH_LIMITS,
} from "@/lib/constants/rateLimitActions";

export async function publishCarAd(initialState: unknown, formData: FormData) {
  const result = parseWithZod(formData, {
    schema: createCarSchema({ minNumberOfImages: 1 }),
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
      formErrors: [formatRateLimitError(rateLimit)],
    });
  }

  const formDataValue = result.value as unknown as CarFormData;
  const { images, ...carData } = formDataValue;

  try {
    // Create FormData for file upload
    const uploadFormData = new FormData();

    // Add files to FormData
    (images as File[]).forEach((file: File) => {
      uploadFormData.append("files", file);
    });

    const uploadResult = await uploadFiles(
      "vehicles/cars",
      user.id,
      uploadFormData
    );

    // Create car using repository
    await carRepository.create({
      ...carData,

      user: user.id as unknown as mongoose.Types.ObjectId,
      publicId: nanoid(10),
      status: "active",
      acceptTerms: result.value.acceptTerms === "on",
      images: uploadResult.files,
    });
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
  revalidatePath("/vehicles/cars", "layout"); // Explicitly revalidate the layout
  redirect("/vehicles/cars");
}
