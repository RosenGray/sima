import { PriceFromToSchema } from "@/lib/common/types/common.types";
import { z } from "zod";

export const ScooterFilterSchema = z.object({
  ...PriceFromToSchema.shape,
});

export type ScooterFilter = z.infer<typeof ScooterFilterSchema>;
