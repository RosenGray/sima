import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import StoreProvider from "./StoreProvider";
import { Theme } from "@radix-ui/themes";
import { config } from "@/utils/config";
import "@radix-ui/themes/styles.css";
import "./globals.css";
import Script from "next/script";
import { generateBackblazeUrl } from "@/utils/common";

const inter = Inter({ subsets: ["latin"] });
const bla = generateBackblazeUrl('sima','sima.dark.logo.png')
console.log('bla',bla)
export const metadata: Metadata = {
  title:
    "Русская Доска объявлений Sima - Аренда квартир, Продажа, Автомобили, Вакансии, б/у товары",
  description:
    "Покупайте, продавайте и находите работу благодаря крупнейшей в стране базе квартир на продажу и аренду, автомобилей, вакансий и товаров",
  metadataBase: new URL("https://www.sima-board.com"),
  openGraph: {
    url: "https://www.sima-board.com/",
    title: "Sima",
    description: "Sima - Русская Доска объявлений Израиля",
    siteName: "Sima",
    type: "website",
    images: [
      {
        url: generateBackblazeUrl('sima','sima.dark.logo.png'),
      },
    ],
  },

  alternates: {
    canonical: "https://www.sima-board.com/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        <img src={generateBackblazeUrl('sima','sima.dark.logo.png')} alt="" />
        <img src={bla} alt="" />
        {/* <Script
          defer
          src="https://acc-landing.vercel.app/accessibilik.min.js"
        ></Script> */}
        <StoreProvider>
          <ThemeProvider attribute="class">
            <Theme id={config.RADIX_THEME_APP_ID} accentColor="indigo">
              {children}
            </Theme>
            <Theme id={config.RADIX_THEME_PORTAL_ID} style={{height:'auto',minHeight:'auto'}} accentColor="indigo" />
          </ThemeProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
