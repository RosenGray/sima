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

const FOLDER = "professional-page";

export async function editProfessionalPage(
  context: {
    pagePublicId: string;
    profileImageToDelete: ExistingImageItem | null;
    galleryImagesToDelete: ExistingImageItem[];
    allGalleryImagesDeleted: boolean;
  },
  _initialState: unknown,
  formData: FormData
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
      formErrors: ["Необходимо войти в аккаунт"],
    });
  }

  const existing = await professionalPageRepository.getByPublicId(
    context.pagePublicId
  );
  if (!existing) {
    return result.reply({
      formErrors: ["Страница не найдена"],
    });
  }
  if (existing.user.id !== user.id) {
    return result.reply({
      formErrors: ["Нет доступа к редактированию"],
    });
  }

  let slug = result.value.slug?.trim();
  if (slug) {
    slug = slug.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
    const existingBySlug = await ProfessionalPage.findOne({ slug });
    if (existingBySlug && existingBySlug.publicId !== context.pagePublicId) {
      return result.reply({
        formErrors: ["Такой адрес страницы уже занят. Выберите другой."],
      });
    }
  } else {
    slug = existing.slug;
  }

  if (context.profileImageToDelete) {
    const fileManager = await getFileManager();
    await fileManager.deleteFiles(user.id, FOLDER, [
      {
        fileName: context.profileImageToDelete.uniqueName,
        versionId: context.profileImageToDelete.versionId,
      },
    ]);
  }

  if (context.galleryImagesToDelete.length > 0) {
    const fileManager = await getFileManager();
    await fileManager.deleteFiles(
      user.id,
      FOLDER,
      context.galleryImagesToDelete.map((img) => ({
        fileName: img.uniqueName,
        versionId: img.versionId,
      }))
    );
  }

  const profileFile = result.value.profileImage;
  const galleryFiles = (result.value.galleryImages ?? []).filter(
    (f: File) => f.size > 0 && f.name !== "undefined"
  );

  let profileImage = context.profileImageToDelete ? undefined : existing.profileImage;
  const remainingGallery = existing.galleryImages.filter(
    (img) =>
      !context.galleryImagesToDelete.some((d) => d.id === img.id)
  );

  if (profileFile && profileFile.size > 0) {
    const uploadFormData = new FormData();
    uploadFormData.append("files", profileFile);
    const uploadResult = await uploadFiles(FOLDER, user.id, uploadFormData);
    if (uploadResult.files.length > 0) {
      profileImage = uploadResult.files[0];
    }
  }

  let galleryImages: typeof existing.galleryImages = [...remainingGallery];
  if (galleryFiles.length > 0) {
    const uploadFormData = new FormData();
    galleryFiles.forEach((f) => uploadFormData.append("files", f));
    const uploadResult: FileUploadResponse = await uploadFiles(
      FOLDER,
      user.id,
      uploadFormData
    );
    galleryImages = [...galleryImages, ...uploadResult.files];
  }

  try {
    await professionalPageRepository.update(context.pagePublicId, {
      slug,
      displayName: result.value.displayName,
      description: result.value.description,
      profileImage,
      galleryImages,
      category: result.value.category,
      subCategory: result.value.subCategory,
      district: result.value.district,
      city: result.value.city,
      contactPhone: result.value.contactPhone,
      contactEmail: result.value.contactEmail,
      socialLinks:
        result.value.whatsapp ||
        result.value.instagram ||
        result.value.facebook ||
        result.value.website
          ? {
              whatsapp: result.value.whatsapp,
              instagram: result.value.instagram,
              facebook: result.value.facebook,
              website: result.value.website,
            }
          : undefined,
      isPublished: result.value.isPublished ?? true,
    });
  } catch (error) {
    console.error("editProfessionalPage error:", error);
    return result.reply({
      formErrors: ["Не удалось сохранить изменения. Попробуйте позже."],
    });
  }

  revalidatePath("/professional", "layout");
  redirect(`/publish-ad/professional-page/edit/${context.pagePublicId}`);
}
