import { MailerSend, EmailParams, Sender, Recipient } from "mailersend";

// Configuration constants
const TOKEN_EXPIRATION_MINUTES = 15;
const UNVERIFIED_ACCOUNT_DELETION_DAYS = 21;
const SENDER_EMAIL = "noreply@sima-board.com";
const SENDER_NAME = "Sima Board";
const SUPPORT_EMAIL = "support@sima-board.com";

// Email sending result type
export interface EmailSendResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

// MailerSend error type
interface MailerSendError extends Error {
  statusCode?: number;
  body?: {
    message?: string;
    errors?: Array<{ message?: string }>;
  };
}

/**
 * Unified Email Service using MailerSend API
 * Handles all email sending operations for the application
 */
export class EmailService {
  private static client: MailerSend | null = null;

  /**
   * Get or create MailerSend client instance (singleton pattern)
   */
  private static getClient(): MailerSend {
    if (!EmailService.client) {
      const apiKey = process.env.MAILER_SEND_API_KEY;
      if (!apiKey) {
        throw new Error("MAILER_SEND_API_KEY environment variable is not set");
      }
      EmailService.client = new MailerSend({
        apiKey,
      });
    }
    return EmailService.client;
  }

  /**
   * Get sender configuration
   */
  private static getSender(): Sender {
    return new Sender(SENDER_EMAIL, SENDER_NAME);
  }

  /**
   * Get recipient from email address
   */
  private static getRecipient(email: string, name?: string): Recipient {
    return new Recipient(email, name || email);
  }

