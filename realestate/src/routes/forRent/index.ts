import express, { Request, Response, Router } from "express";
import { body } from "express-validator";
import {
  NotAuthorizedError,
  NotFoundError,
  requireAuth,
  validateRequest,
} from "@sima-board/common";
import { HouseForRent } from "../../models/HouseForRent";
import { natsWrapper } from "../../NatsWrapper";
import { HouseForRentCreatedPublisher } from "../../events/publishers/HouseForRentCreatedPublisher";
import { HouseForRentUpdatedPublisher } from "../../events/publishers/HouseForRentUpdatedPublisher";
const router = express.Router();

router.get("/api/realestate/forrent/healthcheck", (req, res) => {
  res.status(200).send(true);
});

router.get(
  "/api/realestate/forrent/:id",
  async (req: Request, res: Response) => {
    const houseForRent = await HouseForRent.findById(req.params.id);

    if (!houseForRent) throw new NotFoundError();
    res.send(houseForRent);
  }
);

router.post(
  "/api/realestate/forrent",
  requireAuth,
  [body("title").not().isEmpty().withMessage("Title is required")],
  validateRequest,
  async (req: Request, res: Response) => {
    const { title } = req.body;

    const houseForRent = new HouseForRent({
      title,
      userId: req.currentUser!.id,
    });

    await houseForRent.save();

    await new HouseForRentCreatedPublisher(natsWrapper.client).publish({
      id: houseForRent.id,
      title: houseForRent.title,
      userId: houseForRent.userId,
      version: houseForRent.version,
    });

    res.status(201).send(houseForRent);
  }
);

router.put(
  "/api/realestate/forrent/:id",
  requireAuth,
  [body("title").not().isEmpty().withMessage("Title is required")],
  validateRequest,
  async (req: Request, res: Response) => {
    const houseForRent = await HouseForRent.findById(req.params.id);
    if (!houseForRent) throw new NotFoundError();
    if (houseForRent.userId !== req.currentUser!.id)
      throw new NotAuthorizedError();

    houseForRent.set({
      title: req.body.title,
    });

    await houseForRent.save();

    await new HouseForRentUpdatedPublisher(natsWrapper.client).publish({
      id: houseForRent.id,
      title: houseForRent.title,
      userId: houseForRent.userId,
      version: houseForRent.version,
    });

    res.send(houseForRent);
  }
);

export default router;
