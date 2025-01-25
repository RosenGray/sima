import express, { Request, Response } from "express";
import multer from "multer";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { body } from "express-validator";
import { User } from "../models/User";
import {
  NotAuthorizedError,
  ServerErrorType,
  validateRequest,
} from "@sima-board/common";
import {
  generateToken,
  storeToken,
  TOKEN_EXPIRATION_MINUTES,
} from "../services/TokenManager";
import { passwordValidationChain } from "./register/register.schema";
import rateLimit from 'express-rate-limit';

const router = express.Router();
const upload = multer();



// Create a rate limiter for password reset attempts
const passwordResetLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour window
  max: 5, // limit each IP to 5 requests per windowMs
  message: {
    error: 'Слишком много попыток сброса пароля. Пожалуйста, попробуйте снова через час.',
    type: ServerErrorType.TooManyRequests,
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});


// Create a function to get the transporter instead of creating it at module level
const getTransporter = () => {
  return nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.GMAIL_APP_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });
};

interface EmailResponse {
  success: boolean;
  error?: string;
}

const getPasswordResetEmailTemplate = (resetLink: string) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>напоминание пароля</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333333;
          margin: 0;
          padding: 0;
        }
        .container {
          max-width: 600px;
          margin: 20px auto;
          padding: 20px;
        }
        .header {
          background-color: #f8f9fa;
          padding: 20px;
          text-align: center;
          border-radius: 5px;
        }
        .logo {
          width:100%;
          margin: 0 auto 20px;
          background-color:#2b2543;
          height:100px;
          text-align: center;
        }
        .content {
          padding: 20px;
        }
        .button {
          display: inline-block;
          padding: 12px 24px;
          background-color: #007bff;
          color: #ffffff !important;
          text-decoration: none;
          border-radius: 5px;
          margin: 20px 0;
        }
        .footer {
          margin-top: 20px;
          font-size: 12px;
          color: #666666;
        }
        img {
          height: 100%;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="logo">
          <img src="https://f003.backblazeb2.com/file/sima-board-public/sima/sima.dark.logo.png" alt="Sima" />
        </div>
        <div class="header">
          <h2>Запрос на напоминание пароля</h2>
        </div>
        <div class="content">
          <p>Здравствуйте,</p>
          <p>Мы получили запрос на напоминание вашего пароля. Нажмите на кнопку ниже, чтобы создать новый пароль:</p>
          
          <div style="text-align: center;">
            <a href="${resetLink}" class="button">Сбросить пароль</a>
          </div>
          
          <p>Эта ссылка истечет через ${TOKEN_EXPIRATION_MINUTES} минут по соображениям безопасности.</p>
          
          <p>Если вы не запрашивали напоминание пароля, вы можете проигнорировать это письмо.</p>
          
          <p>С наилучшими пожеланиями,<br>Ваша команда приложения</p>
        </div>
        <div class="footer">
          <p>Это автоматическое сообщение, пожалуйста, не отвечайте на него.</p>
          <p>Если у вас возникли проблемы с нажатием кнопки сброса пароля, скопируйте и вставьте URL-адрес ниже в ваш веб-браузер:</p>
          <p style="word-break: break-all;">${resetLink}</p>
          <p>Если у вас возникли проблемы,пожалуйста свяжитесь с нами по адресу ${process.env.GMAIL_APP_USER}</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

const sendPasswordResetEmail = async (email: string, resetLink: string) => {
  try {
    const transporter = getTransporter();
    const mailOptions = {
      from: process.env.GMAIL_APP_USER,
      to: email,
      subject: "Reset Your Password",
      html: getPasswordResetEmailTemplate(resetLink),
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Password reset email sent:", info.messageId);
    return true;
  } catch (error) {
    console.error("Error sending password reset email:", error);
  }
};

router.post(
  "/api/auth/reset-password",
  passwordResetLimiter,
  upload.none(),
  [
    body("email")
      .isEmail()
      .withMessage("Электронная почта должна быть действующей"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email } = req.body;

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      throw new NotAuthorizedError(ServerErrorType.AuthWrongPasswordOrEmail);
    }
    const token = generateToken();
    await storeToken(email, token);
    const resetPasswordLink = `${process.env.NEXT_PUBLIC_APP_URL}/auth/reset-password/${token}`;
    await sendPasswordResetEmail(email, resetPasswordLink);

    return res.status(200).json({
      message:
        "Если аккаунт с таким адресом электронной почты существует, вы получите инструкции по сбросу пароля.",
    });
  }
);

router.post(
  "/api/auth/reset-password/confirm",
  passwordResetLimiter,
  upload.none(),
  [passwordValidationChain],
  validateRequest,
  async (req: Request, res: Response) => {
    const { token, password } = req.body;
    const user = await User.findOne({ resetToken: token });
    if (!user) {
      throw new NotAuthorizedError(ServerErrorType.AuthTokenNotFound);
    }
    user.resetToken = undefined;
    user.resetTokenExpiresAt = undefined;
    user.password = password;
    await user.save();

    // Generate JWT
    const userJwt = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_KEY!
    );

    // Store it on session object
    req.session = {
      jwt: userJwt,
    };

    res.status(200).send(user);
  }
);

export default router;
