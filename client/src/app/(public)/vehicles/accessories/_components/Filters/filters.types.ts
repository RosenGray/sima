import { PriceFromToSchema } from "@/lib/common/types/common.types";
import { z } from "zod";

export const AccessoryFilterSchema = z.object({
  ...PriceFromToSchema.shape,
});

export type AccessoryFilter = z.infer<typeof AccessoryFilterSchema>;
