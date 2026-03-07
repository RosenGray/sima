"use server";
import { parseWithZod } from "@conform-to/zod";
import {
  createCommercialRealEstateSchema,
  CommercialRealEstateFormData,
} from "../types/commercialRealEstate.schema";
import { getCurrentUser } from "@/lib/auth/utils/auth.utils";
import { redirect } from "next/navigation";
import { nanoid } from "nanoid";
import { revalidatePath } from "next/cache";
import { uploadFiles } from "@/lib/files/uploadFiles";
import { commercialRealEstateRepository } from "../repository/CommercialRealEstateRepository";
import mongoose from "mongoose";
import { checkRateLimit } from "@/lib/rateLimit/rateLimit";
import {
  RATE_LIMIT_ACTION_PUBLISH_HOUR,
  RATE_LIMIT_ACTION_PUBLISH_DAY,
  PUBLISH_LIMITS,
} from "@/lib/constants/rateLimitActions";

export async function publishCommercialRealEstateAd(
  initialState: unknown,
  formData: FormData
) {
  const result = parseWithZod(formData, {
    schema: createCommercialRealEstateSchema({ minNumberOfImages: 1 }),
  });

  if (result.status !== "success") return result.reply();
  const user = await getCurrentUser();
  if (!user) {
    return result.reply({
      formErrors: ["Что-то пошло не так, попробуйте позже"],
    });
  }

  const [hourly, daily] = await Promise.all([
    checkRateLimit({
      key: user.id,
      action: RATE_LIMIT_ACTION_PUBLISH_HOUR,
      limit: PUBLISH_LIMITS.free.hour,
      windowSeconds: 3600,
    }),
    checkRateLimit({
      key: user.id,
      action: RATE_LIMIT_ACTION_PUBLISH_DAY,
      limit: PUBLISH_LIMITS.free.day,
      windowSeconds: 86400,
    }),
  ]);
  if (!hourly.allowed || !daily.allowed) {
    return result.reply({
      formErrors: ["Превышен лимит публикаций. Попробуйте позже через час"],
    });
  }

  const formDataValue = result.value as unknown as CommercialRealEstateFormData;
  const { images, ...commercialRealEstateData } = formDataValue;

  try {
    // Create FormData for file upload
    const uploadFormData = new FormData();

    // Add files to FormData
    (images as File[]).forEach((file: File) => {
      uploadFormData.append("files", file);
    });

    const uploadResult = await uploadFiles(
      "real-estate/commercial-real-estate",
      user.id,
      uploadFormData
    );

    // Create commercial real estate using repository
    await commercialRealEstateRepository.create({
      ...commercialRealEstateData,
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
  revalidatePath("/real-estate/commercial-real-estate", "layout");
  redirect("/real-estate/commercial-real-estate");
}
