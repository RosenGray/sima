import { z } from "zod";
import { Districts } from "@/lib/cities/types/cities.schema";
import {
  DealKind,
  CommercialPropertyKind,
} from "./commercialRealEstate.types";

const validDealKindValues = Object.values(DealKind).filter(
  (v): v is DealKind => typeof v === "number"
);
const validCommercialPropertyKindValues = Object.values(
  CommercialPropertyKind
).filter(
  (v): v is CommercialPropertyKind => typeof v === "number"
);

export const SIZE_IN_MB = 5;
export const MAX_FILE_SIZE = SIZE_IN_MB * 1024 * 1024;
export const MAX_FILES = 10;

export const ACCEPTED_FILE_TYPES = [
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/webp",
];

export const createCommercialRealEstateSchema = ({
  minNumberOfImages = 1,
}) => {
  return z.object({
    dealKind: z.coerce
      .number({
        required_error: "Выберите тип сделки",
        invalid_type_error: "Тип сделки должен быть числом",
      })
      .refine((val) => validDealKindValues.includes(val), {
        message: "Неверное значение типа сделки",
      }),
    propertyKind: z.coerce
      .number({
        required_error: "Выберите тип недвижимости",
        invalid_type_error: "Тип недвижимости должен быть числом",
      })
      .refine((val) => validCommercialPropertyKindValues.includes(val), {
        message: "Неверное значение типа недвижимости",
      }),
    district: z.nativeEnum(Districts, {
      required_error: "Выберите район",
    }),
    city: z.string({
      required_error: "Выберите город",
    }),
    streetname: z.string({
      required_error: "Введите название улицы",
    }),
    squaremeter: z.coerce
      .number({
        required_error: "Введите площадь",
        invalid_type_error: "Площадь должна быть числом",
      })
      .min(0, "Площадь не может быть отрицательной"),
    additionalFeatures: z.array(z.coerce.number()).optional(),
    description: z.string({
      required_error: "Введите описание",
    }),
    price: z
      .string({
        required_error: "Введите цену",
      })
      .refine((val) => /^-?\d[\d,]*$/.test(val), {
        message: "Цена должна быть числом, содержащим запятые.",
      })
      .transform((val) => {
        const cleaned = val.replace(/,/g, "");
        const num = Number(cleaned);
        return num;
      }),
    contactName: z.string({
      required_error: "Введите имя контакта",
    }),
    contactPrimaryPhone: z
      .string({
        required_error:
          "Введите основной телефон,Телефон может содержать только цифры",
      })
      .regex(/^[0-9]+$/, "Телефон может содержать только цифры"),
    contactSecondaryPhone: z
      .string({
        required_error: "Введите дополнительный телефон",
      })
      .regex(/^[0-9]+$/, "Телефон может содержать только цифры ")
      .optional(),
    contactEmail: z
      .string({
        required_error: "Электронная почта обязательна",
      })
      .email("Введите корректный адрес электронной почты"),
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
      }),
  });
};

export type CommercialRealEstateFormData = z.infer<
  ReturnType<typeof createCommercialRealEstateSchema>
>;
