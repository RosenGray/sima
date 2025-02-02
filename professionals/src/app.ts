import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import cookieSession from "cookie-session";
import { errorHandler, NotFoundError,currentUser } from "@sima-board/common";
import { HouseForRent } from "./models/HouseForRent";


export const app = express();
app.set("trust proxy", true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "test",
  })
);
app.get("/api/professionals/healthcheck", async (req, res) => {
  const house = new HouseForRent({
    title: "Beach House",
    userId: "123",
    version: 1
  });
  await house.save();
  res.status(200).send({health:true});
});

app.use(currentUser);


app.get("*", async () => {
  throw new NotFoundError();
});
app.use(errorHandler);
