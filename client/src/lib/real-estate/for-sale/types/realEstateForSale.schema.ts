import { z } from "zod";
import { Districts } from "@/lib/cities/types/cities.schema";
import {
  PropertyKind,
  AirConditioning,
  Parking,
  Furniture,
  EntryDate,
} from "./realEstateForSale.types";

export const SIZE_IN_MB = 5;
export const MAX_FILE_SIZE = SIZE_IN_MB * 1024 * 1024;
export const MAX_FILES = 10;

export const ACCEPTED_FILE_TYPES = [
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/webp",
];

// Generate numberOfRooms options: [1, 1.5, 2, 2.5, ... 10]
export const NUMBER_OF_ROOMS_OPTIONS = Array.from({ length: 19 }, (_, i) => {
  return i % 2 === 0 ? i / 2 + 1 : (i - 1) / 2 + 1.5;
});

// Generate year options: current year to current + 10
export const getYearOptions = () => {
  const currentYear = new Date().getFullYear();
  return Array.from({ length: 11 }, (_, i) => currentYear + i);
};

// Generate month options: 1-12
export const MONTH_OPTIONS = Array.from({ length: 12 }, (_, i) => i + 1);

// Generate day options: 1-31
export const DAY_OPTIONS = Array.from({ length: 31 }, (_, i) => i + 1);

// Generate floor/totalflors options: -1 to 50
export const FLOOR_OPTIONS = Array.from({ length: 52 }, (_, i) => i - 1);

// Generate balcony options: 0-4
export const BALCONY_OPTIONS = Array.from({ length: 5 }, (_, i) => i);

export const createRealEstateForSaleSchema = ({
  minNumberOfImages = 1,
}) => {
  return z.object({
    propertyKind: z.coerce
      .number({
        required_error: "Выберите тип недвижимости",
        invalid_type_error: "Тип недвижимости должен быть числом",
      })
      .refine(
        (val) => val === PropertyKind.Apartment || val === PropertyKind.Loft,
        {
          message: "Неверное значение типа недвижимости",
        }
      ),
    district: z.nativeEnum(Districts, {
      required_error: "Выберите район",
    }),
    city: z.string({
      required_error: "Выберите город",
    }),
    streetname: z.string({
      required_error: "Введите название улицы",
    }),
    numberOfRooms: z.coerce
      .number({
        required_error: "Выберите количество комнат",
        invalid_type_error: "Количество комнат должно быть числом",
      })
      .refine((val) => NUMBER_OF_ROOMS_OPTIONS.includes(val), {
        message: "Неверное значение количества комнат",
      }),
    airconditioning: z.coerce
      .number({
        required_error: "Выберите кондиционер",
        invalid_type_error: "Кондиционер должен быть числом",
      })
      .refine(
        (val) =>
          val === AirConditioning.None ||
          val === AirConditioning.InRooms ||
          val === AirConditioning.InRoomsAndLivingRoom ||
          val === AirConditioning.InLivingRoom ||
          val === AirConditioning.Central ||
          val === AirConditioning.MiniCentral ||
          val === AirConditioning.Split,
        {
          message: "Неверное значение кондиционера",
        }
      ),
    balcony: z.coerce
      .number({
        required_error: "Выберите количество балконов",
        invalid_type_error: "Количество балконов должно быть числом",
      })
      .refine((val) => BALCONY_OPTIONS.includes(val), {
        message: "Неверное значение количества балконов",
      }),
    parking: z.coerce
      .number({
        required_error: "Выберите парковку",
        invalid_type_error: "Парковка должна быть числом",
      })
      .refine(
        (val) =>
          val === Parking.None ||
          val === Parking.InTheStreet ||
          val === Parking.Shared ||
          val === Parking.PayedParking ||
          val === Parking.PrivateCovered ||
          val === Parking.PrivateUncovered,
        {
          message: "Неверное значение парковки",
        }
      ),
    squaremeter: z.coerce
      .number({
        required_error: "Введите площадь",
        invalid_type_error: "Площадь должна быть числом",
      })
      .min(1, "Площадь должна быть не менее 1"),
    propertyTax: z.coerce
      .number({
        invalid_type_error: "Налог на недвижимость должен быть числом",
      })
      .min(0, "Налог на недвижимость не может быть отрицательным")
      .optional(),
    floor: z.coerce
      .number({
        required_error: "Выберите этаж",
        invalid_type_error: "Этаж должен быть числом",
      })
      .refine((val) => FLOOR_OPTIONS.includes(val), {
        message: "Неверное значение этажа",
      }),
    totalflors: z.coerce
      .number({
        required_error: "Выберите общее количество этажей",
        invalid_type_error: "Общее количество этажей должно быть числом",
      })
      .refine((val) => FLOOR_OPTIONS.includes(val), {
        message: "Неверное значение общего количества этажей",
      }),
    additionalFeatures: z.array(z.coerce.number()).optional(),
    furniture: z.coerce
      .number({
        required_error: "Выберите мебель",
        invalid_type_error: "Мебель должна быть числом",
      })
      .refine(
        (val) =>
          val === Furniture.None ||
          val === Furniture.Partial ||
          val === Furniture.Full,
        {
          message: "Неверное значение мебели",
        }
      ),
    furnitureDescription: z.string().optional(),
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
    year: z.coerce
      .number({
        required_error: "Выберите год",
        invalid_type_error: "Год должен быть числом",
      })
      .refine((val) => getYearOptions().includes(val), {
        message: "Неверное значение года",
      }),
    month: z.coerce
      .number({
        required_error: "Выберите месяц",
        invalid_type_error: "Месяц должен быть числом",
      })
      .refine((val) => MONTH_OPTIONS.includes(val), {
        message: "Неверное значение месяца",
      }),
    day: z.coerce
      .number({
        required_error: "Выберите день",
        invalid_type_error: "День должен быть числом",
      })
      .refine((val) => DAY_OPTIONS.includes(val), {
        message: "Неверное значение дня",
      }),
    entryDate: z.coerce
      .number({
        required_error: "Выберите дату въезда",
        invalid_type_error: "Дата въезда должна быть числом",
      })
      .refine(
        (val) => val === EntryDate.Immediate || val === EntryDate.Flexible,
        {
          message: "Неверное значение даты въезда",
        }
      ),
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

export type RealEstateForSaleFormData = z.infer<
  ReturnType<typeof createRealEstateForSaleSchema>
>;
