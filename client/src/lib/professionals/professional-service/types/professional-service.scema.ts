import { Districts } from "@/lib/cities/types/cities.schema";
import { z } from "zod";
import { IProfessionalService } from "../models/ProfessionalService";
import { SerializedUser } from "@/lib/auth/types/auth.scema";
import {
  SerializeServiceCategory,
  SerializeServiceSubCategory,
} from "@/lib/service-categories/types/service-categories.types";

export const SIZE_IN_MB = 5;
export const MAX_FILE_SIZE = SIZE_IN_MB * 1024 * 1024;
export const MAX_FILES = 5;

export const ACCEPTED_FILE_TYPES = [
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/webp",
];

export const createProfessionalServiceSchema = ({ minNumberOfImages = 1 }) => {
  return z.object({
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
    // areaCode: z.number(),
    phoneNumber: z.string({
      required_error: "Телефон обязателен. Используйте только цифры",
    }).regex(/^[0-9]+$/, "Телефон может содержать только цифры"),
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
    acceptPersonalPage: z.string().optional(),
    slug: z.string().optional(),
    images: z
      .array(z.instanceof(File))
      .min(
        minNumberOfImages,
        `Загрузите хотя бы ${minNumberOfImages} изображений`
      )
      .superRefine((files, ctx) => {
        const validFiles = files.filter(
          (file) => file.size > 0 && file.name !== "undefined"
        );
        if (validFiles.length > 0) {
          if (files.length > MAX_FILES) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: `Максимальное количество изображений: ${MAX_FILES}`,
              fatal: true,
            });
            return z.NEVER;
          }

          validFiles.forEach((file) => {
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
        }
        return true;
      }),
  });
};

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
  extends Omit<
    IProfessionalService,
    "createdAt" | "updatedAt" | "user" | "category" | "subCategory"
  > {
  updatedAt: string;
  createdAt: string;
  user: SerializedUser;
  category: SerializeServiceCategory;
  subCategory: SerializeServiceSubCategory;
}

export type ServiceSubCategory = z.infer<typeof ServiceSubCategorySchema>;
export type ServiceCategory = z.infer<typeof ServiceCategorySchema>;
export type ProfessionalService = z.infer<
  ReturnType<typeof createProfessionalServiceSchema>
>;
// export type ProfessionalGET = z.infer<typeof ProfessionalSchemaGET>;

export type ServiceCategoryMapping = Record<
  ServiceCategory["id"],
  {
    category: SerializeServiceCategory;
    subCategories: SerializeServiceSubCategory[];
  }
>;
