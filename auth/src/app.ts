import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import cookieSession from "cookie-session";
import currentUserRouter from "./routes/current-user";
import signinUserRouter from "./routes/signin";
import signupUserRouter from "./routes/signup";
import signoutUserRouter from "./routes/signout";
import { errorHandler, NotFoundError } from "@sima-board/common";

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
  const bla = 3;

  console.log(bla)
  res.status(200).send({nmW:'CLs'});
});

app.use(currentUserRouter);
app.use(signinUserRouter);
app.use(signupUserRouter);
app.use(signoutUserRouter);
app.get("*", async () => {
  throw new NotFoundError();
});
app.use(errorHandler);
