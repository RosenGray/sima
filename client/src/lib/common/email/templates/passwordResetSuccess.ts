import { SUPPORT_EMAIL, LOGO_URL } from "../constants";

export function getPasswordResetSuccessEmailHtml(): string {
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
          <img src="${LOGO_URL}" alt="Sima" />
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
