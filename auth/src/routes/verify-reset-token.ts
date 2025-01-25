import { BadRequestError, ServerErrorType } from "@sima-board/common";
import { TokenValidationReason, validateToken } from "../services/TokenManager";
import express, { Request, Response } from "express";
const router = express.Router();

router.get(
  "/api/auth/verify-reset-token",

  async (req: Request, res: Response) => {
    const { token } = req.query;
    if (!token) {
      throw new BadRequestError("Token is required");
    }
    const { reason, isValid, email } = await validateToken(token as string);
    if (!isValid) {
      switch (reason) {
        case TokenValidationReason.TokenNotFound:
          throw new BadRequestError("Token not found", ServerErrorType.AuthTokenNotFound);
        case TokenValidationReason.TokenExpired:
          throw new BadRequestError("Token expired", ServerErrorType.AuthTokenExpired);
        default:
          throw new BadRequestError("Invalid token", ServerErrorType.AuthInvalidToken);
      }
    }

    return res.status(200).json({ isValid, email });
  }
);

export default router;
