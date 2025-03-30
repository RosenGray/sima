import express from "express";
import { currentUser, requireAuth } from "@sima-board/common";
import { User } from "../models/User";

const router = express.Router();

router.get(
  "/api/auth/currentuser",
  currentUser,
  requireAuth,
  async (req, res) => {
    const { currentUser } = req;
    if (!currentUser) {
      return res.send({ currentUser: null });
    }
    console.log('user was requested3')
    const user = await User.findOne({ email: currentUser.email });
    res.send({ currentUser: user });
  }
);

export default router;
