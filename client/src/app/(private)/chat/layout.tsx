import { Metadata } from "next";
import { ChatLayoutSection } from "./layout.styles";
import SimpleHeader from "@/components/Header/SimpleHeader/SimpleHeader";

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
        <SimpleHeader />
        <main>{children}</main>
      </ChatLayoutSection>
    );
  }
  