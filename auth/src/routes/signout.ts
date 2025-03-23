import express from "express";

const router = express.Router();

router.post("/api/auth/signout", async (req, res) => {
  req.session = null;
  res.clearCookie("sima-session");
  res.send({session: req.session});
});

export default router;
