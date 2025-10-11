import { randomBytes } from "crypto";
import { User } from "../models/User";
import connectDB from "@/lib/mongo/mongodb";
import nodemailer from "nodemailer";
import { VerificationTokenValidationReason } from "../types/verification.types";

// Configuration
export const TOKEN_EXPIRATION_MINUTES = 15;
export const TOKEN_LENGTH = 32;

// Gmail credentials (same as PasswordManager)
const GMAIL_APP_USER = "sima.customer@gmail.com";
const GMAIL_APP_PASSWORD = "npdm wzub ihci vssk";

// Create transporter
const getTransporter = () => {
  return nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: GMAIL_APP_USER,
      pass: GMAIL_APP_PASSWORD,
    },
  });
};

export const generateVerificationToken = () => {
  const buffer = randomBytes(TOKEN_LENGTH);
  return buffer.toString("hex");
};

export const storeVerificationToken = async (email: string, token: string) => {
  const expiresAt = new Date(Date.now() + TOKEN_EXPIRATION_MINUTES * 60 * 1000);
  await User.updateOne(
    { email },
    { 
      $set: { 
        emailVerificationToken: token, 
        emailVerificationTokenExpiresAt: expiresAt 
      } 
    }
  );
};

type VerificationTokenValidationResult = {
  isValid: boolean;
  reason?: VerificationTokenValidationReason;
  email?: string;
};

export const validateVerificationToken = async (
  token: string
): Promise<VerificationTokenValidationResult> => {
  try {
    await connectDB();
    const user = await User.findOne({ emailVerificationToken: token });

    if (!user || !user.emailVerificationTokenExpiresAt) {
      return { isValid: false, reason: VerificationTokenValidationReason.TokenNotFound };
    }

    if (user.isEmailVerified) {
      return { isValid: false, reason: VerificationTokenValidationReason.AlreadyVerified };
    }

    if (Date.now() > user.emailVerificationTokenExpiresAt.getTime()) {
      await deleteVerificationToken(token);
      return { isValid: false, reason: VerificationTokenValidationReason.TokenExpired };
    }

    return { isValid: true, email: user.email };
  } catch (error) {
    console.log(error);
    return { isValid: false, reason: VerificationTokenValidationReason.TokenNotFound };
  }
};

export const deleteVerificationToken = async (token: string) => {
  await User.updateOne(
    { emailVerificationToken: token },
    { $unset: { emailVerificationToken: "", emailVerificationTokenExpiresAt: "" } }
  );
};

export const getEmailVerificationTemplate = (verificationLink: string) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Подтверждение электронной почты</title>
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
          <img src="https://f003.backblazeb2.com/file/sima-board-public/public/sima.dark.logo.png" alt="Sima" />
        </div>
        <div class="header">
          <h2>Подтверждение электронной почты</h2>
        </div>
        <div class="content">
          <p>Здравствуйте,</p>
          <p>Спасибо за регистрацию! Пожалуйста, подтвердите ваш адрес электронной почты, нажав на кнопку ниже:</p>
          
          <div style="text-align: center;">
            <a href="${verificationLink}" class="button">Подтвердить электронную почту</a>
          </div>
          
          <p>Эта ссылка истечет через ${TOKEN_EXPIRATION_MINUTES} минут по соображениям безопасности.</p>
          
          <p>Если вы не регистрировались на нашем сайте, вы можете проигнорировать это письмо.</p>
          
          <p>С наилучшими пожеланиями,<br>Команда Sima</p>
        </div>
        <div class="footer">
          <p>Это автоматическое сообщение, пожалуйста, не отвечайте на него.</p>
          <p>Если у вас возникли проблемы с нажатием кнопки подтверждения, скопируйте и вставьте URL-адрес ниже в ваш веб-браузер:</p>
          <p style="word-break: break-all;">${verificationLink}</p>
          <p>Если у вас возникли проблемы, пожалуйста свяжитесь с нами по адресу ${GMAIL_APP_USER}</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

export const sendVerificationEmail = async (email: string, verificationLink: string) => {
  try {
    const transporter = getTransporter();
    const mailOptions = {
      from: GMAIL_APP_USER,
      to: email,
      subject: "Подтвердите вашу электронную почту - Sima",
      html: getEmailVerificationTemplate(verificationLink),
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Verification email sent:", info.messageId);
    return true;
  } catch (error) {
    console.error("Error sending verification email:", error);
    return false;
  }
};

