import { CustomError } from "./CustomError";
import { ServerErrorType } from "./types";


export class InternalServerError extends CustomError {
    statusCode = 500;
    constructor() {
        super("Internal Server Error", ServerErrorType.InternalServerError);
        Object.setPrototypeOf(this, InternalServerError.prototype);
    }
}