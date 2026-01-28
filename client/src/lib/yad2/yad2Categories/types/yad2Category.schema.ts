import { z } from "zod";

export const Yad2SubCategorySchema = z.object({
  id: z.string(),
  name: z.string(),
  russianName: z.string(),
});

export const Yad2CategorySchema = z.object({
  id: z.string(),
  name: z.string(),
  russianName: z.string(),
  subCategories: z.array(Yad2SubCategorySchema),
});

export type Yad2SubCategory = z.infer<typeof Yad2SubCategorySchema>;
export type Yad2Category = z.infer<typeof Yad2CategorySchema>;
export type Yad2CategoryId = Yad2Category["id"];
export type Yad2SubCategoryId = Yad2SubCategory["id"];
