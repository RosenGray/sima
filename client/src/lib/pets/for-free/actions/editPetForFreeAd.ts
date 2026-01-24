"use server";
import { parseWithZod } from "@conform-to/zod";
import {
  createPetForFreeSchema,
  PetForFreeFormData,
} from "../types/petForFree.schema";
import { getCurrentUser } from "@/lib/auth/utils/auth.utils";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import {
  ExistingImageItem,
  FileUploadResponse,
  uploadFiles,
} from "@/lib/files/uploadFiles";
import { getFileManager } from "@/lib/common/actions/getFileManager";
import { petForFreeRepository } from "../repository/PetForFreeRepository";
import mongoose from "mongoose";

export async function editPetForFreeAd(
  context: {
    petPublicId: string;
    imagesToDelete: ExistingImageItem[];
    allImagesShouldBeDeleted: boolean;
  },
  initialState: unknown,
  formData: FormData
) {
  const result = parseWithZod(formData, {
    schema: createPetForFreeSchema({
      minNumberOfImages: context.allImagesShouldBeDeleted ? 1 : 0,
    }),
  });
  if (result.status !== "success") return result.reply();
  const user = await getCurrentUser();
  if (!user) {
    return result.reply({
      formErrors: ["Что-то пошло не так, попробуйте позже"],
    });
  }

  if (context.imagesToDelete.length > 0) {
    const fileManager = await getFileManager();
    await fileManager.deleteFiles(
      user.id,
      "pets/for-free",
      context.imagesToDelete.map((image) => ({
        fileName: image.uniqueName,
        versionId: image.versionId,
      }))
    );
  }

  const { images } = result.value;

  try {
    const validImages = images.filter(
      (file: File) => file.size > 0 && file.name !== "undefined"
    );

    let uploadResult: FileUploadResponse = {
      success: true,
      message: "No new files to upload",
      files: [],
      metadata: {
        totalFiles: 0,
        folderName: "for-free",
        userId: user.id,
      },
    };

    if (validImages.length > 0) {
      const uploadFormData = new FormData();

      validImages.forEach((file: File) => {
        uploadFormData.append("files", file);
      });

      uploadResult = await uploadFiles(
        "pets/for-free",
        user.id,
        uploadFormData
      );
    }

    const pet = await petForFreeRepository.getByPublicId(context.petPublicId);
    if (!pet) {
      return result.reply({
        formErrors: ["Объявление не найдено"],
      });
    }

    const imageIdsToDelete = context.imagesToDelete.map((img) => img.id);
    const updatedImages = [
      ...pet.images.filter((img) => !imageIdsToDelete.includes(img.id)),
      ...uploadResult.files,
    ];

    const formDataValue = result.value as PetForFreeFormData;
    const { images: _, ...petData } = formDataValue;
    await petForFreeRepository.edit(context.petPublicId, {
      ...petData,
      user: user.id as unknown as mongoose.Types.ObjectId,
      acceptTerms: petData.acceptTerms === "on",
      images: updatedImages,
    });
  } catch (error) {
    console.log(error);
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
