import { currentUser, requireAuth } from "@sima-board/common";
import express, { Request, Response } from "express";
import multer from "multer";
import FileManager from "../../filesManager";
import { validateFiles } from "../../filesManager/filesManager.middleware";
import { Professional } from "../../models/Professional";
import {
  AddProfessional,
  addProfessionalSchema,
} from "./professionals.schemas";
import { ServiceCategory } from "../../models/ServiceCategory";
import { ServiceSubCategory } from "../../models/ServiceSubCategory";

export interface CustomRequest<B, P, Q> extends Express.Request {
  body: B;
  params: P;
  query: Q;
}
const router = express.Router();
const upload = multer();

router.post(
  "/temp",
  requireAuth,
  upload.array("images", 2),
  validateFiles({
    required: true,
    maxFiles: 2,
    allowedMimeTypes: ["image/jpeg", "image/png"],
    maxFileSize: 5 * 1024 * 1024, // 5MB
  }),
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
  async (req: CustomRequest<AddProfessional, {}, {}>, res: Response) => {
    // req.body.images = req.files as Express.Multer.File[];
    // const userId = req.currentUser!.id;
    // const result = addProfessionalSchema.safeParse(req.body);
    // if (!result.success) {
    //   return res
    //     .status(400)
    //     .send({ message: "Invalid request body", error: result.error });
    // }
    // const fileManager = new FileManager();
    // const images = await fileManager.uploadFiles({
    //   userId,
    //   folderName: "professionals",
    //   files: req.files!,
    // });

    // const imagesArray = images.map((image) => ({
    //   src: image.url,
    //   versionId: image.data.VersionId,
    // }));

    // const professional = new Professional({
    //   ...req.body,
    //   images: imagesArray,
    // });

    // await professional.save();
    res.status(201).send({
      // name,

      message: "Professional added successfully",
      // receivedBody: req.body, // Send
      region: process.env.BACKBLAZEB_REGION ?? "",
      bucketName: process.env.BACKBLAZEB_PUBLIC_BUCKET_NAME ?? "",
      endpoint: process.env.BACKBLAZEB_ENDPOINT ?? "",
      accessKey: process.env.BACKBLAZEB_PUBLIC_BUCKET_ACCESS_KEY ?? "",
      secretKey: process.env.BACKBLAZEB_PUBLIC_BUCKET_SECRET_KEY ?? "",
      baseUrl: process.env.BACKBLAZEB_BASE_URL ?? "",
    });
  }
);

export default router;
