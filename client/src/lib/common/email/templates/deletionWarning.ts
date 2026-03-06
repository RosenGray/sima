import { SUPPORT_EMAIL, LOGO_URL } from "../constants";

function daysWord(daysLeft: number): string {
  return daysLeft === 1 ? "день" : daysLeft <= 4 ? "дня" : "дней";
}

export function getDeletionWarningEmailHtml(
  daysLeft: number,
  verificationLink: string
): string {
  const word = daysWord(daysLeft);
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
          <img src="${LOGO_URL}" alt="Sima" />
        </div>
        <div class="header">
          <h2>⚠️ Предупреждение об удалении аккаунта</h2>
        </div>
        <div class="content">
          <p>Здравствуйте,</p>
          
          <div class="warning">
            <strong>Ваш аккаунт будет удален через ${daysLeft} ${word}!</strong>
          </div>
          
          <p>Вы зарегистрировались в Sima, но еще не подтвердили свой адрес электронной почты.</p>
          
          <p>Чтобы сохранить ваш аккаунт, пожалуйста, подтвердите ваш email, нажав на кнопку ниже:</p>
          
          <div style="text-align: center;">
            <a href="${verificationLink}" class="button">Подтвердить email и сохранить аккаунт</a>
          </div>
          
          <p><strong>Что произойдет, если вы не подтвердите email?</strong></p>
          <ul>
            <li>Ваш аккаунт будет автоматически удален через ${daysLeft} ${word}</li>
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
