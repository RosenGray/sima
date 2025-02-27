import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface UserPayload {
  id: string;
  firstName: string;
  lastName: string;
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
    if (req.session?.simaAuthSession) {
      const payload = jwt.verify(
        req.session.simaAuthSession,
        process.env.JWT_KEY!
      ) as UserPayload;
      req.currentUser = payload;
    }
  } catch (err) {
    console.error("Session decode or JWT verification error:", err);
  }

  next();
};
