import { SimaError } from "./CustomError";
import { ServerErrorType } from "./types";

export class NotAuthorizedError extends SimaError {
  statusCode = 401;

  constructor(errorType?: ServerErrorType) {
    super("Not Authorized", errorType ?? ServerErrorType.NotAuthorized);

    Object.setPrototypeOf(this, NotAuthorizedError.prototype);
  }
}
