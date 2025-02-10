"use server";

import { parseWithZod } from "@conform-to/zod";
import { professionalMutationSchema } from "./validations/professionalMutationSchema";
import { SubmissionResultWithErrorsState } from "@/fetch/fetch.types";

export const professionalsMutateAction = async (
  prevState: unknown,
  formData: FormData
): Promise<SubmissionResultWithErrorsState> => {
  const submissionResult = parseWithZod(formData, {
    schema: professionalMutationSchema,
  }).reply();

  if (submissionResult.status !== "success") {
    return {
      ...submissionResult,
    };
  }

  return {
    isErrorFromTheServer: false,
    isSuccess: false,
  };
};
