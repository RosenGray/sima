"use server";
import { parseWithZod } from "@conform-to/zod";
import {
  createPetForFreeSchema,
  PetForFreeFormData,
} from "../types/petForFree.schema";
import { getCurrentUser } from "@/lib/auth/utils/auth.utils";
import { redirect } from "next/navigation";
import { nanoid } from "nanoid";
import { revalidatePath } from "next/cache";
import { uploadFiles } from "@/lib/files/uploadFiles";
import { petForFreeRepository } from "../repository/PetForFreeRepository";
import mongoose from "mongoose";

export async function publishPetForFreeAd(
  initialState: unknown,
  formData: FormData
) {
  const result = parseWithZod(formData, {
    schema: createPetForFreeSchema({ minNumberOfImages: 1 }),
  });

  if (result.status !== "success") return result.reply();
  const user = await getCurrentUser();
  if (!user) {
    return result.reply({
      formErrors: ["Что-то пошло не так, попробуйте позже"],
    });
  }

  const formDataValue = result.value as unknown as PetForFreeFormData;
  const { images, ...petData } = formDataValue;

  try {
    const uploadFormData = new FormData();

    (images as File[]).forEach((file: File) => {
      uploadFormData.append("files", file);
    });

    const uploadResult = await uploadFiles(
      "pets/for-free",
      user.id,
      uploadFormData
    );

    await petForFreeRepository.create({
      ...petData,
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
  revalidatePath("/pets/for-free", "layout");
  redirect("/pets/for-free");
}
