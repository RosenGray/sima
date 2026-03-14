import type { Metadata } from "next";
import Header from "@/components/Header/Header/Header";

export const metadata: Metadata = {
  title: "Карта сайта | Sima",
  description: "Все разделы и страницы сайта Sima",
};

export default function SitemapLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
}
