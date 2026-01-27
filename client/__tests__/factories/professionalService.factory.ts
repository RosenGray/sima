import { faker } from "@faker-js/faker";
import { ProfessionalService } from "@/lib/professionals/professional-service/models/ProfessionalService";
import { IProfessionalService } from "@/lib/professionals/professional-service/models/ProfessionalService";
import { FileUploadItem } from "@/lib/files/uploadFiles";
import { SerializedUser } from "@/lib/auth/types/auth.scema";
import mongoose from "mongoose";
import { nanoid } from "nanoid";

const DISTRICTS = ["Центр", "Север", "Юг", "Иерусалим", "Хайфа", "Тель-Авив"];
const CITIES = [
  "Тель-Авив",
  "Иерусалим",
  "Хайфа",
  "Беэр-Шева",
  "Нетания",
  "Ашдод",
  "Ришон-ле-Цион",
  "Петах-Тиква",
];

function createMockImage(index: number = 0): FileUploadItem {
  return {
    id: nanoid(10),
    originalName: `service-image-${index + 1}.jpg`,
    uniqueName: `${nanoid(20)}-service-image-${index + 1}.jpg`,
    url: `https://example.com/professional-service/test-user/service-image-${index + 1}.jpg`,
    fieldname: "files",
    versionId: nanoid(10),
    folderName: "professional-service",
  };
}

interface ProfessionalServiceFactoryOptions {
  user?: SerializedUser | mongoose.Types.ObjectId;
  category?: mongoose.Types.ObjectId;
  subCategory?: mongoose.Types.ObjectId;
  images?: FileUploadItem[];
}

export function buildProfessionalService(
  overrides?: Partial<IProfessionalService> & ProfessionalServiceFactoryOptions
): Omit<IProfessionalService, "createdAt" | "updatedAt"> {
  const imageCount = faker.number.int({ min: 1, max: 5 });
  const images =
    overrides?.images ??
    Array.from({ length: imageCount }, (_, i) => createMockImage(i));

  return {
    id: overrides?.id ?? new mongoose.Types.ObjectId().toString(),
    publicId: overrides?.publicId ?? nanoid(10),
    user:
      overrides?.user instanceof mongoose.Types.ObjectId
        ? overrides.user
        : new mongoose.Types.ObjectId(),
    category:
      overrides?.category ?? new mongoose.Types.ObjectId(),
    subCategory:
      overrides?.subCategory ?? new mongoose.Types.ObjectId(),
    district: overrides?.district ?? faker.helpers.arrayElement(DISTRICTS),
    city: overrides?.city ?? faker.helpers.arrayElement(CITIES),
    description:
      overrides?.description ?? faker.lorem.paragraphs(2, "\n"),
    email: overrides?.email ?? faker.internet.email(),
    phoneNumber: overrides?.phoneNumber ?? faker.phone.number("05#-###-####"),
    acceptTerms: overrides?.acceptTerms ?? true,
    images,
  };
}

export async function createProfessionalService(
  overrides?: Partial<IProfessionalService> & ProfessionalServiceFactoryOptions
) {
  const serviceData = buildProfessionalService(overrides);
  const userObjectId =
    serviceData.user instanceof mongoose.Types.ObjectId
      ? serviceData.user
      : new mongoose.Types.ObjectId();

  const service = new ProfessionalService({
    ...serviceData,
    user: userObjectId,
  });
  await service.populate("user");
  await service.populate("category");
  await service.populate("subCategory");
  await service.save();

  return JSON.parse(JSON.stringify(service));
}

export async function createManyProfessionalServices(
  count: number,
  overrides?: Partial<IProfessionalService> & ProfessionalServiceFactoryOptions
) {
  const services = [];
  const batchSize = 50;
  for (let i = 0; i < count; i += batchSize) {
    const batchCount = Math.min(batchSize, count - i);
    const batch = await Promise.all(
      Array.from({ length: batchCount }, () => createProfessionalService(overrides))
    );
    services.push(...batch);
  }
  return services;
}

export function buildManyProfessionalServices(
  count: number,
  overrides?: Partial<IProfessionalService> & ProfessionalServiceFactoryOptions
) {
  return Array.from({ length: count }, () => buildProfessionalService(overrides));
}

export const ProfessionalServiceFactory = {
  build: buildProfessionalService,
  buildMany: buildManyProfessionalServices,
  create: createProfessionalService,
  createMany: createManyProfessionalServices,
};
