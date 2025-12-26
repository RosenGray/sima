import { randomBytes } from "crypto";
import { User } from "../models/User";
import connectDB from "@/lib/mongo/mongodb";
import nodemailer from "nodemailer";
import { VerificationTokenValidationReason } from "../types/verification.types";

// Type for SMTP error with additional properties
interface SMTPError extends Error {
  code?: string;
  command?: string;
  response?: string;
  responseCode?: number;
}

// Configuration
export const TOKEN_EXPIRATION_MINUTES = 15;
export const TOKEN_LENGTH = 32;

// Gmail credentials (same as PasswordManager)
// const GMAIL_APP_USER = "sima.customer@gmail.com";
// const GMAIL_APP_PASSWORD = "npdm wzub ihci vssk";
const PRIVATE_EMAIL_USER = "support@sima-board.com"; //todo add from env
const PRIVATE_EMAIL_PASSWORD = "xVaduiUwO5D!77Nf"; //todo add from env
// Create transporter with timeout settings
const getTransporter = () => {
  // Use port 587 with STARTTLS for both dev and production
  // Port 465 (SSL/TLS) is often blocked in containerized/Kubernetes environments
  const isProduction = process.env.NODE_ENV === "production";
  
  return nodemailer.createTransport({
    // service: "Gmail",
    host: "mail.privateemail.com",
    port: 587, // Use STARTTLS port (works better in production environments)
    secure: false, // false for STARTTLS, true for SSL/TLS
    requireTLS: true, // Require TLS encryption
    auth: {
      user: PRIVATE_EMAIL_USER,
      pass: PRIVATE_EMAIL_PASSWORD,
    },
    // Timeout settings - increased for production network latency
    connectionTimeout: isProduction ? 30000 : 10000, // 30s production, 10s dev
    socketTimeout: isProduction ? 30000 : 10000, // 30s production, 10s dev
    greetingTimeout: isProduction ? 30000 : 10000, // 30s production, 10s dev
    // Retry configuration
    pool: true, // Use connection pooling
    maxConnections: 1, // Limit connections
    maxMessages: 3, // Max messages per connection
    // Additional TLS options for better compatibility
    tls: {
      // Don't reject unauthorized certificates in production (useful for some mail servers)
      rejectUnauthorized: !isProduction,
      // Minimum TLS version
      minVersion: "TLSv1.2",
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
        emailVerificationTokenExpiresAt: expiresAt,
      },
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
      return {
        isValid: false,
        reason: VerificationTokenValidationReason.TokenNotFound,
      };
    }

    if (user.isEmailVerified) {
      return {
        isValid: false,
        reason: VerificationTokenValidationReason.AlreadyVerified,
      };
    }

    if (Date.now() > user.emailVerificationTokenExpiresAt.getTime()) {
      await deleteVerificationToken(token);
      return {
        isValid: false,
        reason: VerificationTokenValidationReason.TokenExpired,
      };
    }

    return { isValid: true, email: user.email };
  } catch (error) {
    console.log(error);
    return {
      isValid: false,
      reason: VerificationTokenValidationReason.TokenNotFound,
    };
  }
};

export const deleteVerificationToken = async (token: string) => {
  await User.updateOne(
    { emailVerificationToken: token },
    {
      $unset: {
        emailVerificationToken: "",
        emailVerificationTokenExpiresAt: "",
      },
    }
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
          <p>Если у вас возникли проблемы, пожалуйста свяжитесь с нами по адресу ${PRIVATE_EMAIL_USER}</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

export const sendVerificationEmail = async (
  email: string,
  verificationLink: string,
  retries: number = 2
): Promise<boolean> => {
  const transporter = getTransporter();
  const mailOptions = {
    from: PRIVATE_EMAIL_USER,
    to: email,
    subject: "Подтвердите вашу электронную почту - Sima",
    html: getEmailVerificationTemplate(verificationLink),
  };

  // Retry logic with exponential backoff
  const isProduction = process.env.NODE_ENV === "production";
  const sendTimeout = isProduction ? 45000 : 20000; // 45s production, 20s dev
  
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      // Add timeout wrapper to prevent hanging
      const sendPromise = transporter.sendMail(mailOptions);
      const timeoutPromise = new Promise<never>((_, reject) => {
        setTimeout(() => reject(new Error(`Email send timeout after ${sendTimeout / 1000} seconds`)), sendTimeout);
      });

      const info = await Promise.race([sendPromise, timeoutPromise]);
      console.log("Verification email sent:", info.messageId);
      // Close transporter connection pool after successful send
      transporter.close();
      return true;
    } catch (error) {
      const isLastAttempt = attempt === retries;
      
      if (isLastAttempt) {
        // Log detailed error information for debugging
        const smtpError = error as SMTPError;
        console.error(`Failed to send verification email after ${retries + 1} attempts:`, {
          error: error instanceof Error ? error.message : String(error),
          code: smtpError?.code,
          command: smtpError?.command,
          response: smtpError?.response,
          responseCode: smtpError?.responseCode,
          env: process.env.NODE_ENV,
          host: "mail.privateemail.com",
          port: 587,
        });
        // Close transporter connection pool on failure
        transporter.close();
        throw error;
      }

      // Wait before retry (exponential backoff: 1s, 2s, 4s...)
      const waitTime = Math.pow(2, attempt) * 1000;
      const smtpError = error as SMTPError;
      console.log(`Email send attempt ${attempt + 1} failed, retrying in ${waitTime}ms...`, {
        error: error instanceof Error ? error.message : String(error),
        code: smtpError?.code,
      });
      await new Promise((resolve) => setTimeout(resolve, waitTime));
    }
  }

  return false;
};
