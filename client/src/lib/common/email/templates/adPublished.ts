import { SUPPORT_EMAIL, LOGO_URL } from "../constants";

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export interface AdPublishedEmailParams {
  categoryName: string;
  adLink: string;
}

export function getAdPublishedEmailHtml(params: AdPublishedEmailParams): string {
  const { categoryName, adLink } = params;
  const safeCategory = escapeHtml(categoryName);

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Ваше объявление опубликовано - Sima</title>
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
        .info-box {
          background-color: #f4f4f4;
          border-left: 4px solid #2b2543;
          padding: 12px 16px;
          margin: 16px 0;
          border-radius: 0 4px 4px 0;
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
        .tips {
          margin: 16px 0;
          padding-left: 20px;
        }
        .tips li {
          margin-bottom: 8px;
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
          <h2>Ваше объявление опубликовано!</h2>
        </div>
        <div class="content">
          <p>Ваше объявление в категории <strong>${safeCategory}</strong> успешно опубликовано и уже доступно для просмотра.</p>

          <div class="info-box">
            <p style="margin: 0;">Посмотреть объявление: <a href="${adLink}">${adLink}</a></p>
          </div>

          <div style="text-align: center;">
            <a href="${adLink}" class="button">Открыть объявление</a>
          </div>

          <p><strong>Что дальше?</strong></p>
          <ul class="tips">
            <li>Поделитесь объявлением с друзьями и в социальных сетях</li>
            <li>Отвечайте на сообщения быстро — это повышает шансы найти клиентов</li>
          </ul>

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

export function getAdPublishedEmailText(params: AdPublishedEmailParams): string {
  const { categoryName, adLink } = params;
  return `Ваше объявление в категории "${categoryName}" опубликовано!\n\nСсылка на объявление: ${adLink}\n\nЧто дальше?\n- Поделитесь объявлением с друзьями и в социальных сетях\n- Отвечайте на сообщения быстро — это повышает шансы найти клиентов\n\nЕсли у вас возникли вопросы, свяжитесь с нами: ${SUPPORT_EMAIL}`;
}
