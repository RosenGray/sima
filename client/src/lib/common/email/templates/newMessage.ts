import { SUPPORT_EMAIL, LOGO_URL } from "../constants";

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export interface NewMessageEmailParams {
  recipientFirstName: string;
  senderName: string;
  messageBody: string;
  adTitle: string;
  conversationUrl: string;
}

export function getNewMessageEmailHtml(params: NewMessageEmailParams): string {
  const { recipientFirstName, senderName, messageBody, adTitle, conversationUrl } = params;
  const safeMessage = escapeHtml(messageBody);
  const safeSender = escapeHtml(senderName);
  const safeRecipient = escapeHtml(recipientFirstName);
  const safeAdTitle = escapeHtml(adTitle);

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Новое сообщение - Sima</title>
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
        .logo {
          width: 100%;
          margin: 0 auto 20px;
          background-color: #2b2543;
          height: 100px;
          text-align: center;
        }
        .header {
          background-color: #f8f9fa;
          padding: 20px;
          text-align: center;
          border-radius: 5px;
        }
        .content {
          padding: 20px;
        }
        .message-box {
          background-color: #f4f4f4;
          border-left: 4px solid #2b2543;
          padding: 12px 16px;
          margin: 16px 0;
          border-radius: 0 4px 4px 0;
          font-style: italic;
          color: #555555;
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
          <img src="${LOGO_URL}" alt="Sima" />
        </div>
        <div class="header">
          <h2>Новое сообщение</h2>
        </div>
        <div class="content">
          <p>Здравствуйте, ${safeRecipient}!</p>
          <p><strong>${safeSender}</strong> написал(а) вам сообщение по объявлению <strong>«${safeAdTitle}»</strong>:</p>

          <div class="message-box">
            ${safeMessage}
          </div>

          <div style="text-align: center;">
            <a href="${conversationUrl}" class="button">Открыть переписку</a>
          </div>

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
