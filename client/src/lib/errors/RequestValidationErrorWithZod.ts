import { SimaError } from "./CustomError";
import { ServerErrorType } from "./types";
import { ZodError } from "zod";

export class RequestValidationErrorWithZod extends SimaError {
  statusCode = 400;

  constructor(public errors: ZodError, errorType?: ServerErrorType) {
    super(
      "Invalid request parameters",
      errorType ?? ServerErrorType.RequestValidation
    );

    Object.setPrototypeOf(this, RequestValidationErrorWithZod.prototype);
  }

  serializeErrors() {
    return this.errors.issues.map((err) => {
      return { message: err.message, field: err.path.join() };
    });
  }
}
