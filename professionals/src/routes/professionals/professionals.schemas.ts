import { z } from "zod";
export const SIZE_IN_MB = 5;
export const MAX_FILE_SIZE = SIZE_IN_MB * 1024 * 1024;
export const MAX_FILES = 5;
export const addProfessionalSchema = z.object({
  category: z.string().min(1),
  subCategory: z.string().min(1),
  area: z.string().min(1),
  city: z.string().min(1),
  description: z.string().min(1),
  email: z.string().email(),
  phoneNumber: z.string().min(1),
  acceptTerms: z.coerce.boolean().refine((data) => data === true, {
    message: "You must accept the terms and conditions",
  }),
  images: z.custom<Express.Multer.File[]>().superRefine((files, ctx) => {
    console.log(files.length);
    if (!files) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `Загрузите хотя бы одно изображение`,
        fatal: true,
      });
      return z.NEVER;
    }
    if (files.length > 5) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `Максимальное количество изображений: 2`,
        fatal: true,
      });
      return z.NEVER;
    }
    files.forEach((file) => {
      if (file.size > MAX_FILE_SIZE) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `Файл слишком большой. Максимальный размер файла ${SIZE_IN_MB}MB`,
          fatal: true,
        });
        return z.NEVER;
      }

      if (
        !new Set(["image/png", "image/jpeg", "image/jpg", "image/webp"]).has(
          file.mimetype
        )
      ) {
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

export type AddProfessional = z.infer<typeof addProfessionalSchema>;
