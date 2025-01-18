import { SubmissionResult } from "@conform-to/react";
import { ServerErrorType } from "@sima-board/common";

export type ErrorsFromServer = {
  message: string;
  field?: string;
};

export interface ServerError {
  errors: ErrorsFromServer[];
  errorType: ServerErrorType;
}

export interface SubmissionResultWithErrorsState
  extends SubmissionResult<string[]> {
  isErrorFromTheServer?: boolean;
  serverError?: ServerError;
  errorType?: ServerErrorType;
  isSuccess?: boolean;
}
