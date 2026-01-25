import { PriceFromToSchema } from "@/lib/common/types/common.types";
import { z } from "zod";

export const CommercialRealEstateFilterSchema = z.object({
  ...PriceFromToSchema.shape,
  squaremeterFrom: z
    .string()
    .optional()
    .refine((val) => val == null || /^-?\d[\d,]*$/.test(val), {
      message: "Площадь должна быть числом.",
    })
    .transform((val) => {
      if (val == null) return undefined;
      const cleaned = val.replace(/,/g, "");
      const num = Number(cleaned);
      return isNaN(num) ? undefined : num;
    }),
  squaremeterTo: z
    .string()
    .optional()
    .refine((val) => val == null || /^-?\d[\d,]*$/.test(val), {
      message: "Площадь должна быть числом.",
    })
    .transform((val) => {
      if (val == null) return undefined;
      const cleaned = val.replace(/,/g, "");
      const num = Number(cleaned);
      return isNaN(num) ? undefined : num;
    }),
  textSearch: z.string().optional(),
});

export type CommercialRealEstateFilter = z.infer<
  typeof CommercialRealEstateFilterSchema
>;
