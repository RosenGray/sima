"use server";
import { redirect } from "next/navigation";
import { cookies as nextCookies } from "next/headers";
import { parseWithZod } from "@conform-to/zod";
import { loginSchema } from "../validations";
import { parse } from "set-cookie-parser";
import { ServerErrorType, SubmissionResultWithErrorsState } from "@/fetch/fetch.types";
import { customFetch } from "@/fetch";

export const createUser = async (
  prevState: unknown,
  formData: FormData
): Promise<SubmissionResultWithErrorsState> => {
  const submissionResult = parseWithZod(formData, {
    schema: loginSchema,
  }).reply();

  if (submissionResult.status !== "success") {
    return {
      ...submissionResult,
    };
  }

  try {
    const response = await customFetch("/api/users/login", {
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
        errorType: errorResponse?.errorType || ServerErrorType.BadRequest,
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
    redirect("/");
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
