"use server";
import { redirect } from "next/navigation";
import { cookies as nextCookies } from "next/headers";
import { parseWithZod } from "@conform-to/zod";
import { loginSchema, registerSchema } from "../validations";
import { parse } from "set-cookie-parser";
import { SubmissionResultWithErrorsState } from "@/fetch/fetch.types";
import { customFetch } from "@/fetch";
import { z } from "zod";
import { ServerErrorType } from "@sima-board/common";

export const registerActionWrapper = async (
  prevState: unknown,
  formData: FormData
) => {
  return authUser(prevState, formData, {
    url: "/api/users/register",
    schema: registerSchema,
  });
};

export const loginActionWrapper = async (
  prevState: unknown,
  formData: FormData
) => {
  return authUser(prevState, formData, {
    url: "/api/users/login",
    schema: loginSchema,
  });
};

export const authUser = async (
  prevState: unknown,
  formData: FormData,
  {
    url,
    schema,
  }: {
    url: string;
    schema: z.ZodType<Record<string, unknown>>;
  }
): Promise<SubmissionResultWithErrorsState> => {
  const submissionResult = parseWithZod(formData, {
    schema,
  }).reply();

  if (submissionResult.status !== "success") {
    return {
      ...submissionResult,
    };
  }

  try {
    const response = await customFetch(url, {
      headers: {
        Accept: "application/json",
      },
      credentials: "include",
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      return {
        ...submissionResult,
        isErrorFromTheServer: true,
        serverError: errorResponse?.errors || "An error occurred",
        errorType:
          errorResponse?.errorType || ServerErrorType.AuthWrongPasswordOrEmail,
      };
    }

    const setCookieHeader = response.headers.get("set-cookie");
    if (setCookieHeader) {
      const cookies = parse(setCookieHeader, {
        decodeValues: true,
      });
      const simaAuthSession = cookies.find(
        (cookie) => cookie.name === "sima-auth-session"
      );
      if (simaAuthSession) {
        nextCookies().set({
          name: simaAuthSession.name,
          value: simaAuthSession.value,
          httpOnly: simaAuthSession.httpOnly,
        });
      }
    }
    return {
      ...submissionResult,
      isSuccess: true,
    };
  } catch (error) {
    return {
      ...submissionResult,
      isErrorFromTheServer: true,
      serverError: {
        errors: [{ message: (error as Error).message }],
        errorType: ServerErrorType.BadRequest,
      },
      errorType: ServerErrorType.BadRequest,
    };
  }
};
