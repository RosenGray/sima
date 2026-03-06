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
import { checkRateLimit } from "@/lib/rateLimit/rateLimit";

export async function publishProfessionalServiceAd(
  initialState: unknown,
  formData: FormData,
) {
  console.log("[publishProfessionalServiceAd] START");

  const result = parseWithZod(formData, {
    schema: createProfessionalServiceSchema({ minNumberOfImages: 1 }),
  });

  console.log("[publishProfessionalServiceAd] zod parse status:", result.status);
  if (result.status !== "success") return result.reply();

  const user = await getCurrentUser();
  console.log("[publishProfessionalServiceAd] getCurrentUser done, user:", !!user);
  if (!user) {
    return result.reply({
      formErrors: ["Что-то пошло не так, попробуйте позже"],
    });
  }

  console.log("[publishProfessionalServiceAd] calling checkRateLimit...");
  const { allowed } = await checkRateLimit({
    key: user.id,
    action: "publish-professional-service",
    limit: 2,
    windowSeconds: 3600,
  });
  console.log("[publishProfessionalServiceAd] checkRateLimit done, allowed:", allowed);
  if (!allowed) {
    return result.reply({
      formErrors: ["Превышен лимит публикаций. Попробуйте позже через час"],
    });
  }

  const { images } = result.value;
  console.log("[publishProfessionalServiceAd] image count:", images?.length);

  try {
    const uploadFormData = new FormData();
    images.forEach((file: File) => {
      uploadFormData.append("files", file);
    });

    console.log("[publishProfessionalServiceAd] calling uploadFiles...");
    const uploadResult = await uploadFiles(
      "professionals-service",
      user.id,
      uploadFormData,
    );
    console.log("[publishProfessionalServiceAd] uploadFiles done, files:", uploadResult.files.length);

    console.log("[publishProfessionalServiceAd] calling connectDB...");
    await connectDB();
    console.log("[publishProfessionalServiceAd] connectDB done");

    const professionalService = new ProfessionalService({
      ...result.value,
      user: user.id,
      publicId: nanoid(10),
      status: "active",
      acceptTerms: result.value.acceptTerms === "on",
      images: uploadResult.files,
    });
    console.log("[publishProfessionalServiceAd] saving ProfessionalService...");
    await professionalService.save();
    console.log("[publishProfessionalServiceAd] ProfessionalService saved");

    console.log("[publishProfessionalServiceAd] acceptPersonalPage:", result.value.acceptPersonalPage);
    if (result.value.acceptPersonalPage === "on") {
      console.log("[publishProfessionalServiceAd] updating User...");
      await User.findByIdAndUpdate(user.id, {
        hasPrivateProfessionalPage: true,
      });
      console.log("[publishProfessionalServiceAd] User updated");

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
      console.log("[publishProfessionalServiceAd] saving ProfessionalPage...");
      await professionalPage.save();
      console.log("[publishProfessionalServiceAd] ProfessionalPage saved");
    }
  } catch (error) {
    console.error("[publishProfessionalServiceAd] CAUGHT ERROR:", error);
    if (error instanceof Error) {
      return result.reply({
        formErrors: ["Неизвестная ошибка"],
      });
    }
    return result.reply({
      formErrors: ["Неизвестная ошибка"],
    });
  }

  console.log("[publishProfessionalServiceAd] calling revalidatePath...");
  revalidatePath("/professional-service", "layout");
  console.log("[publishProfessionalServiceAd] calling redirect...");
  redirect("/professional-service");
}
