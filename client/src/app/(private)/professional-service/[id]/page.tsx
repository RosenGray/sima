import { FC } from "react";
import { professionalServiceRepository } from "@/lib/professionals/professional-service/repository/ProfessionalServiceRepository";
import { notFound } from "next/navigation";
import { Text, Container } from "@radix-ui/themes";
import ProfessionalServiceCard from "../_components/ProfessionalServiceCard";
import { ProfessionalServicePageContainer } from "./page.styles";

interface ProfessionalServicePageProps {
  params: Promise<{ id: string }>;
}

const ProfessionalServicePage: FC<ProfessionalServicePageProps> = async ({
  params,
}) => {
  const { id } = await params;

  // Fetch the professional service data server-side
  const service = await professionalServiceRepository.getByPublicId('NfTgZlw973');
  console.log('service',service)

  // If service not found, trigger Next.js 404 page
  if (!service) {
    notFound();
  }

  return (
   <ProfessionalServicePageContainer>
     <ProfessionalServiceCard service={service} fullPage={true} />
   </ProfessionalServicePageContainer>
  );
};

export default ProfessionalServicePage;
