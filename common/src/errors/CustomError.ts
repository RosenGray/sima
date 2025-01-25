import { ServerErrorType } from "./types";

export abstract class CustomErrorAbstract extends Error {
  abstract statusCode: number;
  abstract errorType: ServerErrorType;

  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, CustomErrorAbstract.prototype);
  }

  abstract serializeErrors(): { message: string; field?: string }[];
}

export class CustomError extends CustomErrorAbstract {
  statusCode = 0;
  errorType: ServerErrorType;

  constructor(message: string, errorType: ServerErrorType) {
    super(message);
    Object.setPrototypeOf(this, CustomError.prototype);
    this.errorType = errorType;
  }

  serializeErrors() {
    return [{ message: this.message }];
  }
}
