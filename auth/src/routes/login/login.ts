import express, { Request, Response } from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";
import multer from "multer";
import { PasswordManager } from "../../services/PasswordManager";
import { User } from "../../models/User";
import {
  ServerErrorType,
  NotAuthorizedError,
  validateRequest,
} from "@sima-board/common";

const router = express.Router();
const upload = multer();

router.post(
  "/api/auth/login",
  upload.none(),
  [
    body("email")
      .isEmail()
      .withMessage("Электронная почта должна быть действующей"),
    body("password").trim().notEmpty().withMessage("вы должны указать пароль"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      throw new NotAuthorizedError(ServerErrorType.AuthWrongPasswordOrEmail);
    }

    const passwordsMatch = await PasswordManager.compare(
      existingUser.password,
      password
    );
    if (!passwordsMatch) {
      throw new NotAuthorizedError(ServerErrorType.AuthWrongPasswordOrEmail);
    }

    // Generate JWT
    const userJwt = jwt.sign(
      {
        id: existingUser.id,
        email: existingUser.email,
        firstName: existingUser.firstName,
        lastName: existingUser.lastName,
      },
      process.env.JWT_KEY!
    );

    // Store it on session object
    req.session = {
      jwt: userJwt,
    };

    res.status(200).send(existingUser);
  }
);

export default router;
