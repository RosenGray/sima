import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface UserPayload {
  id: string;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}

export const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.headers.cookie) {
      const value = req.cookies["sima-auth-session"];
      if (value) {
        req.session = JSON.parse(Buffer.from(value, "base64").toString("utf8"));
      }
    }

    if (req.session?.jwt) {
      const payload = jwt.verify(
        req.session.jwt,
        process.env.JWT_KEY!
      ) as UserPayload;
      req.currentUser = payload;
    }
  } catch (err) {
    console.error("Session decode or JWT verification error:", err);
  }

  next();
};
