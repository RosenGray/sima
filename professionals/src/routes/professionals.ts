import express, { Request, Response } from "express";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  return res.send({
    BACKBLAZEB_PUBLIC_BUCKET_ACCESS_KEY: process.env.BACKBLAZEB_PUBLIC_BUCKET_ACCESS_KEY,
    BACKBLAZEB_PUBLIC_BUCKET_SECRET_KEY: process.env.BACKBLAZEB_PUBLIC_BUCKET_SECRET_KEY,
  });
});


export default router;
