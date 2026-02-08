import type { Metadata } from "next";
import { Theme as RadixTheme } from "@radix-ui/themes";
import { ThemeProvider } from "next-themes";
import "@radix-ui/themes/styles.css";
import "./../globals.css";
import LayoutBackground from "@/components/LayoutBackground/LayoutBackground";
import { RADIX_THEME_APP_ID, RADIX_THEME_PORTAL_ID } from "@/config/client";
import { getCurrentUser } from "@/lib/auth/utils/auth.utils";
import { getLikedAdIdsByUser } from "@/lib/likes/repository/LikesRepository";
import { serviceCategoryRepository } from "@/lib/service-categories/repositories";
import { AuthProvider } from "@/providers/AuthProvider/AuthProvider";
import HomePageProvider from "@/providers/HomePageProvider/HomePageProvider";
import { LikesProvider } from "@/providers/LikesProvider/LikesProvider";
import StyledComponentsRegistry from "@/providers/StyledRegistry/StyledRegistry";
import EmailVerificationBanner from "@/components/EmailVerificationBanner/EmailVerificationBanner";
import { RubikFont } from "@/fonts/fonts";
import { PortalProvider } from "@/providers/PortalProvider/PortalProvider";
// import AccessibilikComponent from "@/components/Accessibilik/Accessibilik";
import Accessibilik from "accessibility-react-widget";
import { GoogleTagManager } from "@next/third-parties/google";

// Mark as dynamic because we use cookies in getCurrentUser
export const dynamic = "force-dynamic";

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
  const [user, serviceCategories] = await Promise.all([
    getCurrentUser(),
    serviceCategoryRepository.getAll(),
  ]);
  const initialLikedIds = user ? await getLikedAdIdsByUser(user.id) : {};

  return (
    <html className={RubikFont.className} lang="ru" suppressHydrationWarning>
      <GoogleTagManager gtmId="G-X15DR6QH3X" />
      <body>
        <StyledComponentsRegistry>
          <AuthProvider initialUser={user}>
            <LikesProvider initialLikedIds={initialLikedIds}>
              <ThemeProvider
                attribute="class"
                enableSystem
                enableColorScheme
                storageKey="sima-theme"
              >
                <HomePageProvider data={{ serviceCategories }}>
                  <RadixTheme
                    className="globalContentOverflowWrapper"
                    accentColor="red"
                    id={RADIX_THEME_APP_ID}
                  >
                    {user && !user.isEmailVerified && (
                      <EmailVerificationBanner userEmail={user.email} />
                    )}

                    <PortalProvider>
                      <Accessibilik />
                      <div className="SimaApp">{children}</div>
                    </PortalProvider>
                    <RadixTheme id={RADIX_THEME_PORTAL_ID} accentColor="red" />
                    <LayoutBackground />
                  </RadixTheme>
                </HomePageProvider>
              </ThemeProvider>
            </LikesProvider>
          </AuthProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
