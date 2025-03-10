import {
  currentUser,
  FileManager,
  RequestValidationErrorWithZod,
  requireAuth,
  validateRequestWithZod,
  CustomNextRequest,
} from "@sima-board/common";
import express, { NextFunction, Request, Response } from "express";
import multer from "multer";
import { z } from "zod";
import { Professional } from "../../models/Professional";
import {
  AddProfessional,
  addProfessionalSchema,
} from "./professionals.schemas";
import { ServiceCategory } from "../../models/ServiceCategory";
import { ServiceSubCategory } from "../../models/ServiceSubCategory";

const router = express.Router();
const upload = multer({
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
    fieldSize: 10 * 1024 * 1024, // 10MB
    files: 5,
  },
  storage: multer.memoryStorage(),
});

router.post(
  "/temp",
  requireAuth,
  upload.array("images", 2),

  async (req: Request, res: Response) => {
    const userId = req.currentUser?.id;
    if (!userId) {
      return res.status(401).send({ message: "Unauthorized" });
    }
    upload.array("images", 2);

    // const REGION = process.env.BACKBLAZEB_REGION ?? "";
    const BUCKET_NAME = process.env.BACKBLAZEB_PUBLIC_BUCKET_NAME ?? "";
    const ENDPOINT = process.env.BACKBLAZEB_ENDPOINT ?? "";
    const ACCESS_KEY = process.env.BACKBLAZEB_PUBLIC_BUCKET_ACCESS_KEY ?? "";
    const SECRET_KEY = process.env.BACKBLAZEB_PUBLIC_BUCKET_SECRET_KEY ?? "";
    const BASE_URL = process.env.BACKBLAZEB_BASE_URL ?? "";
    const body = req.body;

    // Files are now guaranteed to exist and be valid
    // const files = req.validatedFiles!;
    const files = req.files!;
    const fileManager = new FileManager();
    // const result = await fileManager.uploadFiles({ userId, folderName: "professionals", files });
    const result = await fileManager.deleteFiles(userId, "professionals", [
      {
        fileName: "1740230599044-oiaqcrvgsp.png",
        versionId:
          "4_z340ffe562965213b964d0b14_f1044aa00b150f2d5_d20250222_m132319_c003_v0312028_t0041_u01740230599525",
      },
      {
        fileName: "1740230599048-4pxozrl5dc.png",
        versionId:
          "4_z340ffe562965213b964d0b14_f100a026b76be1a10_d20250222_m132319_c003_v0312023_t0012_u01740230599513",
      },
    ]);

    return res.send({
      images: result,

      currentUser: req.currentUser,
      // region: REGION,
      bucketName: BUCKET_NAME,
      endpoint: ENDPOINT,
      accessKey: ACCESS_KEY,
      secretKey: SECRET_KEY,
      baseUrl: BASE_URL,
    });
  }
);

//TODO: add route to add professional

router.post(
  "/",
  requireAuth,
  upload.array("images", 5),
  validateRequestWithZod(addProfessionalSchema),
  async (req: CustomNextRequest<AddProfessional, {}, {}>, res: Response) => {
    const userId = req.currentUser!.id;
    const fileManager = new FileManager({
      bucketName: process.env.BACKBLAZEB_PUBLIC_BUCKET_NAME,
      endpoint: process.env.BACKBLAZEB_ENDPOINT,
      region: process.env.BACKBLAZEB_REGION,
      accessKey: process.env.BACKBLAZEB_PUBLIC_BUCKET_ACCESS_KEY,
      secretKey: process.env.BACKBLAZEB_PUBLIC_BUCKET_SECRET_KEY,
      baseUrl: process.env.BACKBLAZEB_BASE_URL,
    });
    const images = await fileManager.uploadFiles({
      userId,
      folderName: "professionals",
      files: req.files!,
    });
    const imagesArray = images.map((image) => ({
      src: image.url,
      versionId: image.data.VersionId,
      fileName: image.uniqueName,
    }));

    const professional = new Professional({
      ...req.body,
      images: imagesArray,
    });

    await professional.save();

    res.status(201).send(professional);
  }
);

export default router;
