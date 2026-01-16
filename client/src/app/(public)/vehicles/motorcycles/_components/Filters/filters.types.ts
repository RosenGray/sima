import { PriceFromToSchema } from "@/lib/common/types/common.types";
import { z } from "zod";

export const MotorcycleFilterSchema = z.object({
  ...PriceFromToSchema.shape,
});

export type MotorcycleFilter = z.infer<typeof MotorcycleFilterSchema>;
