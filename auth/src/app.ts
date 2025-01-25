import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import cookieSession from "cookie-session";
import currentUserRouter from "./routes/current-user";
import loginUserRouter from "./routes/login/login";
import registerUserRouter from "./routes/register/register";
import signoutUserRouter from "./routes/signout";
import resetPassword from "./routes/reset-password";
import verifyResetToken from "./routes/verify-reset-token";
import { errorHandler, NotFoundError } from "@sima-board/common";
import cookieParser from "cookie-parser";


console.log('process.env.NEXT_PUBLIC_APP_URL)',process.env.NEXT_PUBLIC_APP_URL);

export const app = express();
app.use(cookieParser());
app.set("trust proxy", true);
app.use(json());
app.use(
  cookieSession({
    name: "sima-auth-session",
    signed: false,
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    sameSite: "lax",
  })
);

app.get("/api/auth/healthcheck", (req, res) => {
  res.status(200).send(true);
});

app.use(currentUserRouter);
app.use(loginUserRouter);
app.use(registerUserRouter);
app.use(signoutUserRouter);
app.use(resetPassword);
app.use(verifyResetToken);
app.get("*", async (req, res) => {
  throw new NotFoundError(`Route ${req.method} ${req.url} not found`);
});
app.use(errorHandler);
