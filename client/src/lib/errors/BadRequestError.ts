import { SimaError } from "./CustomError";
import { ServerErrorType } from "./types";

export class BadRequestError extends SimaError {
  statusCode = 400;

  constructor(public message: string, errorType?: ServerErrorType) {
    super(message, errorType ?? ServerErrorType.BadRequest);
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }
}
