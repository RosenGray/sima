import express, { Request, Response } from "express";
import multer from "multer";
import jwt from "jsonwebtoken";

import {  BadRequestError, validateRequest } from "@sima-board/common";
import { User } from "../../models/User";
import { registerSchema } from "./register.schema";

const router = express.Router();

// Configure multer for handling FormData
const upload = multer();

router.post(
  "/api/users/register",
  upload.none(),
  registerSchema,
  validateRequest,
  async (req: Request, res: Response) => {
    const { firstName,lastName, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new BadRequestError("Электронная почта уже используется");
    }
    const user = new User({firstName,lastName, email, password });
    await user.save();

    // Generate JWT
    const userJwt = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_KEY!
    );

    // Store it on session object
    req.session = {
      jwt: userJwt,
    };

    res.status(201).send(user);
  }
);

export default router;
