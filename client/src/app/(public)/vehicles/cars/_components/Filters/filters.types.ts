import { PriceFromToSchema } from "@/lib/common/types/common.types";
import { z } from "zod";


export const CarFilterSchema = z.object({
    ...PriceFromToSchema.shape,
    color: z.string().optional(),
});

export type CarFilter = z.infer<typeof CarFilterSchema>;