import { SubmissionResult } from "@conform-to/react";

export enum ServerErrorType {
  RequestValidation = 1,
  BadRequest = 2,
  DatabaseConnection = 3,
  NotAuthorized = 4,
  NotFound = 5
}


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
}
