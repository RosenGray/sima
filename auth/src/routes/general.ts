import express from "express";
import { currentUser, requireAuth } from "@sima-board/common";

import { BadRequestError } from "@sima-board/common";
import { User } from "../models/User";
import { jwtSignUser } from "../utils";

const router = express.Router();

router.patch("/api/auth", currentUser, requireAuth, async (req, res) => {
  // Get schema paths but filter out mongoose internal fields
  const notAllowedFields = new Set([
    "_id",
    "__v",
    "createdAt",
    "updatedAt",
    "password",
    "resetToken",
    "resetTokenExpiresAt",
  ]);
  const allowedFields = Object.keys(User.schema.paths).filter(
    (field) => !notAllowedFields.has(field)
  );

  console.log("allowedFields", allowedFields);

  const updates = Object.keys(req.body);
  console.log("updates", req.body);

  // Check if updates contain valid fields
  const isValidOperation = updates.every((update) =>
    allowedFields.includes(update)
  );

  if (!isValidOperation) {
    throw new BadRequestError("Invalid updates");
  }

  try {
    const user = await User.findById(req.currentUser!.id);

    if (!user) {
      throw new BadRequestError("User not found");
    }

    updates.forEach((field) => {
      if (allowedFields.includes(field) && field in user) {
        // @ts-ignore: Mongoose fields are not fully typed
        (user as any)[field] = req.body[field];
      }
    });

    await user.save();

    // Generate JWT
    const userJwt = jwtSignUser(user);

    // Store it on session object
    if (req.session) {
      req.session.simaAuthSession = userJwt;
    }

    res.status(200).send(user);
  } catch (error) {
    throw new BadRequestError("Update failed");
  }
});

export default router;
