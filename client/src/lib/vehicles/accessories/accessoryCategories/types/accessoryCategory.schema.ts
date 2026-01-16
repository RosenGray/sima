import { z } from "zod";

export const AccessoryKindSchema = z.object({
  id: z.string(),
  name: z.string(),
  russianName: z.string(),
});

export const AccessoryCategorySchema = z.object({
  id: z.string(),
  name: z.string(),
  russianName: z.string(),
  models: z.array(AccessoryKindSchema),
});

export type AccessoryKind = z.infer<typeof AccessoryKindSchema>;
export type AccessoryCategory = z.infer<typeof AccessoryCategorySchema>;
export type AccessoryCategoryId = AccessoryCategory["id"];
export type AccessoryKindId = AccessoryKind["id"];
