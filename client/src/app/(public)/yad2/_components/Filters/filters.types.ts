import { z } from "zod";
import { PriceFromToSchema } from "@/lib/common/types/common.types";

// Combine multiple schemas if needed
export const Yad2FilterSchema = z.object({
  ...PriceFromToSchema.shape, // Includes priceFrom and priceTo with comma formatting
  textSearch: z.string().optional(), // Free text search
});

export type Yad2Filter = z.infer<typeof Yad2FilterSchema>;
