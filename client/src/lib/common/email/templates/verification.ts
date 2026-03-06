import { SUPPORT_EMAIL, TOKEN_EXPIRATION_MINUTES, LOGO_URL } from "../constants";

export function getVerificationEmailHtml(verificationLink: string): string {
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
          <img src="${LOGO_URL}" alt="Sima" />
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
