"use server";
import { parseWithZod } from "@conform-to/zod";
import { createCommercialVehicleSchema, CommercialVehicleFormData } from "../types/commercialVehicle.schema";
import { getCurrentUser } from "@/lib/auth/utils/auth.utils";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import {
  ExistingImageItem,
  FileUploadResponse,
  uploadFiles,
} from "@/lib/files/uploadFiles";
import { getFileManager } from "@/lib/common/actions/getFileManager";
import { commercialVehicleRepository } from "../repository/CommercialVehicleRepository";
import mongoose from "mongoose";

export async function editCommercialVehicleAd(
  context: {
    commercialVehiclePublicId: string;
    imagesToDelete: ExistingImageItem[];
    allImagesShouldBeDeleted: boolean;
  },
  initialState: unknown,
  formData: FormData
) {
  const result = parseWithZod(formData, {
    schema: createCommercialVehicleSchema({
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
      "vehicles/commercial-vehicles",
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
        folderName: "commercial-vehicles",
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

      uploadResult = await uploadFiles("vehicles/commercial-vehicles", user.id, uploadFormData);
    }

    // Get existing commercial vehicle using repository
    const commercialVehicle = await commercialVehicleRepository.getByPublicId(context.commercialVehiclePublicId);
    if (!commercialVehicle) {
      return result.reply({
        formErrors: ["Объявление не найдено"],
      });
    }

    const imageIdsToDelete = context.imagesToDelete.map((img) => img.id);
    const updatedImages = [
      ...commercialVehicle.images.filter((img) => !imageIdsToDelete.includes(img.id)),
      ...uploadResult.files,
    ];

    // Update commercial vehicle using repository
    const formDataValue = result.value as CommercialVehicleFormData;
    const { images: _, ...commercialVehicleData } = formDataValue;
    await commercialVehicleRepository.edit(context.commercialVehiclePublicId, {
      ...commercialVehicleData,
      user: user.id as unknown as mongoose.Types.ObjectId,
      acceptTerms: commercialVehicleData.acceptTerms === "on",
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
  revalidatePath("/vehicles/commercial-vehicles", "layout"); // Explicitly revalidate the layout
  redirect("/vehicles/commercial-vehicles");
}
