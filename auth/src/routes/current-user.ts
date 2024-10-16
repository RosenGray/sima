import express from "express";
import { currentUser, requireAuth } from "@sima-board/common";

const router = express.Router();

router.get("/api/users/currentuser", currentUser, requireAuth, (req, res) => {
  res.send({ currentUser: req.currentUser || null });
});

export default router;
