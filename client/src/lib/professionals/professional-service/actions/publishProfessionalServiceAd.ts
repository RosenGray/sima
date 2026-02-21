"use server";
import { parseWithZod } from "@conform-to/zod";
import { createProfessionalServiceSchema } from "../types/professional-service.scema";
import { getCurrentUser } from "@/lib/auth/utils/auth.utils";
import { ProfessionalService } from "../models/ProfessionalService";
import { User } from "@/lib/auth/models/User";
import connectDB from "@/lib/mongo/mongodb";
import { redirect } from "next/navigation";
import { nanoid } from "nanoid";
import { revalidatePath } from "next/cache";
import { uploadFiles } from "@/lib/files/uploadFiles";
import { ProfessionalPage } from "@/lib/professionals/professional-page/models/ProfessionalPage";

export async function publishProfessionalServiceAd(
  initialState: unknown,
  formData: FormData,
) {
  const result = parseWithZod(formData, {
    schema: createProfessionalServiceSchema({ minNumberOfImages: 1 }),
  });

  if (result.status !== "success") return result.reply();
  const user = await getCurrentUser();
  if (!user) {
    return result.reply({
      formErrors: ["Что-то пошло не так, попробуйте позже"],
    });
  }

  const { images } = result.value;

  try {
    // Create FormData for file upload
    const uploadFormData = new FormData();

    // Add files to FormData
    images.forEach((file: File) => {
      uploadFormData.append("files", file);
    });

    const uploadResult = await uploadFiles(
      "professionals-service",
      user.id,
      uploadFormData,
    );

    await connectDB();

    const professionalService = new ProfessionalService({
      ...result.value,
      user: user.id,
      publicId: nanoid(10),
      acceptTerms: result.value.acceptTerms === "on",
      images: uploadResult.files,
    });
    await professionalService.save();

    if (result.value.acceptPersonalPage === "on") {
      await User.findByIdAndUpdate(user.id, {
        hasPrivateProfessionalPage: true,
      });

      const professionalPage = new ProfessionalPage({
        user: user.id,
        publicId: nanoid(10),
        slug: result.value.slug,
        slugPrefix: result.value.slugPrefix,
        fullSlug: result.value.fullSlug,
        displayName: `${user.firstName} ${user.lastName}`,
        description: result.value.description,
        galleryImages: uploadResult.files,
        category: result.value.category,
        subCategory: result.value.subCategory,
        district: result.value.district,
        city: result.value.city,
        contactPhone: result.value.phoneNumber,
        contactEmail: result.value.email,
        acceptTerms: result.value.acceptTerms === "on",
        isPublished: true,
      });
      await professionalPage.save();
    }
    // Return success response with uploaded file data
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
  revalidatePath("/professional-service", "layout"); // Explicitly revalidate the layout
  redirect("/professional-service");
}
