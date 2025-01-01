import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import StoreProvider from "./StoreProvider";
import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import "./globals.css";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

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
        url: "",
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
        {/* <Script
          defer
          src="https://acc-landing.vercel.app/accessibilik.min.js"
        ></Script> */}
        <StoreProvider>
          <ThemeProvider attribute="class">
            <Theme accentColor="indigo">{children}</Theme>
          </ThemeProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
