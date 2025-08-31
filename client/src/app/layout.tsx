import type { Metadata } from "next";
import { Theme as RadixTheme } from "@radix-ui/themes";
import { ThemeProvider } from "next-themes";
import "@radix-ui/themes/styles.css";
import "./../globals.css";
import LayoutBackground from "@/components/LayoutBackground/LayoutBackground";

export const metadata: Metadata = {
  title: "Sima Marketplace",
  description:
    "Discover amazing products, connect with sellers, and build your business in our vibrant marketplace community.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <RadixTheme className="globalContentOverflowWrapper" accentColor="red">
            <div className="SimaApp">
              {children}
            </div>
            <LayoutBackground />
          </RadixTheme>
        </ThemeProvider>
      </body>
    </html>
  );
}
