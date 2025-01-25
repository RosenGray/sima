import { ValidationError } from "express-validator";
import { CustomError } from "./CustomError";
import { ServerErrorType } from "./types";

export class RequestValidationError extends CustomError {
  statusCode = 400;

  constructor(public errors: ValidationError[], errorType?: ServerErrorType) {
    super(
      "Invalid request parameters",
      errorType ?? ServerErrorType.RequestValidation
    );

    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors() {
    return this.errors.map((err) => {
      if (err.type === "field") {
        return { message: err.msg, field: err.path };
      }
      return { message: err.msg };
    });
  }
}
