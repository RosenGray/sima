import type { Metadata } from "next";
import { ProfessionalPageLayoutSection } from "./layout.styles";

export const metadata: Metadata = {
  title: "Профессиональная страница",
  description: "Профессиональная страница специалиста",
};

export default function ProfessionalPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ProfessionalPageLayoutSection>
      {children}
    </ProfessionalPageLayoutSection>
  );
}
