import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import cookieSession from "cookie-session";
import { errorHandler, NotFoundError,currentUser } from "@sima-board/common";
import forRentRouter from './routes/forRent';

export const app = express();
app.set("trust proxy", true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "test",
  })
);

app.use(currentUser);
app.use(forRentRouter);

app.get("*", async () => {
  throw new NotFoundError();
});
app.use(errorHandler);
