import { Districts } from "@/lib/cities/types/cities.schema";
import { z } from "zod";

export const SIZE_IN_MB = 5;
export const MAX_FILE_SIZE = SIZE_IN_MB * 1024 * 1024;
export const MAX_GALLERY_FILES = 5;
export const MAX_PROFILE_IMAGE_FILES = 1;
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
      .string({
        required_error: "Введите адрес страницы",
      })
      .refine(
        (v) => /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(v),
        "Только английские,строчные буквы, цифры и дефис (например: alex-katz)",
      ),
    slugPrefix: z.string({
      required_error: "Введите префикс slug",
    }),
    fullSlug: z.string({
      required_error: "Введите полный slug",
    }),
    profileImage: z
      .array(z.instanceof(File))
      .optional()
      .superRefine((files, ctx) => {
        if (files) {
          const valid = files.filter(
            (f) => f.size > 0 && f.name !== "undefined",
          );
          if (valid.length > MAX_GALLERY_FILES) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: `Максимум изображений в галерее: ${MAX_GALLERY_FILES}`,
            });
          }
          valid.forEach((file) => fileRefine(file, ctx));
        }
      }),
    galleryImages: z
      .array(z.instanceof(File))
      .min(
        minGalleryImages,
        minGalleryImages === 1
          ? "Загрузите хотя бы одно изображение в галерею"
          : undefined,
      )
      .superRefine((files, ctx) => {
        const valid = files.filter((f) => f.size > 0 && f.name !== "undefined");
        if (valid.length > MAX_GALLERY_FILES) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `Максимум изображений в галерее: ${MAX_GALLERY_FILES}`,
          });
        }
        valid.forEach((file) => fileRefine(file, ctx));
      }),
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
    contactPhone: z
      .string({
        required_error: "Телефон обязателен. Используйте только цифры",
      })
      .regex(/^[0-9]+$/, "Телефон может содержать только цифры"),
    contactEmail: z
      .string({
        required_error: "электронное почта обязательная",
      })
      .email("Введите корректный адрес электронной почты"),
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
