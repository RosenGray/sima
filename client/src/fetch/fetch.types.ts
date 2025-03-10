import { SubmissionResult } from "@conform-to/react";
import { ServerErrorType } from "@sima-board/common";
import { z } from "zod";

export type ErrorsFromServer = {
  message: string;
  field?: string;
};

export interface ServerError {
  errors: ErrorsFromServer[];
  errorType: ServerErrorType;
}

export interface SubmissionResultWithErrorsState<T = unknown>
  extends SubmissionResult<string[]> {
  isErrorFromTheServer?: boolean;
  serverError?: ServerError["errors"];
  errorType?: ServerErrorType;
  isSuccess?: boolean;
  data?: T;
}

export type ActionWrapperOptions = {
  url: string;
  schema: z.ZodType<Record<string, unknown>>;
};
