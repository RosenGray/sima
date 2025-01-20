import express, { Request, Response } from "express";
const router = express.Router();

router.get(
  "/api/users/verify-reset-token",

  async (req: Request, res: Response) => {
    const { token } = req.query;
    if (!token) {
      return res.status(400).json({ message: "Token is required" });
    }

    // const isValid = await validateToken(token);

    return res.status(200).json({ message: "Verification email sensssst",token });
  }
);

export default router;
