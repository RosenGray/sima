import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { RequestValidationErrorWithZod } from "../errors/RequestValidationErrorWithZod";

export const validateRequestWithZod =
  (schema: z.ZodSchema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    if (!req.body) {
      return res.status(400).send({ message: "Invalid request body" });
    }
    if (req.files) {
      req.body.images = req.files as Express.Multer.File[];
    }
    const result = schema.safeParse(req.body);

    if (!result.success) {
      throw new RequestValidationErrorWithZod(result.error);
    }

    req.body = result.data;

    next();
  };
