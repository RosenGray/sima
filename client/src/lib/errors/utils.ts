import { SimaError } from "./CustomError";

export const normalizeUnknownToError = (error: unknown) => {
    let errorObj;
    if(error instanceof Error){
        errorObj = error;
    }else{
        errorObj = new Error(String(error));
    }
    return errorObj;
};

export const isSimaError = (error: unknown): error is SimaError => {
    return (
        error !== null &&
        typeof error === 'object' &&
        'statusCode' in error &&
        'errorType' in error &&
        error instanceof SimaError
    )
};

