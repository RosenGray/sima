"use server";
import { cookies as nextCookies } from "next/headers";
import { parseWithZod } from "@conform-to/zod";
import {
  loginSchema,
  registerSchema,
  resetPasswordConfirmSchema,
  resetPasswordSchema,
} from "../validations";
import { parse } from "set-cookie-parser";
import {
  ServerError,
  SubmissionResultWithErrorsState,
} from "@/fetch/fetch.types";

import { z } from "zod";
import { ServerErrorType } from "@sima-board/common";
import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { customFetch } from "@/fetch/server";
import { User } from "@/types/auth/auth.types";

export const registerActionWrapper = async (
  prevState: unknown,
  formData: FormData
) => {
  return authUser(prevState, formData, {
    url: "/api/auth/register",
    schema: registerSchema,
  });
};

export const loginActionWrapper = async (
  prevState: unknown,
  formData: FormData
) => {
  return authUser(prevState, formData, {
    url: "/api/auth/login",
    schema: loginSchema,
  });
};

export const resetPasswordActionWrapper = async (
  prevState: unknown,
  formData: FormData
) => {
  return resetPassword(prevState, formData, {
    url: "/api/auth/reset-password",
    schema: resetPasswordSchema,
  });
};

export const resetPasswordConfirmActionWrapper = async (
  prevState: unknown,
  formData: FormData
) => {
  return authUser(prevState, formData, {
    url: "/api/auth/reset-password/confirm",
    schema: resetPasswordConfirmSchema,
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
): Promise<
  SubmissionResultWithErrorsState<{ user: User; cookieData: ResponseCookie }>
> => {
  const submissionResult = parseWithZod(formData, {
    schema,
  }).reply();

  if (submissionResult.status !== "success") {
    return {
      ...submissionResult,
    };
  }

  try {
    const response = await customFetch<User, ServerError>(url, {
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

    const setCookieHeader = response.headers.getSetCookie();
    if (setCookieHeader) {
      const cookies = parse(setCookieHeader, {
        decodeValues: true,
      });

      const simaAuthSession = cookies.find(
        (cookie) => cookie.name === "sima-session"
      );
      if (!simaAuthSession) {
        throw new Error("Session not found");
      }
      if (simaAuthSession) {
        const user = await response.json();
        const successResponse = {
          ...submissionResult,
          isSuccess: true,
          data: {
            user,
            cookieData: simaAuthSession as ResponseCookie,
          },
        };
        return successResponse;
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
      serverError: [{ message: (error as Error).message }],
      errorType: ServerErrorType.BadRequest,
    };
  }
};

const resetPassword = async (
  prevState: unknown,
  formData: FormData,
  {
    url,
    schema,
  }: {
    url: string;
    schema: z.ZodType<Record<string, unknown>>;
  }
): Promise<SubmissionResultWithErrorsState<{ message: string }>> => {
  const submissionResult = parseWithZod(formData, {
    schema,
  }).reply();

  if (submissionResult.status !== "success") {
    return {
      ...submissionResult,
    };
  }

  const response = await customFetch<{ message: string }, ServerError>(url, {
    headers: {
      Accept: "application/json",
    },
    credentials: "include",
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const { errorType } = await response.json();
    if (errorType === ServerErrorType.TooManyRequests) {
      return {
        ...submissionResult,
        isErrorFromTheServer: true,
        isSuccess: false,
        serverError: [
          {
            message:
              "Too many password reset attempts. Please try again in an hour.",
          },
        ],
        errorType: ServerErrorType.TooManyRequests,
      };
    }
  }

  return {
    ...submissionResult,
    isSuccess: true,
  };
};

export const verifyResetToken = async (token: string) => {
  const response = await customFetch<
    { isValid: boolean; email: string },
    ServerError
  >(`/api/auth/verify-reset-token?token=${token}`, {
    method: "GET",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
};

export async function setCookieAction(cookieData: ResponseCookie) {
  "use server";
  nextCookies().set(cookieData);
}
