import type { Metadata } from "next";
import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import "./../globals.css";

export const metadata: Metadata = {
  title: "Sima Marketplace",
  description: "Discover amazing products, connect with sellers, and build your business in our vibrant marketplace community.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Theme         accentColor="red">
          {children}
        </Theme>
      </body>
    </html>
  );
}
