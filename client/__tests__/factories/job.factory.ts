import { faker } from "@faker-js/faker";
import { Job } from "@/lib/jobs/models/Job";
import { IJob, SerializedJob } from "@/lib/jobs/types/job.types";
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

const JOB_TITLES = [
  "Разработчик программного обеспечения",
  "Менеджер по продажам",
  "Бухгалтер",
  "Учитель",
  "Врач",
  "Инженер",
  "Дизайнер",
  "Маркетолог",
  "Консультант",
  "Администратор",
];

function createMockImage(index: number = 0): FileUploadItem {
  return {
    id: nanoid(10),
    originalName: `job-image-${index + 1}.jpg`,
    uniqueName: `${nanoid(20)}-job-image-${index + 1}.jpg`,
    url: `https://example.com/jobs/test-user/job-image-${index + 1}.jpg`,
    fieldname: "files",
    versionId: nanoid(10),
    folderName: "jobs",
  };
}

interface JobFactoryOptions {
  user?: SerializedUser | mongoose.Types.ObjectId;
  images?: FileUploadItem[];
}

export function buildJob(
  overrides?: Partial<IJob> & JobFactoryOptions
): Omit<SerializedJob, "user" | "createdAt" | "updatedAt"> & {
  user: SerializedUser | mongoose.Types.ObjectId;
} {
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
        : overrides?.user ?? new mongoose.Types.ObjectId(),
    title: overrides?.title ?? faker.helpers.arrayElement(JOB_TITLES),
    district: overrides?.district ?? faker.helpers.arrayElement(DISTRICTS),
    city: overrides?.city ?? faker.helpers.arrayElement(CITIES),
    description:
      overrides?.description ?? faker.lorem.paragraphs(3, "\n"),
    contactName:
      overrides?.contactName ??
      `${faker.person.firstName()} ${faker.person.lastName()}`,
    contactPrimaryPhone:
      overrides?.contactPrimaryPhone ?? faker.phone.number("05#-###-####"),
    contactSecondaryPhone:
      overrides?.contactSecondaryPhone ??
      (faker.datatype.boolean() ? faker.phone.number("05#-###-####") : undefined),
    contactEmail: overrides?.contactEmail ?? faker.internet.email(),
    acceptTerms: overrides?.acceptTerms ?? true,
    images,
  };
}

export async function createJob(
  overrides?: Partial<IJob> & JobFactoryOptions
): Promise<SerializedJob> {
  const jobData = buildJob(overrides);
  const userObjectId =
    jobData.user instanceof mongoose.Types.ObjectId
      ? jobData.user
      : new mongoose.Types.ObjectId(jobData.user.id);

  const job = new Job({
    ...jobData,
    user: userObjectId,
  });
  await job.populate("user");
  await job.save();

  return JSON.parse(JSON.stringify(job)) as SerializedJob;
}

export async function createManyJobs(
  count: number,
  overrides?: Partial<IJob> & JobFactoryOptions
): Promise<SerializedJob[]> {
  const jobs: SerializedJob[] = [];
  const batchSize = 50;
  for (let i = 0; i < count; i += batchSize) {
    const batchCount = Math.min(batchSize, count - i);
    const batch = await Promise.all(
      Array.from({ length: batchCount }, () => createJob(overrides))
    );
    jobs.push(...batch);
  }
  return jobs;
}

export function buildManyJobs(
  count: number,
  overrides?: Partial<IJob> & JobFactoryOptions
) {
  return Array.from({ length: count }, () => buildJob(overrides));
}

export const JobFactory = {
  build: buildJob,
  buildMany: buildManyJobs,
  create: createJob,
  createMany: createManyJobs,
};
