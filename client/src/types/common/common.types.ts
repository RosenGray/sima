import { z } from "zod";

export const ImageSchema = z.object({
    src: z.string(),
    fileName: z.string(),
    versionId: z.string().optional(),
  });

export type Image = z.infer<typeof ImageSchema>;

  