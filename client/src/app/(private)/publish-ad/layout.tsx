// import SimpleHeader from "@/components/Header/SimpleHeader/SimpleHeader";
import Header from "@/components/Header";
import type { Metadata } from "next";
import { PublishAdLayoutSection } from "./layout.styles";

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
    <PublishAdLayoutSection >
      {/* <SimpleHeader /> */}
      <Header />
      <main>{children}</main>
    </PublishAdLayoutSection>
  );
}
