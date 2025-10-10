import { Districts } from "@/lib/cities/types/cities.schema";
import { z } from "zod";
import { IProfessionalService } from "../models/ProfessionalService";
import { SerializedUser } from "@/lib/auth/types/auth.scema";
import { SerializeServiceCategory, SerializeServiceSubCategory } from "@/lib/service-categories/types/service-categories.types";

export const SIZE_IN_MB = 5;
export const MAX_FILE_SIZE = SIZE_IN_MB * 1024 * 1024;
export const MAX_FILES = 5;

export const ACCEPTED_FILE_TYPES = [
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/webp",
];

export const ProfessionalServiceSchema = z.object({
  category: z.string({
    required_error: "Выберите категорию",
  }),
  subCategory: z.string({
    required_error: "Выберите подкатегорию",
  }),
  district: z.nativeEnum(Districts, {
    required_error: "Выберите район",
  }),
  city: z.string({
    required_error: "Выберите город",
  }),
  description: z.string({
    required_error: "Введите описание",
  }),
  email: z
    .string({
      required_error: "электронное почта обязательная",
    })
    .email("Введите корректный адрес электронной почты"),
  areaCode: z.number(),
  phoneNumber: z.number({
    required_error: "Телефон обязателен. Используйте только цифры",
  }),
  acceptTerms: z
    .string({
      required_error: "Вы должны согласиться с условиями",
    })
    .optional()
    .superRefine((value, ctx) => {
      if (value === "on") {
        return true;
      }
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Вы должны согласиться с условиями",
        fatal: true,
      });
      return z.NEVER;
    }),
  images: z
    .array(z.instanceof(File))
    .min(1, "Загрузите хотя бы одно изображение")
    .superRefine((files, ctx) => {
      if (files.length > MAX_FILES) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `Максимальное количество изображений: ${MAX_FILES}`,
          fatal: true,
        });
        return z.NEVER;
      }

      files.forEach((file) => {
        if (file.size > MAX_FILE_SIZE) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `Файл слишком большой. Максимальный размер файла ${SIZE_IN_MB}MB`,
          });
        }
        if (!new Set(ACCEPTED_FILE_TYPES).has(file.type)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `Файл должен быть изображением (PNG, JPEG, JPG или WebP)`,
            fatal: true,
          });
          return z.NEVER;
        }
      });
      return true;
    }),
});

// export const ProfessionalServiceSchemaGET = ProfessionalServiceSchema.omit({
//   images: true,
// }).extend({
//   id: z.string(),
//   createdAt: z.string(),
//   updatedAt: z.string(),
//   images: z.array(ImageSchema),
// });

export const ServiceSubCategorySchema = z.object({
  id: z.string(),
  key: z.string(),
  displayName: z.string(),
  description: z.string(),
  russianDisplayName: z.string(),
  russianDescription: z.string(),
  serviceCategory: z.string(),
  serviceCategoryKey: z.string(),
  updatedAt: z.string(),
  createdAt: z.string(),
});

export const ServiceCategorySchema = z.object({
  id: z.string(),
  key: z.string(),
  displayName: z.string(),
  description: z.string(),
  russianDisplayName: z.string(),
  russianDescription: z.string(),
  updatedAt: z.string(),
  createdAt: z.string(),
});

export interface SerilizeProfessionalService
  extends Omit<IProfessionalService, "createdAt" | "updatedAt" | "user"> {
  updatedAt: string;
  createdAt: string;
  user: SerializedUser;
}

export type ServiceSubCategory = z.infer<typeof ServiceSubCategorySchema>;
export type ServiceCategory = z.infer<typeof ServiceCategorySchema>;
export type ProfessionalService = z.infer<typeof ProfessionalServiceSchema>;
// export type ProfessionalGET = z.infer<typeof ProfessionalSchemaGET>;

export type ServiceCategoryMapping = Record<
  ServiceCategory["id"],
  {
    category: SerializeServiceCategory;
    subCategories: SerializeServiceSubCategory[];
  }
>;
