import {
  FileManager,
  requireAuth,
  validateRequestWithZod,
  CustomNextRequest,
  NotAuthorizedError,
} from "@sima-board/common";
import express, { Request, Response } from "express";
import multer from "multer";
import { Professional } from "../../models/Professional";
import {
  AddProfessional,
  addProfessionalSchema,
} from "./professionals.schemas";

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
  "/",
  requireAuth,
  upload.array("images", 5),
  validateRequestWithZod(addProfessionalSchema),
  async (req: CustomNextRequest<AddProfessional, {}, {}>, res: Response) => {
    const userId = req.currentUser?.id;
    if (!userId) {
      throw new NotAuthorizedError();
    }
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

/**
 * Get all professionals
 * @route GET /api/professionals
 * @access Public
 */
router.get("/", async (req: Request, res: Response) => {

  const professionals = await Professional.find({});
  res.status(200).send(professionals);
});

export default router;
