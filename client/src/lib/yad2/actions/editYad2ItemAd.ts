"use server";
import { parseWithZod } from "@conform-to/zod";
import {
  createYad2ItemSchema,
  Yad2ItemFormData,
} from "../types/yad2.schema";
import { getCurrentUser } from "@/lib/auth/utils/auth.utils";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import {
  ExistingImageItem,
  FileUploadResponse,
  uploadFiles,
} from "@/lib/files/uploadFiles";
import { getFileManager } from "@/lib/common/actions/getFileManager";
import { yad2ItemRepository } from "../repository/Yad2ItemRepository";
import mongoose from "mongoose";

export async function editYad2ItemAd(
  context: {
    yad2ItemPublicId: string;
    imagesToDelete: ExistingImageItem[];
    allImagesShouldBeDeleted: boolean;
  },
  initialState: unknown,
  formData: FormData
) {
  const result = parseWithZod(formData, {
    schema: createYad2ItemSchema({
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
      "yad2",
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
        folderName: "yad2",
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

      uploadResult = await uploadFiles("yad2", user.id, uploadFormData);
    }

    // Get existing yad2 item using repository
    const yad2Item = await yad2ItemRepository.getByPublicId(
      context.yad2ItemPublicId
    );
    if (!yad2Item) {
      return result.reply({
        formErrors: ["Объявление не найдено"],
      });
    }

    const imageIdsToDelete = context.imagesToDelete.map((img) => img.id);
    const updatedImages = [
      ...yad2Item.images.filter((img) => !imageIdsToDelete.includes(img.id)),
      ...uploadResult.files,
    ];

    // Update yad2 item using repository
    const formDataValue = result.value as Yad2ItemFormData;
    const { images: _, ...yad2ItemData } = formDataValue;
    await yad2ItemRepository.edit(context.yad2ItemPublicId, {
      ...yad2ItemData,
      user: user.id as unknown as mongoose.Types.ObjectId,
      acceptTerms: yad2ItemData.acceptTerms === "on",
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
  revalidatePath("/yad2", "layout"); // Explicitly revalidate the layout
  redirect("/yad2");
}
