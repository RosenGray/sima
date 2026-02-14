import { Districts } from "@/lib/cities/types/cities.schema";
import { z } from "zod";

export const SIZE_IN_MB = 5;
export const MAX_FILE_SIZE = SIZE_IN_MB * 1024 * 1024;
export const MAX_GALLERY_FILES = 10;

export const ACCEPTED_FILE_TYPES = [
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/webp",
];

const fileRefine = (file: File, ctx: z.RefinementCtx) => {
  if (file.size > MAX_FILE_SIZE) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: `Файл слишком большой. Максимальный размер ${SIZE_IN_MB} МБ`,
    });
  }
  if (!ACCEPTED_FILE_TYPES.includes(file.type)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Файл должен быть изображением (PNG, JPEG, JPG или WebP)",
    });
  }
};

export const createProfessionalPageSchema = (options?: {
  minGalleryImages?: number;
}) => {
  const minGalleryImages = options?.minGalleryImages ?? 0;

  return z.object({
    displayName: z
      .string({ required_error: "Введите имя" })
      .min(1, "Введите имя"),
    description: z
      .string({ required_error: "Введите описание" })
      .min(1, "Введите описание"),
    slug: z
      .string()
      .optional()
      .refine(
        (v) =>
          v === undefined ||
          v === "" ||
          /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(v),
        "Только латиница, цифры и дефис (например: ivanov-ivan)"
      )
      .transform((v) => (v === "" ? undefined : v)),
    profileImage: z
      .instanceof(File)
      .optional()
      .superRefine((file, ctx) => {
        if (file && file.size > 0 && file.name !== "undefined") {
          fileRefine(file, ctx);
        }
      }),
    galleryImages: z
      .array(z.instanceof(File))
      .min(
        minGalleryImages,
        minGalleryImages === 1
          ? "Загрузите хотя бы одно изображение в галерею"
          : undefined
      )
      .superRefine((files, ctx) => {
        const valid = files.filter(
          (f) => f.size > 0 && f.name !== "undefined"
        );
        if (valid.length > MAX_GALLERY_FILES) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `Максимум изображений в галерее: ${MAX_GALLERY_FILES}`,
          });
        }
        valid.forEach((file) => fileRefine(file, ctx));
      }),
    category: z.string().optional(),
    subCategory: z.string().optional(),
    district: z.nativeEnum(Districts).optional(),
    city: z.string().optional(),
    contactPhone: z.string().optional(),
    contactEmail: z
      .string()
      .optional()
      .refine(
        (v) =>
          v === undefined ||
          v === "" ||
          /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
        "Введите корректный email"
      )
      .transform((v) => (v === "" ? undefined : v)),
    whatsapp: z.string().optional(),
    instagram: z.string().optional(),
    facebook: z.string().optional(),
    website: z.string().optional(),
    isPublished: z
      .string()
      .optional()
      .transform((v) => v === "on"),
    acceptTerms: z
      .string()
      .optional()
      .superRefine((value, ctx) => {
        if (value !== "on") {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Необходимо согласие с условиями",
            fatal: true,
          });
        }
      }),
  });
};

export type ProfessionalPageFormSchema = z.infer<
  ReturnType<typeof createProfessionalPageSchema>
>;
