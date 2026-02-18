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

  const isValidFile = (file: File) =>
    file instanceof File && file.size > 0 && file.name !== "undefined";
  const profileFiles = (profileImage ?? []).filter(isValidFile);
  const galleryFiles = (galleryImages ?? []).filter(isValidFile);
  const profileFileCount = Math.min(profileFiles.length, 1);

  try {
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
    const existingGalleryMinusDeleted = professionalPage.galleryImages.filter(
      (img) => !imageIdsToDelete.includes(img.id),
    );

    let newProfileImage: (typeof professionalPage)["profileImage"] = undefined;
    let newGalleryUploads: FileUploadResponse["files"] = [];

    if (profileFileCount + galleryFiles.length > 0) {
      const uploadFormData = new FormData();
      profileFiles.slice(0, 1).forEach((file: File) => {
        uploadFormData.append("files", file);
      });
      galleryFiles.forEach((file: File) => {
        uploadFormData.append("files", file);
      });
      const uploadResult = await uploadFiles(FOLDER, user.id, uploadFormData);
      newProfileImage =
        profileFileCount > 0 ? uploadResult.files[0] : undefined;
      newGalleryUploads = uploadResult.files.slice(profileFileCount);
    }

    const hadProfileImage = !!professionalPage.profileImage;
    const profileImageWasDeletedByUser =
      hadProfileImage &&
      context.imagesToDelete.some(
        (img) =>
          img.uniqueName === professionalPage.profileImage!.uniqueName ||
          img.id === professionalPage.profileImage!.id,
      );
    const profileDeletedNoReplacement =
      hadProfileImage && profileFileCount === 0 && profileImageWasDeletedByUser;
    const resolvedProfileImage =
      profileFileCount > 0
        ? newProfileImage
        : profileDeletedNoReplacement
          ? null
          : professionalPage.profileImage;

    const updatedGalleryImages = [
      ...existingGalleryMinusDeleted,
      ...newGalleryUploads,
    ];

    const { profileImage: _pi, galleryImages: _gi, ...restValue } = result.value;
    await ProfessionalPage.findOneAndUpdate(
      { publicId: context.pagePublicId },
      {
        ...restValue,
        user: user.id,
        acceptTerms: result.value.acceptTerms === "on",
        profileImage: resolvedProfileImage ?? null,
        galleryImages: updatedGalleryImages,
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
