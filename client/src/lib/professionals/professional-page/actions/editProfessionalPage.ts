"use server";

import { parseWithZod } from "@conform-to/zod";
import { createProfessionalPageSchema } from "../types/professional-page.schema";
import { getCurrentUser } from "@/lib/auth/utils/auth.utils";
import {
  ExistingImageItem,
  FileUploadResponse,
  uploadFiles,
} from "@/lib/files/uploadFiles";
import { getFileManager } from "@/lib/common/actions/getFileManager";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { professionalPageRepository } from "../repository/ProfessionalPageRepository";
import { ProfessionalPage } from "../models/ProfessionalPage";
import connectDB from "@/lib/mongo/mongodb";

const FOLDER = "professional-page";

export async function editProfessionalPage(
  context: {
    pagePublicId: string;
    imagesToDelete: ExistingImageItem[];
    allGalleryImagesDeleted: boolean;
  },
  _initialState: unknown,
  formData: FormData,
) {
  const result = parseWithZod(formData, {
    schema: createProfessionalPageSchema({
      minGalleryImages: context.allGalleryImagesDeleted ? 1 : 0,
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
      FOLDER,
      context.imagesToDelete.map((image) => ({
        fileName: image.uniqueName,
        versionId: image.versionId,
      })),
    );
  }
  const { profileImage, galleryImages, slug, slugPrefix } = result.value;

  try {
    const uploadFormData = new FormData();

    if (profileImage) {
      profileImage.forEach((file: File) => {
        uploadFormData.append("files", file);
      });
    }

    galleryImages.forEach((file: File) => {
      uploadFormData.append("files", file);
    });

    const uploadResult = await uploadFiles(FOLDER, user.id, uploadFormData);

    await connectDB();
    const professionalPage = await professionalPageRepository.getByPublicId(
      context.pagePublicId,
    );
    if (!professionalPage) {
      return result.reply({
        formErrors: ["Страница не найдена"],
      });
    }
    const imageIdsToDelete = context.imagesToDelete.map((img) => img.id);
    const updatedImages = [
      ...professionalPage.galleryImages.filter(
        (img) => !imageIdsToDelete.includes(img.id),
      ),
      ...uploadResult.files,
    ];

    await ProfessionalPage.findOneAndUpdate(
      { publicId: context.pagePublicId },
      {
        ...result.value,
        user: user.id,
        acceptTerms: result.value.acceptTerms === "on",
        galleryImages: updatedImages,
      },
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
  revalidatePath("/professional", "layout");
  redirect(`/professional/${slug}-${slugPrefix}`);
}
