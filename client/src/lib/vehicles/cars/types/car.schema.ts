import { z } from "zod";
import { Districts } from "@/lib/cities/types/cities.schema";
import { EngineType, TransmissionType } from "./cars.types";

export const SIZE_IN_MB = 5;
export const MAX_FILE_SIZE = SIZE_IN_MB * 1024 * 1024;
export const MAX_FILES = 5;

export const ACCEPTED_FILE_TYPES = [
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/webp",
];

export const createCarSchema = ({ minNumberOfImages = 1 }) => {
  return z.object({
    manufacturer: z.string({
      required_error: "Выберите производителя",
    }),
    model: z.string({
      required_error: "Выберите модель",
    }),
    yearOfManufacture: z.coerce
      .number({
        required_error: "Введите год выпуска",
        invalid_type_error: "Год должен быть числом",
      })
      .min(1900, "Год должен быть не менее 1900"),
    numberOfHand: z.coerce
      .number({
        required_error: "Введите количество рук",
        invalid_type_error: "Количество рук должно быть числом",
      })
      .min(1, "Количество рук должно быть не менее 1"),
    transmission: z.nativeEnum(TransmissionType, {
      required_error: "Выберите тип коробки передач",
    }),
    engineType: z.nativeEnum(EngineType, {
      required_error: "Выберите тип двигателя",
    }),
    engineCapacity: z.coerce
      .number({
        invalid_type_error: "Объем двигателя должен быть числом",
      })
      .optional(),
    mileage: z.coerce
      .number({
        invalid_type_error: "Пробег должен быть числом",
      })
      .min(0, "Пробег не может быть отрицательным")
      .optional(),
    numberOfDoors: z.coerce
      .number({
        invalid_type_error: "Количество дверей должно быть числом",
      })
      .optional(),
    color: z.string().optional(),
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
    description: z.string({
      required_error: "Введите описание",
    }),
    accessories: z.string().optional(),
    district: z.nativeEnum(Districts, {
      required_error: "Выберите район",
    }),
    city: z.string({
      required_error: "Выберите город",
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
        return true;
      }),
  });
};

export type CarFormData = z.infer<ReturnType<typeof createCarSchema>>;
