import type { Metadata } from "next";
import { Theme as RadixTheme } from "@radix-ui/themes";
import { ThemeProvider } from "next-themes";
import "@radix-ui/themes/styles.css";
import "./../globals.css";
import LayoutBackground from "@/components/LayoutBackground/LayoutBackground";
import { RADIX_THEME_APP_ID, RADIX_THEME_PORTAL_ID } from "@/config/client";
import { getCurrentUser } from "@/lib/auth/utils/auth.utils";
import { AuthProvider } from "@/providers/AuthProvider/AuthProvider";

export const metadata: Metadata = {
  title: "Sima Marketplace",
  description:
    "Discover amazing products, connect with sellers, and build your business in our vibrant marketplace community.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getCurrentUser();

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <AuthProvider initialUser={user}>
          <ThemeProvider
            attribute="class"
       
            enableSystem
            enableColorScheme
            storageKey="sima-theme"
          >
            <RadixTheme
              className="globalContentOverflowWrapper"
              accentColor="red"
              id={RADIX_THEME_APP_ID}
            >
              <div className="SimaApp">{children}</div>
              <LayoutBackground />
            </RadixTheme>
            <RadixTheme
              id={RADIX_THEME_PORTAL_ID}
              style={{ height: "auto", minHeight: "auto" }}
              accentColor="indigo"
            />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
