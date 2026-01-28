"use server";
import { parseWithZod } from "@conform-to/zod";
import {
  createSpecialVehicleSchema,
  SpecialVehicleFormData,
} from "../types/specialVehicle.schema";
import { getCurrentUser } from "@/lib/auth/utils/auth.utils";
import { redirect } from "next/navigation";
import { nanoid } from "nanoid";
import { revalidatePath } from "next/cache";
import { uploadFiles } from "@/lib/files/uploadFiles";
import { specialVehicleRepository } from "../repository/SpecialVehicleRepository";
import mongoose from "mongoose";

export async function publishSpecialVehicleAd(
  initialState: unknown,
  formData: FormData
) {
  const result = parseWithZod(formData, {
    schema: createSpecialVehicleSchema({ minNumberOfImages: 1 }),
  });

  if (result.status !== "success") return result.reply();
  const user = await getCurrentUser();
  if (!user) {
    return result.reply({
      formErrors: ["Что-то пошло не так, попробуйте позже"],
    });
  }

  const formDataValue = result.value as unknown as SpecialVehicleFormData;
  const { images, ...specialVehicleData } = formDataValue;

  try {
    // Create FormData for file upload
    const uploadFormData = new FormData();

    // Add files to FormData
    (images as File[]).forEach((file: File) => {
      uploadFormData.append("files", file);
    });

    const uploadResult = await uploadFiles(
      "vehicles/special-vehicles",
      user.id,
      uploadFormData
    );

    // Create special vehicle using repository
    await specialVehicleRepository.create({
      ...specialVehicleData,

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
  revalidatePath("/vehicles/special-vehicles", "layout");
  redirect("/vehicles/special-vehicles");
}
