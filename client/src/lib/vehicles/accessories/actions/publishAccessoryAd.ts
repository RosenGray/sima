"use server";
import { parseWithZod } from "@conform-to/zod";
import {
  createAccessorySchema,
  AccessoryFormData,
} from "../types/accessory.schema";
import { getCurrentUser } from "@/lib/auth/utils/auth.utils";
import { redirect } from "next/navigation";
import { nanoid } from "nanoid";
import { revalidatePath } from "next/cache";
import { uploadFiles } from "@/lib/files/uploadFiles";
import { accessoryRepository } from "../repository/AccessoryRepository";
import mongoose from "mongoose";

export async function publishAccessoryAd(
  initialState: unknown,
  formData: FormData
) {
  const result = parseWithZod(formData, {
    schema: createAccessorySchema({ minNumberOfImages: 1 }),
  });

  if (result.status !== "success") return result.reply();
  const user = await getCurrentUser();
  if (!user) {
    return result.reply({
      formErrors: ["Что-то пошло не так, попробуйте позже"],
    });
  }

  const formDataValue = result.value as unknown as AccessoryFormData;
  const { images, ...accessoryData } = formDataValue;

  try {
    // Create FormData for file upload
    const uploadFormData = new FormData();

    // Add files to FormData
    (images as File[]).forEach((file: File) => {
      uploadFormData.append("files", file);
    });

    const uploadResult = await uploadFiles(
      "vehicles/accessories",
      user.id,
      uploadFormData
    );

    // Create accessory using repository
    await accessoryRepository.create({
      ...accessoryData,

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
  revalidatePath("/vehicles/accessories", "layout");
  redirect("/vehicles/accessories");
}
