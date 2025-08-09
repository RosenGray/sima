import type { Metadata } from "next";
import { Theme as RadixTheme } from "@radix-ui/themes";
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
    <html lang="en">
      <body>
        <RadixTheme accentColor="red">{children}

          <LayoutBackground />
        </RadixTheme>
      </body>
    </html>
  );
}
