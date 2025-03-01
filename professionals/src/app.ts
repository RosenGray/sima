import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import { json } from "body-parser";
import cookieSession from "cookie-session";
import { errorHandler, NotFoundError, currentUser } from "@sima-board/common";
import serviceCategoriesRouter from "./routes/service-categories";
import serviceSubCategoriesRouter from "./routes/service-sub-categories";
import professionalsRouter from "./routes/professionals/professionals.router";
import cookieParser from "cookie-parser";
require("dotenv").config();

const DEV_DOMAIN = ".sima.dev"; // //.sima.dev//localhost

export const app = express();

app.use(cookieParser());
app.set("trust proxy", true);
app.use(json());
app.use(
  cookieSession({
    name: "sima-session",
    signed: false,
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
    domain:
      process.env.NODE_ENV === "production" ? ".sima-board.com" : DEV_DOMAIN,
  })
);

app.get("/api/professionals/healthcheck", async (req, res) => {
  res.status(200).send({ health: true });
});

app.use(currentUser);
app.use("/api/professionals", professionalsRouter);
app.use("/api/professionals/service-categories", serviceCategoriesRouter);
app.use(
  "/api/professionals/service-sub-categories",
  serviceSubCategoriesRouter
);

app.get("*", async (req, res) => {
  throw new NotFoundError(`Route ${req.method} ${req.url} not found`);
});
app.use(errorHandler);

[];
