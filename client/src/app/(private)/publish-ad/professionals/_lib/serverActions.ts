"use server";
import { parseWithZod } from "@conform-to/zod";
import { ProfessionalSchema } from "./validations/professionalMutationSchema";
import {
  SubmissionResultWithErrorsState,
  ActionWrapperOptions,
  ServerError,
} from "@/fetch/fetch.types";
import { Professional } from "./types";
import { customFetch } from "@/fetch/server";
import { ServerErrorType } from "@sima-board/common";
import { revalidatePath } from "next/cache";

export const professionalsMutateActionWrapper = async (
  prevState: unknown,
  formData: FormData
) => {
  return createProfessionalsAction(prevState, formData, {
    url: "/api/professionals",
    schema: ProfessionalSchema,
  });
};

export const createProfessionalsAction = async (
  prevState: unknown,
  formData: FormData,
  { url, schema }: ActionWrapperOptions
): Promise<SubmissionResultWithErrorsState<{ professional: Professional }>> => {
  const submissionResult = parseWithZod(formData, {
    schema,
  }).reply();
  console.log("submissionResult.status", submissionResult.status);

  if (submissionResult.status !== "success") {
    return {
      ...submissionResult,
    };
  }

  try {
    const response = await customFetch<Professional, ServerError>(url, {
      headers: {
        Accept: "application/json",
      },
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      return {
        ...submissionResult,
        isErrorFromTheServer: true,
        serverError: errorResponse?.errors || "An error occurred",
        errorType: errorResponse?.errorType,
      };
    }

    const professional = await response.json();
    const successResponse = {
      ...submissionResult,
      isSuccess: true,
      data: {
        professional,
      },
    };
    return successResponse;
  } catch (error) {
    return {
      ...submissionResult,
      isErrorFromTheServer: true,
      serverError: [{ message: (error as Error).message }],
      errorType: ServerErrorType.BadRequest,
    };
  }
};

export const revalidateProfessionals = () => {
  "use server";
  revalidatePath("/professionals/all", "page");
};
