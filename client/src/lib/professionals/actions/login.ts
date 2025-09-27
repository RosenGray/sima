import { parseWithZod } from "@conform-to/zod";
import { ProfessionalSchema } from "../types/professionals.scema";


export async function createProfessional(initialState: unknown, formData: FormData) {
  const result = parseWithZod(formData, { schema: ProfessionalSchema });
  if (result.status !== "success") return result.reply();


}