  /**
   * Send email with retry logic and error handling
   */
  private static async sendEmailWithRetry(
    emailParams: EmailParams,
    retries: number = 2
  ): Promise<EmailSendResult> {
    const client = EmailService.getClient();
    const isProduction = process.env.NODE_ENV === "production";
    const sendTimeout = isProduction ? 45000 : 20000; // 45s production, 20s dev

    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        // Add timeout wrapper to prevent hanging
        const sendPromise = client.email.send(emailParams);
        const timeoutPromise = new Promise<never>((_, reject) => {
          setTimeout(
            () =>
              reject(
                new Error(
                  `Email send timeout after ${sendTimeout / 1000} seconds`
                )
              ),
            sendTimeout
          );
        });

        const result = await Promise.race([sendPromise, timeoutPromise]);
        console.log("Email sent successfully:", result);
        return {
          success: true,
          messageId: result.body?.message_id || "unknown",
        };
      } catch (error) {
        const isLastAttempt = attempt === retries;

        if (isLastAttempt) {
          // Log detailed error information for debugging
          const mailerError = error as MailerSendError;
          console.error(
            `Failed to send email after ${retries + 1} attempts:`,
            {
              error: error instanceof Error ? error.message : String(error),
              statusCode: mailerError?.statusCode,
              body: mailerError?.body,
              env: process.env.NODE_ENV,
            }
          );
          return {
            success: false,
            error:
              error instanceof Error
                ? error.message
                : "Unknown error occurred",
          };
        }

        // Wait before retry (exponential backoff: 1s, 2s, 4s...)
        const waitTime = Math.pow(2, attempt) * 1000;
        const mailerError = error as MailerSendError;
        console.log(
          `Email send attempt ${attempt + 1} failed, retrying in ${waitTime}ms...`,
          {
            error: error instanceof Error ? error.message : String(error),
            statusCode: mailerError?.statusCode,
          }
        );
        await new Promise((resolve) => setTimeout(resolve, waitTime));
      }
    }

    return {
      success: false,
      error: "Failed to send email after all retry attempts",
    };
  }

  /**
   * Email Verification Template
   */
  private static getVerificationTemplate(
    verificationLink: string
  ): string {
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
          <p>Если у вас возникли вопросы, пожалуйста свяжитесь с нами по адресу ${SUPPORT_EMAIL}</p>
        </div>
      </div>
    </body>
    </html>
  `;
  }

  /**
   * Password Reset Email Template
   */
  private static getPasswordResetTemplate(resetLink: string): string {
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
          <p>Если у вас возникли вопросы, пожалуйста свяжитесь с нами по адресу ${SUPPORT_EMAIL}</p>
        </div>
      </div>
    </body>
    </html>
  `;
  }

  /**
   * Password Reset Success Email Template
   */
  private static getPasswordResetSuccessTemplate(): string {
    return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Пароль успешно изменен</title>
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
          background-color: #d4edda;
          padding: 20px;
          text-align: center;
          border-radius: 5px;
          border: 2px solid #28a745;
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
        .success-box {
          background-color: #d4edda;
          border-left: 4px solid #28a745;
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
          <h2>Пароль успешно изменен</h2>
        </div>
        <div class="content">
          <p>Здравствуйте,</p>
          
          <div class="success-box">
            <strong>Ваш пароль был успешно изменен.</strong>
          </div>
          
          <p>Мы подтверждаем, что ваш пароль был успешно изменен. Если вы не выполняли это действие, пожалуйста, немедленно свяжитесь с нами.</p>
          
          <p><strong>Рекомендации по безопасности:</strong></p>
          <ul>
            <li>Используйте надежный и уникальный пароль</li>
            <li>Не сообщайте свой пароль никому</li>
            <li>Если вы подозреваете несанкционированный доступ, немедленно свяжитесь с нашей службой поддержки</li>
          </ul>
          
          <p>Если у вас возникли вопросы или проблемы, пожалуйста, свяжитесь с нами по адресу ${SUPPORT_EMAIL}</p>
          
          <p>С наилучшими пожеланиями,<br>Команда Sima</p>
        </div>
        <div class="footer">
          <p>Это автоматическое сообщение, пожалуйста, не отвечайте на него.</p>
          <p>Если у вас возникли вопросы, пожалуйста свяжитесь с нами по адресу ${SUPPORT_EMAIL}</p>
        </div>
      </div>
    </body>
    </html>
  `;
  }

  /**
   * Account Deletion Warning Email Template
   */
  private static getDeletionWarningTemplate(
    daysLeft: number,
    verificationLink: string
  ): string {
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
          <p>Если у вас возникли вопросы, пожалуйста свяжитесь с нами по адресу ${SUPPORT_EMAIL}</p>
        </div>
      </div>
    </body>
    </html>
  `;
  }

  /**
   * Account Deletion Email Template
   */
  private static getAccountDeletionTemplate(): string {
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
          <p>Если у вас возникли вопросы, пожалуйста свяжитесь с нами по адресу ${SUPPORT_EMAIL}</p>
        </div>
      </div>
    </body>
    </html>
  `;
  }

  /**
   * Send email verification email
   */
  static async sendVerificationEmail(
    email: string,
    verificationLink: string,
    retries: number = 2
  ): Promise<boolean> {
    try {
      const sender = EmailService.getSender();
      const recipient = EmailService.getRecipient(email);
      const html = EmailService.getVerificationTemplate(verificationLink);
      const text = `Подтвердите вашу электронную почту, перейдя по ссылке: ${verificationLink}`;

      const emailParams = new EmailParams()
        .setFrom(sender)
        .setTo([recipient])
        .setReplyTo(sender)
        .setSubject("Подтвердите вашу электронную почту - Sima")
        .setHtml(html)
        .setText(text);

      const result = await EmailService.sendEmailWithRetry(
        emailParams,
        retries
      );

      if (result.success) {
        console.log("Verification email sent:", result.messageId);
        return true;
      } else {
        throw new Error(result.error || "Failed to send verification email");
      }
    } catch (error) {
      console.error("Error sending verification email:", error);
      throw error;
    }
  }

  /**
   * Send password reset email
   */
  static async sendPasswordResetEmail(
    email: string,
    resetLink: string,
    retries: number = 2
  ): Promise<boolean> {
    try {
      const sender = EmailService.getSender();
      const recipient = EmailService.getRecipient(email);
      const html = EmailService.getPasswordResetTemplate(resetLink);
      const text = `Сбросьте ваш пароль, перейдя по ссылке: ${resetLink}`;

      const emailParams = new EmailParams()
        .setFrom(sender)
        .setTo([recipient])
        .setReplyTo(sender)
        .setSubject("Reset Your Password")
        .setHtml(html)
        .setText(text);

      const result = await EmailService.sendEmailWithRetry(
        emailParams,
        retries
      );

      if (result.success) {
        console.log("Password reset email sent:", result.messageId);
        return true;
      } else {
        throw new Error(result.error || "Failed to send password reset email");
      }
    } catch (error) {
      console.error("Error sending password reset email:", error);
      throw error;
    }
  }

  /**
   * Send account deletion warning email
   */
  static async sendDeletionWarningEmail(
    email: string,
    daysLeft: number,
    verificationLink: string,
    retries: number = 2
  ): Promise<boolean> {
    try {
      const sender = EmailService.getSender();
      const recipient = EmailService.getRecipient(email);
      const html = EmailService.getDeletionWarningTemplate(
        daysLeft,
        verificationLink
      );
      const daysText =
        daysLeft === 1
          ? "день"
          : daysLeft <= 4
          ? "дня"
          : "дней";
      const text = `Ваш аккаунт будет удален через ${daysLeft} ${daysText}. Подтвердите email по ссылке: ${verificationLink}`;

      const emailParams = new EmailParams()
        .setFrom(sender)
        .setTo([recipient])
        .setReplyTo(sender)
        .setSubject(
          `⚠️ Ваш аккаунт будет удален через ${daysLeft} ${daysText} - Sima`
        )
        .setHtml(html)
        .setText(text);

      const result = await EmailService.sendEmailWithRetry(
        emailParams,
        retries
      );

      if (result.success) {
        console.log("Deletion warning email sent:", result.messageId);
        return true;
      } else {
        throw new Error(
          result.error || "Failed to send deletion warning email"
        );
      }
    } catch (error) {
      console.error("Error sending deletion warning email:", error);
      throw error;
    }
  }

  /**
   * Send password reset success email
   */
  static async sendPasswordResetSuccessEmail(
    email: string,
    retries: number = 2
  ): Promise<boolean> {
    try {
      const sender = EmailService.getSender();
      const recipient = EmailService.getRecipient(email);
      const html = EmailService.getPasswordResetSuccessTemplate();
      const text = "Ваш пароль был успешно изменен. Если вы не выполняли это действие, пожалуйста, немедленно свяжитесь с нами.";

      const emailParams = new EmailParams()
        .setFrom(sender)
        .setTo([recipient])
        .setReplyTo(sender)
        .setSubject("Пароль успешно изменен - Sima")
        .setHtml(html)
        .setText(text);

      const result = await EmailService.sendEmailWithRetry(
        emailParams,
        retries
      );

      if (result.success) {
        console.log("Password reset success email sent:", result.messageId);
        return true;
      } else {
        throw new Error(
          result.error || "Failed to send password reset success email"
        );
      }
    } catch (error) {
      console.error("Error sending password reset success email:", error);
      throw error;
    }
  }

  /**
   * Send account deletion email
   */
  static async sendAccountDeletionEmail(
    email: string,
    retries: number = 2
  ): Promise<boolean> {
    try {
      const sender = EmailService.getSender();
      const recipient = EmailService.getRecipient(email);
      const html = EmailService.getAccountDeletionTemplate();
      const text = `Ваш аккаунт в Sima был удален, так как email не был подтвержден в течение ${UNVERIFIED_ACCOUNT_DELETION_DAYS} дней.`;

      const emailParams = new EmailParams()
        .setFrom(sender)
        .setTo([recipient])
        .setReplyTo(sender)
        .setSubject("Ваш аккаунт был удален - Sima")
        .setHtml(html)
        .setText(text);

      const result = await EmailService.sendEmailWithRetry(
        emailParams,
        retries
      );

      if (result.success) {
        console.log("Account deletion email sent:", result.messageId);
        return true;
      } else {
        throw new Error(result.error || "Failed to send account deletion email");
      }
    } catch (error) {
      console.error("Error sending account deletion email:", error);
      throw error;
    }
  }
}

