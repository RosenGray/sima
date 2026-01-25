"use server";
import { parseWithZod } from "@conform-to/zod";
import {
  createCommercialRealEstateSchema,
  CommercialRealEstateFormData,
} from "../types/commercialRealEstate.schema";
import { getCurrentUser } from "@/lib/auth/utils/auth.utils";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import {
  ExistingImageItem,
  FileUploadResponse,
  uploadFiles,
} from "@/lib/files/uploadFiles";
import { getFileManager } from "@/lib/common/actions/getFileManager";
import { commercialRealEstateRepository } from "../repository/CommercialRealEstateRepository";
import mongoose from "mongoose";

export async function editCommercialRealEstateAd(
  context: {
    commercialRealEstatePublicId: string;
    imagesToDelete: ExistingImageItem[];
    allImagesShouldBeDeleted: boolean;
  },
  initialState: unknown,
  formData: FormData
) {
  const result = parseWithZod(formData, {
    schema: createCommercialRealEstateSchema({
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
      "real-estate/commercial-real-estate",
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
        folderName: "commercial-real-estate",
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
        "real-estate/commercial-real-estate",
        user.id,
        uploadFormData
      );
    }

    // Get existing commercial real estate using repository
    const commercialRealEstate =
      await commercialRealEstateRepository.getByPublicId(
        context.commercialRealEstatePublicId
      );
    if (!commercialRealEstate) {
      return result.reply({
        formErrors: ["Объявление не найдено"],
      });
    }

    const imageIdsToDelete = context.imagesToDelete.map((img) => img.id);
    const updatedImages = [
      ...commercialRealEstate.images.filter(
        (img) => !imageIdsToDelete.includes(img.id)
      ),
      ...uploadResult.files,
    ];

    // Update commercial real estate using repository
    const formDataValue =
      result.value as CommercialRealEstateFormData;
    const { images: _, ...commercialRealEstateData } = formDataValue;
    await commercialRealEstateRepository.edit(
      context.commercialRealEstatePublicId,
      {
        ...commercialRealEstateData,
        user: user.id as unknown as mongoose.Types.ObjectId,
        acceptTerms: commercialRealEstateData.acceptTerms === "on",
        images: updatedImages,
      }
    );

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
  revalidatePath("/real-estate/commercial-real-estate", "layout");
  redirect("/real-estate/commercial-real-estate");
}
