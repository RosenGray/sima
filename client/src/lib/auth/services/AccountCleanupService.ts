import { User } from "../models/User";
import connectDB from "@/lib/mongo/mongodb";
import nodemailer from "nodemailer";
import { generateToken, storeVerificationToken } from "./TokenManager/TokenManager";

// Configuration - PRODUCTION MODE
export const UNVERIFIED_ACCOUNT_DELETION_DAYS = 21;
export const DELETION_WARNING_DAYS = [14, 18, 20];

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

export const getDeletionWarningEmailTemplate = (
  daysLeft: number,
  verificationLink: string
) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Предупреждение об удалении аккаунта</title>
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
          background-color: #fff3cd;
          padding: 20px;
          text-align: center;
          border-radius: 5px;
          border: 2px solid #ffc107;
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
          background-color: #dc3545;
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
        .warning {
          background-color: #fff3cd;
          border-left: 4px solid #ffc107;
          padding: 15px;
          margin: 20px 0;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="logo">
          <img src="https://f003.backblazeb2.com/file/sima-board-public/public/sima.dark.logo.png" alt="Sima" />
        </div>
        <div class="header">
          <h2>⚠️ Предупреждение об удалении аккаунта</h2>
        </div>
        <div class="content">
          <p>Здравствуйте,</p>
          
          <div class="warning">
            <strong>Ваш аккаунт будет удален через ${daysLeft} ${daysLeft === 1 ? "день" : daysLeft <= 4 ? "дня" : "дней"}!</strong>
          </div>
          
          <p>Вы зарегистрировались в Sima, но еще не подтвердили свой адрес электронной почты.</p>
          
          <p>Чтобы сохранить ваш аккаунт, пожалуйста, подтвердите ваш email, нажав на кнопку ниже:</p>
          
          <div style="text-align: center;">
            <a href="${verificationLink}" class="button">Подтвердить email и сохранить аккаунт</a>
          </div>
          
          <p><strong>Что произойдет, если вы не подтвердите email?</strong></p>
          <ul>
            <li>Ваш аккаунт будет автоматически удален через ${daysLeft} ${daysLeft === 1 ? "день" : daysLeft <= 4 ? "дня" : "дней"}</li>
            <li>Все ваши данные будут безвозвратно потеряны</li>
            <li>Вам потребуется зарегистрироваться заново</li>
          </ul>
          
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

export const getAccountDeletionEmailTemplate = () => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Аккаунт удален</title>
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
          background-color: #f8d7da;
          padding: 20px;
          text-align: center;
          border-radius: 5px;
          border: 2px solid #dc3545;
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
          <h2>Ваш аккаунт был удален</h2>
        </div>
        <div class="content">
          <p>Здравствуйте,</p>
          
          <p>Ваш аккаунт в Sima был удален, так как email не был подтвержден в течение ${UNVERIFIED_ACCOUNT_DELETION_DAYS} дней.</p>
          
          <p>Если вы хотите продолжить использовать наши услуги, вы можете зарегистрироваться заново на нашем сайте.</p>
          
          <p>Мы надеемся увидеть вас снова!</p>
          
          <p>С наилучшими пожеланиями,<br>Команда Sima</p>
        </div>
        <div class="footer">
          <p>Это автоматическое сообщение, пожалуйста, не отвечайте на него.</p>
          <p>Если у вас возникли вопросы, пожалуйста свяжитесь с нами по адресу ${GMAIL_APP_USER}</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

export const sendDeletionWarningEmail = async (
  email: string,
  daysLeft: number,
  verificationLink: string
) => {
  try {
    const transporter = getTransporter();
    const mailOptions = {
      from: GMAIL_APP_USER,
      to: email,
      subject: `⚠️ Ваш аккаунт будет удален через ${daysLeft} ${daysLeft === 1 ? "день" : daysLeft <= 4 ? "дня" : "дней"} - Sima`,
      html: getDeletionWarningEmailTemplate(daysLeft, verificationLink),
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Deletion warning email sent:", info.messageId);
    return true;
  } catch (error) {
    console.error("Error sending deletion warning email:", error);
    return false;
  }
};

export const sendAccountDeletionEmail = async (email: string) => {
  try {
    const transporter = getTransporter();
    const mailOptions = {
      from: GMAIL_APP_USER,
      to: email,
      subject: "Ваш аккаунт был удален - Sima",
      html: getAccountDeletionEmailTemplate(),
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Account deletion email sent:", info.messageId);
    return true;
  } catch (error) {
    console.error("Error sending account deletion email:", error);
    return false;
  }
};

interface CleanupResult {
  warningsSent: number;
  accountsDeleted: number;
  errors: number;
}

export const processAccountCleanup = async (): Promise<CleanupResult> => {
  try {
    await connectDB();

    const now = new Date();
    let warningsSent = 0;
    let accountsDeleted = 0;
    let errors = 0;

    // Find all unverified accounts
    const unverifiedUsers = await User.find({
      isEmailVerified: false,
      createdAt: { $exists: true },
    });

    for (const user of unverifiedUsers) {
      try {
        const createdAt = user.createdAt as Date;
        const daysSinceCreation = Math.floor(
          (now.getTime() - createdAt.getTime()) / (1000 * 60 * 60 * 24)
        );

        // Delete account if it's been more than UNVERIFIED_ACCOUNT_DELETION_DAYS
        if (daysSinceCreation >= UNVERIFIED_ACCOUNT_DELETION_DAYS) {
          await User.deleteOne({ _id: user._id });
          await sendAccountDeletionEmail(user.email);
          accountsDeleted++;
          console.log(`Deleted unverified account: ${user.email}`);
          continue;
        }

        // Send warning emails at specific intervals
        for (const warningDay of DELETION_WARNING_DAYS) {
          if (daysSinceCreation === warningDay) {
            const daysLeft = UNVERIFIED_ACCOUNT_DELETION_DAYS - daysSinceCreation;
            
            // Generate fresh verification token
            const verificationToken = generateToken();
            await storeVerificationToken(user.email, verificationToken);
            
            const { NEXT_PUBLIC_CLIENT_URL } = process.env;
            const verificationLink = `${NEXT_PUBLIC_CLIENT_URL}/auth/verify-email/${verificationToken}`;
            
            await sendDeletionWarningEmail(user.email, daysLeft, verificationLink);
            warningsSent++;
            console.log(`Sent warning email to ${user.email}, ${daysLeft} days left`);
            break;
          }
        }
      } catch (error) {
        console.error(`Error processing user ${user.email}:`, error);
        errors++;
      }
    }

    return {
      warningsSent,
      accountsDeleted,
      errors,
    };
  } catch (error) {
    console.error("Error in processAccountCleanup:", error);
    throw error;
  }
};

