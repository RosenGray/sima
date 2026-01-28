import type { Metadata } from "next";
import { PublishAdLayoutSection } from "./layout.styles";
import SimpleHeader from "@/components/Header/SimpleHeader/SimpleHeader";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Публикация нового объявления",
  description: "Публикация нового объявления",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <PublishAdLayoutSection>
      <SimpleHeader />
      <main>{children}</main>
    </PublishAdLayoutSection>
  );
}
