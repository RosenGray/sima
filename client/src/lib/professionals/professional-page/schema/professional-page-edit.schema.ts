import { Districts } from "@/lib/cities/types/cities.schema";
import { z } from "zod";

const SIZE_IN_MB = 5;
export const MAX_FILE_SIZE = SIZE_IN_MB * 1024 * 1024;
export const MAX_GALLERY_FILES = 15;

const ACCEPTED_FILE_TYPES = [
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/webp",
];

const fileRefine = (files: File[], ctx: z.RefinementCtx, maxFiles: number) => {
  const validFiles = files.filter(
    (file) => file.size > 0 && file.name !== "undefined"
  );
  if (validFiles.length > 0) {
    if (files.length > maxFiles) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `Максимальное количество: ${maxFiles}`,
        fatal: true,
      });
      return;
    }
    validFiles.forEach((file) => {
      if (file.size > MAX_FILE_SIZE) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `Файл слишком большой. Максимальный размер ${SIZE_IN_MB} МБ`,
        });
      }
      if (!new Set(ACCEPTED_FILE_TYPES).has(file.type)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Файл должен быть изображением (PNG, JPEG, JPG или WebP)",
          fatal: true,
        });
      }
    });
  }
};

export function createProfessionalPageEditSchema(opts: {
  minGalleryImages: number;
}) {
  const { minGalleryImages } = opts;
  return z.object({
    displayName: z
      .string({ required_error: "Введите имя для отображения" })
      .min(1, "Введите имя для отображения"),
    description: z
      .string({ required_error: "Введите описание" })
      .min(1, "Введите описание"),
    profileImage: z.union([
      z.instanceof(File),
      z.literal(""),
      z.undefined(),
      z.null(),
    ]).optional().nullable().transform((val) => {
      if (val instanceof File && val.size > 0 && val.name !== "undefined") return val;
      return undefined;
    }).refine(
      (file) => !file || (file.size <= MAX_FILE_SIZE && new Set(ACCEPTED_FILE_TYPES).has(file.type)),
      "Файл должен быть изображением до 5 МБ"
    ),
    galleryImages: z
      .array(z.instanceof(File))
      .min(
        minGalleryImages,
        minGalleryImages === 1
          ? "Загрузите хотя бы одно изображение в галерею"
          : "Заполните галерею или оставьте существующие фото"
      )
      .superRefine((files, ctx) => {
        fileRefine(files, ctx, MAX_GALLERY_FILES);
      }),
    category: z.string().optional(),
    subCategory: z.string().optional(),
    district: z.nativeEnum(Districts).optional(),
    city: z.string().optional(),
    contactPhone: z
      .string()
      .optional()
      .refine(
        (val) => !val || /^[0-9]+$/.test(val),
        "Телефон может содержать только цифры"
      ),
    contactEmail: z
      .string()
      .optional()
      .refine((val) => !val || z.string().email().safeParse(val).success, "Введите корректный email"),
    whatsapp: z.string().optional(),
    instagram: z.string().optional(),
    facebook: z.string().optional(),
    website: z.string().optional(),
    isPublished: z
      .string()
      .optional()
      .transform((val) => val === "on"),
  });
}

export type ProfessionalPageEditSchema = z.infer<
  ReturnType<typeof createProfessionalPageEditSchema>
>;
