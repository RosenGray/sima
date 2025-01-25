import { CustomError } from "./CustomError";
import { ServerErrorType } from "./types";

export class NotFoundError extends CustomError {
  statusCode = 404;

  constructor(message: string, errorType?: ServerErrorType) {
    super(message, errorType ?? ServerErrorType.NotFound);

    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}
