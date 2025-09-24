
import { scrypt, randomBytes } from "crypto";
import { promisify } from "util";
import nodemailer from "nodemailer";
import { TOKEN_EXPIRATION_MINUTES } from "./TokenManager/TokenManager";

const scryptAsync = promisify(scrypt);

export class PasswordManager {
  static async toHash(password: string) {
    const salt = randomBytes(8).toString("hex");
    const buf = (await scryptAsync(password, salt, 64)) as Buffer;

    return `${buf.toString("hex")}.${salt}`;
  }
  static async compare(storedPassword: string, suppliedPassword: string) {
    const [originalHashedPassword, salt] = storedPassword.split(".");
    const buf = (await scryptAsync(suppliedPassword, salt, 64)) as Buffer;
    return buf.toString("hex") === originalHashedPassword;
  }
}

//todo add from env
const GMAIL_APP_USER = "sima.customer@gmail.com";
const GMAIL_APP_PASSWORD = "npdm wzub ihci vssk";

// Create a function to get the transporter instead of creating it at module level
const getTransporter = () => {
  return nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: GMAIL_APP_USER,
      pass: GMAIL_APP_PASSWORD,
    },
  });
};

export const getPasswordResetEmailTemplate = (resetLink: string) => {
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
          <img src="https://f003.backblazeb2.com/file/sima-board-public/public/sima.dark.logo.png" alt="Sima" />
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
          <p>Если у вас возникли проблемы,пожалуйста свяжитесь с нами по адресу ${GMAIL_APP_USER}</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

export const sendPasswordResetEmail = async (email: string, resetLink: string) => {
  try {
    const transporter = getTransporter();
    const mailOptions = {
      from: GMAIL_APP_USER,
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
