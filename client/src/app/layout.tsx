import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import Providers from "./providers";
import { Theme } from "@radix-ui/themes";
import { config } from "@/utils/config";
import "@radix-ui/themes/styles.css";
import "./globals.css";
import { generateBackblazeUrl } from "@/utils/common";
import LayoutBackground from "@/components/LayoutBackground/LayoutBackground";

import { AuthProvider } from "@/providers/AuthProvider/AuthProvider";
import { fetchClient } from "@/fetch/fetch.utils";
import { User } from "@/types/auth/auth.types";
import Link from "next/link";

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
        url: generateBackblazeUrl("public", "sima.dark.logo.png"),
      },
    ],
  },

  alternates: {
    canonical: "https://www.sima-board.com/",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await fetchClient<{ currentUser: User }, { currentUser: null }>(
    "/api/auth/currentuser",
    {
      // cache: "force-cache",
    }
  );
  const { currentUser } = await user.json();

  return (
    <html lang="ru" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        {/* <Script
          defer
          src="https://acc-landing.vercel.app/accessibilik.min.js"
        ></Script> */}

        <AuthProvider initialUser={currentUser}>
          <Providers>
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem={true}
              storageKey="sima-theme"
              enableColorScheme
              disableTransitionOnChange
            >
              <Theme
                className="globalContentOverflowWrapper"
                id={config.RADIX_THEME_APP_ID}
                accentColor="red"
              >
                <div className="SimaApp">{children}</div>

                <LayoutBackground />
              </Theme>
              <Theme
                id={config.RADIX_THEME_PORTAL_ID}
                style={{ height: "auto", minHeight: "auto" }}
                accentColor="indigo"
              />
            </ThemeProvider>
          </Providers>
        </AuthProvider>
      </body>
    </html>
  );
}
