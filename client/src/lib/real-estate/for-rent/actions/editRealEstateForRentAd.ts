"use server";
import { parseWithZod } from "@conform-to/zod";
import {
  createRealEstateForRentSchema,
  RealEstateForRentFormData,
} from "../types/realEstateForRent.schema";
import { getCurrentUser } from "@/lib/auth/utils/auth.utils";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import {
  ExistingImageItem,
  FileUploadResponse,
  uploadFiles,
} from "@/lib/files/uploadFiles";
import { getFileManager } from "@/lib/common/actions/getFileManager";
import { realEstateForRentRepository } from "../repository/RealEstateForRentRepository";
import mongoose from "mongoose";

export async function editRealEstateForRentAd(
  context: {
    realEstatePublicId: string;
    imagesToDelete: ExistingImageItem[];
    allImagesShouldBeDeleted: boolean;
  },
  initialState: unknown,
  formData: FormData
) {
  const result = parseWithZod(formData, {
    schema: createRealEstateForRentSchema({
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
      "real-estate/for-rent",
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
        folderName: "for-rent",
        userId: user.id,
      },
    };

    // Only upload if there are valid images
    if (validImages.length > 0) {
      // Create FormData for file upload
      const uploadFormData = new FormData();

      // Add files to FormData
      validImages.forEach((file: File) => {
        uploadFormData.append("files", file);
      });

      uploadResult = await uploadFiles(
        "real-estate/for-rent",
        user.id,
        uploadFormData
      );
    }

    // Get existing real estate using repository
    const realEstate = await realEstateForRentRepository.getByPublicId(
      context.realEstatePublicId
    );
    if (!realEstate) {
      return result.reply({
        formErrors: ["Объявление не найдено"],
      });
    }

    const imageIdsToDelete = context.imagesToDelete.map((img) => img.id);
    const updatedImages = [
      ...realEstate.images.filter((img) => !imageIdsToDelete.includes(img.id)),
      ...uploadResult.files,
    ];

    // Update real estate using repository
    const formDataValue = result.value as RealEstateForRentFormData;
    const { images: _, ...realEstateData } = formDataValue;
    await realEstateForRentRepository.edit(context.realEstatePublicId, {
      ...realEstateData,
      user: user.id as unknown as mongoose.Types.ObjectId,
      acceptTerms: realEstateData.acceptTerms === "on",
      images: updatedImages,
    });

    // Return success response with uploaded file data
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
  revalidatePath("/real-estate/for-rent", "layout");
  redirect("/real-estate/for-rent");
}
