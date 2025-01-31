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

export interface SubmissionResultWithErrorsState<T>
  extends SubmissionResult<string[]> {
  isErrorFromTheServer?: boolean;
  serverError?: ServerError['errors'];
  errorType?: ServerErrorType;
  isSuccess?: boolean;
  data?: T;
}
