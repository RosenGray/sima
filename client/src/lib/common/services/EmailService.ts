import { MailerSend, EmailParams, Sender, Recipient } from "mailersend";
import {
  SENDER_EMAIL,
  SENDER_NAME,
  SUPPORT_EMAIL,
  UNVERIFIED_ACCOUNT_DELETION_DAYS,
} from "@/lib/common/email/constants";
import { getVerificationEmailHtml } from "@/lib/common/email/templates/verification";
import { getPasswordResetEmailHtml } from "@/lib/common/email/templates/passwordReset";
import { getPasswordResetSuccessEmailHtml } from "@/lib/common/email/templates/passwordResetSuccess";
import { getDeletionWarningEmailHtml } from "@/lib/common/email/templates/deletionWarning";
import { getAccountDeletionEmailHtml } from "@/lib/common/email/templates/accountDeletion";
import {
  getNewMessageEmailHtml,
  type NewMessageEmailParams,
} from "@/lib/common/email/templates/newMessage";
import {
  getAdPublishedEmailHtml,
  getAdPublishedEmailText,
} from "@/lib/common/email/templates/adPublished";

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
      const html = getVerificationEmailHtml(verificationLink);
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
      const html = getPasswordResetEmailHtml(resetLink);
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
      const html = getDeletionWarningEmailHtml(daysLeft, verificationLink);
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
      const html = getPasswordResetSuccessEmailHtml();
      const text =
        "Ваш пароль был успешно изменен. Если вы не выполняли это действие, пожалуйста, немедленно свяжитесь с нами.";

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
      const html = getAccountDeletionEmailHtml();
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
        throw new Error(
          result.error || "Failed to send account deletion email"
        );
      }
    } catch (error) {
      console.error("Error sending account deletion email:", error);
      throw error;
    }
  }

  /**
   * Send new private message notification email
   */
  static async sendNewMessageNotificationEmail(
    params: NewMessageEmailParams & { recipientEmail: string },
    retries: number = 1
  ): Promise<boolean> {
    try {
      const { recipientEmail, senderName, conversationUrl, ...rest } = params;
      const sender = EmailService.getSender();
      const recipient = EmailService.getRecipient(recipientEmail);
      const html = getNewMessageEmailHtml({ senderName, conversationUrl, ...rest });
      const text = `${senderName} написал(а) вам сообщение. Откройте переписку: ${conversationUrl}`;

      const emailParams = new EmailParams()
        .setFrom(sender)
        .setTo([recipient])
        .setReplyTo(sender)
        .setSubject(`Новое сообщение от ${senderName} - Sima`)
        .setHtml(html)
        .setText(text);

      const result = await EmailService.sendEmailWithRetry(emailParams, retries);

      if (result.success) {
        console.log("New message notification email sent:", result.messageId);
        return true;
      } else {
        throw new Error(result.error || "Failed to send new message notification email");
      }
    } catch (error) {
      console.error("Error sending new message notification email:", error);
      throw error;
    }
  }

  /**
   * Send ad published confirmation email to the ad creator
   */
  static async sendAdPublishedEmail(
    params: { recipientEmail: string; categoryName: string; adLink: string },
    retries: number = 1
  ): Promise<boolean> {
    try {
      const { recipientEmail, categoryName, adLink } = params;
      const sender = EmailService.getSender();
      const recipient = EmailService.getRecipient(recipientEmail);
      const html = getAdPublishedEmailHtml({ categoryName, adLink });
      const text = getAdPublishedEmailText({ categoryName, adLink });

      const emailParams = new EmailParams()
        .setFrom(sender)
        .setTo([recipient])
        .setReplyTo(sender)
        .setSubject("Ваше объявление опубликовано - Sima")
        .setHtml(html)
        .setText(text);

      const result = await EmailService.sendEmailWithRetry(emailParams, retries);

      if (result.success) {
        console.log("Ad published email sent:", result.messageId);
        return true;
      } else {
        throw new Error(result.error || "Failed to send ad published email");
      }
    } catch (error) {
      console.error("Error sending ad published email:", error);
      throw error;
    }
  }

  /**
   * Send contact form submission to support (plain text, no template)
   */
  static async sendContactUsEmail(
    params: { name: string; email: string; subject?: string; message: string },
    retries: number = 2
  ): Promise<boolean> {
    try {
      const { name, email, subject, message } = params;
      const sender = EmailService.getSender();
      const recipient = EmailService.getRecipient(SUPPORT_EMAIL);
      const replyTo = EmailService.getRecipient(email, name);

      const subjectLine = subject?.trim()
        ? `Контакты: ${subject}`
        : "Новое сообщение - Sima";

      const text = [
        `Имя: ${name}`,
        `Email: ${email}`,
        subject?.trim() ? `Тема: ${subject}` : null,
        "",
        "Сообщение:",
        message,
      ]
        .filter(Boolean)
        .join("\n");

      const emailParams = new EmailParams()
        .setFrom(sender)
        .setTo([recipient])
        .setReplyTo(replyTo)
        .setSubject(subjectLine)
        .setText(text);

      const result = await EmailService.sendEmailWithRetry(
        emailParams,
        retries
      );

      if (result.success) {
        console.log("Contact us email sent:", result.messageId);
        return true;
      } else {
        throw new Error(
          result.error || "Failed to send contact us email"
        );
      }
    } catch (error) {
      console.error("Error sending contact us email:", error);
      throw error;
    }
  }
}
