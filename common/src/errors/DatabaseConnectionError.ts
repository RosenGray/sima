import { CustomError } from "./CustomError";
import { ServerErrorType } from "./types";

export class DatabaseConnectionError extends CustomError {
  statusCode = 500;

  constructor(message: string, errorType?: ServerErrorType) {
    super(message, errorType ?? ServerErrorType.DatabaseConnection);
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }
}
