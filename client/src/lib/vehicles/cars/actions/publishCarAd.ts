"use server";
import { parseWithZod } from "@conform-to/zod";
import { createCarSchema, CarFormData } from "../types/car.schema";
import { getCurrentUser } from "@/lib/auth/utils/auth.utils";
import { redirect } from "next/navigation";
import { nanoid } from "nanoid";
import { revalidatePath } from "next/cache";
import { uploadFiles } from "@/lib/files/uploadFiles";
import { carRepository } from "../repository/CarRepository";
import mongoose from "mongoose";
import { TransmissionType, EngineType } from "../types/cars.types";

export async function publishCarAd(
  initialState: unknown,
  formData: FormData
) {
  const result = parseWithZod(formData, {
    schema: createCarSchema({ minNumberOfImages: 1 }),
  });

  if (result.status !== "success") return result.reply();
  const user = await getCurrentUser();
  if (!user) {
    return result.reply({
      formErrors: ["Что-то пошло не так, попробуйте позже"],
    });
  }

  const formDataValue = result.value as unknown as CarFormData;
  const { images, ...carData } = formDataValue;

  try {
    // Create FormData for file upload
    const uploadFormData = new FormData();

    // Add files to FormData
    (images as File[]).forEach((file: File) => {
      uploadFormData.append("files", file);
    });

    const uploadResult = await uploadFiles(
      "cars",
      user.id,
      uploadFormData
    );

    // // Create car using repository
    // await carRepository.create({
    //   manufacturer: carData.manufacturer,
    //   model: carData.model as string,
    //   yearOfManufacture: carData.yearOfManufacture as number,
    //   numberOfHand: Number(carData.numberOfHand),
    //   transmission: carData.transmission,
    //   engineType: carData.engineType as EngineType,
    //   engineCapacity: carData.engineCapacity as number | undefined,
    //   mileage: carData.mileage as number | undefined,
    //   numberOfDoors: carData.numberOfDoors as number | undefined,
    //   color: carData.color as string | undefined,
    //   price: carData.price as number,
    //   description: carData.description as string,
    //   accessories: carData.accessories as string | undefined,
    //   district: carData.district as string,
    //   city: carData.city as string,
    //   contactName: carData.contactName as string,
    //   contactPrimaryPhone: carData.contactPrimaryPhone,
    //   contactSecondaryPhone: carData.contactSecondaryPhone,
    //   contactEmail: carData.contactEmail as string,
    //   user: user.id as unknown as mongoose.Types.ObjectId,
    //   publicId: nanoid(10),
    //   acceptTerms: (carData.acceptTerms as string) === "on",
    //   images: uploadResult.files,
    // });

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
  revalidatePath("/cars", "layout"); // Explicitly revalidate the layout
  redirect("/cars");
}

