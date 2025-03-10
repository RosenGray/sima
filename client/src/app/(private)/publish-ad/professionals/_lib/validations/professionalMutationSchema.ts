import { Districts } from "@/types/cities";
import { z } from "zod";

export const SIZE_IN_MB = 5;
export const MAX_FILE_SIZE = SIZE_IN_MB * 1024 * 1024;
export const MAX_FILES = 5;
export const ProfessionalSchema = z.object({
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
  images: z
    .array(
      z.instanceof(File)
      // .refine((file) => file.size < 1024, "File size must be less than 1kb")
    )
    .min(1, "At least 1 file is required"),
  // .refine(
  //   (files) => files.every((file) => file.size < 1024),
  //   "File size must be less than 1kb"
  // ),
  // images: z.array(z.instanceof(File)).superRefine((files, ctx) => {
  //   if (files.length === 0) {
  //     ctx.addIssue({
  //       code: z.ZodIssueCode.custom,
  //       message: `Загрузите хотя бы одно изображение`,
  //       fatal: true,
  //     });
  //     return z.NEVER;
  //   }
  //   if (files.length > MAX_FILES) {
  //     ctx.addIssue({
  //       code: z.ZodIssueCode.custom,
  //       message: `Максимальное количество изображений: ${MAX_FILES}`,
  //       fatal: true,
  //     });
  //     return z.NEVER;
  //   }
  //   console.log("files", files);
  //   files.forEach((file) => {
  //     if (file.size > MAX_FILE_SIZE) {
  //       ctx.addIssue({
  //         code: z.ZodIssueCode.custom,
  //         message: `Файл слишком большой. Максимальный размер файла ${SIZE_IN_MB}MB`,
  //         fatal: true,
  //       });
  //       return z.NEVER;
  //     }
  //     if (
  //       !new Set(["image/png", "image/jpeg", "image/jpg", "image/webp"]).has(
  //         file.type
  //       )
  //     ) {
  //       ctx.addIssue({
  //         code: z.ZodIssueCode.custom,
  //         message: `Файл должен быть изображением (PNG, JPEG, JPG или WebP)`,
  //         fatal: true,
  //       });
  //       return z.NEVER;
  //     }
  //   });
  //   return true;
  // }),
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
      console.log("value acceptTerms", value);
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
});

export const ProfessionalSchemaGET = ProfessionalSchema.extend({
  id: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});
