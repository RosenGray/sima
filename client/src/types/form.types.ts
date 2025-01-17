import { SubmissionResult } from "@conform-to/react";

export type ErrorsFromServer = {
  message: string;
  field?: string;
};

export interface ServerError {
  errors: ErrorsFromServer[];
  errorType: number;
}

export interface SubmissionResultWithErrorsState
  extends SubmissionResult<string[]> {
  isErrorFromTheServer?: boolean;
  serverError?: ServerError;
  errorType?: number;
}
