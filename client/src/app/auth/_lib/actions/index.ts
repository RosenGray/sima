"use server";
import { redirect } from "next/navigation";
import { parseWithZod } from "@conform-to/zod";
import {loginSchema} from '../validations'



export const createUser = async (
  prevState: unknown,
  formData: FormData
) => {
  console.log("form data:", formData.get("firstName"));
  const submission = parseWithZod(formData, {
    schema: loginSchema,
  });
  console.log('submission',submission)

  if (submission.status !== 'success') {
    return submission.reply();
  }

  //some auth staff
  console.log("auth user");
  // return redirect("/about");
};
