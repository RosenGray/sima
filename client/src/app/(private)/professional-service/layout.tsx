import Header from "@/components/Header";
import type { Metadata } from "next";
import { ProfessionalServiceLayoutSection } from "./layout.styles";
import { ProfessionalServiceProvider } from "./_providers/ProfessionalServiceProvider";
import { professionalServiceRepository } from "@/lib/professionals/professional-service/repository/ProfessionalServiceRepository";

export const metadata: Metadata = {
  title: "Профессиональные услуги",
  description: "Профессиональные услуги",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const professionalServices = await professionalServiceRepository.getAll();
  console.log(professionalServices);
  // Placeholder data - to be replaced with actual data later
  const placeholderData = {
    // Add placeholder data here when needed
  };

  return (
    <ProfessionalServiceProvider data={placeholderData}>
      <ProfessionalServiceLayoutSection>
        <Header />
        <main>{children}</main>
      </ProfessionalServiceLayoutSection>
    </ProfessionalServiceProvider>
  );
}
