"use server";
import { parseWithZod } from "@conform-to/zod";
import { createOthersSchema } from "../types/others.schema";
import { getCurrentUser } from "@/lib/auth/utils/auth.utils";
import { Others } from "../models/Others";
import connectDB from "@/lib/mongo/mongodb";
import {
  ExistingImageItem,
  FileUploadResponse,
  uploadFiles,
} from "@/lib/files/uploadFiles";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { getFileManager } from "@/lib/common/actions/getFileManager";
import { othersRepository } from "../repository/OthersRepository";

export async function editOthersAd(
  context: {
    othersPublicId: string;
    imagesToDelete: ExistingImageItem[];
    allImagesShouldBeDeleted: boolean;
  },
  initialState: unknown,
  formData: FormData
) {
  const result = parseWithZod(formData, {
    schema: createOthersSchema({
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
      "other",
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
        folderName: "other",
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

      uploadResult = await uploadFiles("other", user.id, uploadFormData);
    }

    await connectDB();

    const other = await othersRepository.getByPublicId(context.othersPublicId);
    if (!other) {
      return result.reply({
        formErrors: ["Объявление не найдено"],
      });
    }
    const imageIdsToDelete = context.imagesToDelete.map((img) => img.id);
    const updatedImages = [
      ...other.images.filter((img) => !imageIdsToDelete.includes(img.id)),
      ...uploadResult.files,
    ];

    await Others.findOneAndUpdate(
      { publicId: context.othersPublicId },
      {
        ...result.value,
        user: user.id,
        acceptTerms: result.value.acceptTerms === "on",
        images: updatedImages,
      }
    );
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
  revalidatePath("/other", "layout");
  redirect("/other");
}
