import { Metadata } from "next";
import { ChatLayoutSection } from "./layout.styles";
import Header from "@/components/Header/Header/Header";

export const metadata: Metadata = {
    title: "Чаты",
    description: "Чаты",
  };
  
  export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <ChatLayoutSection>
        <Header />
        <main>{children}</main>
      </ChatLayoutSection>
    );
  }
  