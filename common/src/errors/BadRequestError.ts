import { CustomError } from "./CustomError";
import { ServerErrorType } from "./types";

export class BadRequestError extends CustomError {
  statusCode = 400;

  constructor(public message: string, errorType?: ServerErrorType) {
    super(message, errorType ?? ServerErrorType.BadRequest);
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }
}
