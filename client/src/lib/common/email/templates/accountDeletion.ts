import {
  SUPPORT_EMAIL,
  LOGO_URL,
  UNVERIFIED_ACCOUNT_DELETION_DAYS,
} from "../constants";

export function getAccountDeletionEmailHtml(): string {
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
          <img src="${LOGO_URL}" alt="Sima" />
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
