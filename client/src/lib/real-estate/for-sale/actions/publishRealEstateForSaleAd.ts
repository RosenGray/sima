"use server";
import { parseWithZod } from "@conform-to/zod";
import {
  createRealEstateForSaleSchema,
  RealEstateForSaleFormData,
} from "../types/realEstateForSale.schema";
import { getCurrentUser } from "@/lib/auth/utils/auth.utils";
import { redirect } from "next/navigation";
import { nanoid } from "nanoid";
import { revalidatePath } from "next/cache";
import { uploadFiles } from "@/lib/files/uploadFiles";
import { realEstateForSaleRepository } from "../repository/RealEstateForSaleRepository";
import mongoose from "mongoose";

export async function publishRealEstateForSaleAd(
  initialState: unknown,
  formData: FormData
) {
  const result = parseWithZod(formData, {
    schema: createRealEstateForSaleSchema({ minNumberOfImages: 1 }),
  });

  if (result.status !== "success") return result.reply();
  const user = await getCurrentUser();
  if (!user) {
    return result.reply({
      formErrors: ["Что-то пошло не так, попробуйте позже"],
    });
  }

  const formDataValue = result.value as unknown as RealEstateForSaleFormData;
  const { images, ...realEstateData } = formDataValue;

  try {
    // Create FormData for file upload
    const uploadFormData = new FormData();

    // Add files to FormData
    (images as File[]).forEach((file: File) => {
      uploadFormData.append("files", file);
    });

    const uploadResult = await uploadFiles(
      "real-estate/for-sale",
      user.id,
      uploadFormData
    );

    // Create real estate using repository
    await realEstateForSaleRepository.create({
      ...realEstateData,
      user: user.id as unknown as mongoose.Types.ObjectId,
      publicId: nanoid(10),
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
  revalidatePath("/real-estate/for-sale", "layout");
  redirect("/real-estate/for-sale");
}
