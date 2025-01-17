"use server";
import { redirect } from "next/navigation";
import { cookies as nextCookies } from "next/headers";
import { parseWithZod } from "@conform-to/zod";
import { loginSchema } from "../validations";
import { parse } from "set-cookie-parser";
import { SubmissionResultWithErrorsState } from "@/types/form.types";

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

  const response = await fetch("http://sima.dev/api/users/login", {
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
      errorType: errorResponse?.errorType || 0,
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

  return {
    ...submissionResult,
    isErrorFromTheServer: true,
  };
};
