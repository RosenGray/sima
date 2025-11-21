import { z } from "zod";

type ImageItem = {
  id: string; // unique identifier
  url: string; // for display (object URL for File, S3 URL for existing)
  file?: File; // only present for new uploads
  metadata?: Record<string, unknown>; // S3 metadata for existing images
  isExisting: boolean; // flag to differentiate
};

export const yearFromToSchema = z.object({
  yearFrom: z.number().min(1900).max(new Date().getFullYear()).optional(),
  yearTo: z.number().min(1900).max(new Date().getFullYear()).optional(),
});

export const PriceFromToSchema = z.object({
  priceFrom: z
    .string()
    .optional()
    .refine((val) => val == null || /^-?\d[\d,]*$/.test(val), {
      message: "Price must be a numeric string, optionally containing commas.",
    })
    .transform((val) => {
      if (val == null) return undefined;
      // Remove commas and parse to number

      const cleaned = val.replace(/,/g, "");

      const num = Number(cleaned);

      return isNaN(num) ? undefined : num;
    }),
  priceTo: z
    .string()
    .optional()
    .refine((val) => val == null || /^-?\d[\d,]*$/.test(val), {
      message: "Price must be a numeric string, optionally containing commas.",
    })
    .transform((val) => {
      if (val == null) return undefined;
      // Remove commas and parse to number
      const cleaned = val.replace(/,/g, "");
      const num = Number(cleaned);
      return isNaN(num) ? undefined : num;
    }),
});

export type { ImageItem };
