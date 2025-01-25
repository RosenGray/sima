import { Request, Response, NextFunction } from "express";
import { CustomErrorAbstract } from "../errors/CustomError";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomErrorAbstract) {
    return res
      .status(err.statusCode)
      .send({ errors: err.serializeErrors(), errorType: err.errorType });
  }

  console.error(err);

  res.status(400).send({
    errors: [{ message: "Something went wrong" }],
  });
};
