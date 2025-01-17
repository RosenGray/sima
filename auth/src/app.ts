
import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import cookieSession from "cookie-session";
import currentUserRouter from "./routes/current-user";
import loginUserRouter from "./routes/login/login";
import registerUserRouter from "./routes/register/register";
import signoutUserRouter from "./routes/signout";
import resetPassword from "./routes/reset-password";
import { errorHandler, NotFoundError } from "@sima-board/common";

require('dotenv').config()


console.log('auth process.env.NODE_ENV v4 ',process.env.NODE_ENV )
console.log('Debug test point');


export const app = express();
app.set("trust proxy", true);
app.use(json());
app.use(
  cookieSession({
    name:'sima-auth-session',
    signed: false,
    secure: process.env.NODE_ENV === "production",
    httpOnly: true
  })
);
app.get("/api/users/healthcheck", (req, res) => {
  res.status(200).send(true);
});

app.use(currentUserRouter);
app.use(loginUserRouter);
app.use(registerUserRouter);
app.use(signoutUserRouter);
app.use(resetPassword);
app.get("*", async () => {
  throw new NotFoundError();
});
app.use(errorHandler);
