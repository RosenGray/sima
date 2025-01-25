import { CustomError } from "./CustomError";
import { ServerErrorType } from "./types";

export class NotAuthorizedError extends CustomError {
  statusCode = 401;

  constructor(errorType?: ServerErrorType) {
    super("Not Authorized", errorType ?? ServerErrorType.NotAuthorized);

    Object.setPrototypeOf(this, NotAuthorizedError.prototype);
  }
}
