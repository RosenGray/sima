import { SimaError } from "./CustomError";
import { ServerErrorType } from "./types";


export class InternalServerError extends SimaError {
    statusCode = 500;
    constructor() {
        super("Internal Server Error", ServerErrorType.InternalServerError);
        Object.setPrototypeOf(this, InternalServerError.prototype);
    }
}