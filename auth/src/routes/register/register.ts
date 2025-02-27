import express, { Request, Response } from "express";
import multer from "multer";
import jwt from "jsonwebtoken";

import {  BadRequestError, validateRequest, ServerErrorType } from "@sima-board/common";
import { User } from "../../models/User";
import { registerSchema } from "./register.schema";

const router = express.Router();

// Configure multer for handling FormData
const upload = multer();

router.post(
  "/api/auth/register",
  upload.none(),
  registerSchema,
  validateRequest,
  async (req: Request, res: Response) => {
    const { firstName,lastName, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new BadRequestError("Электронная почта уже используется", ServerErrorType.AuthUserAlreadyExists);
    }
    const user = new User({firstName,lastName, email, password });
    await user.save();

    // Generate JWT
    const userJwt = jwt.sign(
      {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
      process.env.JWT_KEY!
    );

    // Store it on session object
    if(req.session){  
      req.session.simaAuthSession =userJwt;
    }

    res.status(201).send(user);
  }
);

export default router;
