import { SimaError } from "./CustomError";
import { ServerErrorType } from "./types";

export class DatabaseConnectionError extends SimaError {
  statusCode = 500;

  constructor(message: string, errorType?: ServerErrorType) {
    super(message, errorType ?? ServerErrorType.DatabaseConnection);
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }
}
