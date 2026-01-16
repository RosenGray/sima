"use server";
import { parseWithZod } from "@conform-to/zod";
import { createOffRoadVehicleSchema, OffRoadVehicleFormData } from "../types/offRoadVehicle.schema";
import { getCurrentUser } from "@/lib/auth/utils/auth.utils";
import { redirect } from "next/navigation";
import { nanoid } from "nanoid";
import { revalidatePath } from "next/cache";
import { uploadFiles } from "@/lib/files/uploadFiles";
import { offRoadVehicleRepository } from "../repository/OffRoadVehicleRepository";
import mongoose from "mongoose";

export async function publishOffRoadVehicleAd(initialState: unknown, formData: FormData) {
  const result = parseWithZod(formData, {
    schema: createOffRoadVehicleSchema({ minNumberOfImages: 1 }),
  });

  if (result.status !== "success") return result.reply();
  const user = await getCurrentUser();
  if (!user) {
    return result.reply({
      formErrors: ["Что-то пошло не так, попробуйте позже"],
    });
  }

  const formDataValue = result.value as unknown as OffRoadVehicleFormData;
  const { images, ...offRoadVehicleData } = formDataValue;

  try {
    // Create FormData for file upload
    const uploadFormData = new FormData();

    // Add files to FormData
    (images as File[]).forEach((file: File) => {
      uploadFormData.append("files", file);
    });

    const uploadResult = await uploadFiles(
      "vehicles/off-road",
      user.id,
      uploadFormData
    );

    // Create off-road vehicle using repository
    await offRoadVehicleRepository.create({
      ...offRoadVehicleData,

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
  revalidatePath("/vehicles/off-road", "layout"); // Explicitly revalidate the layout
  redirect("/vehicles/off-road");
}
