import express, { Request, Response } from "express";
// import { body } from "express-validator";

// import {
//   ServerErrorType,
//   NotAuthorizedError,
//   validateRequest,
// } from "@sima-board/common";
import { ServiceSubCategory } from "../models/ServiceSubCategory";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  const serviceSubCategories = await ServiceSubCategory.find({});
  res.send(serviceSubCategories);
});

export default router;
