import { FC } from "react";
import { professionalServiceRepository } from "@/lib/professionals/professional-service/repository/ProfessionalServiceRepository";
import { notFound } from "next/navigation";
import ProfessionalServiceDetailClient from "../_components/ProfessionalServiceDetailClient/ProfessionalServiceDetailClient";

interface ProfessionalServicePageProps {
  params: Promise<{ id: string }>;
}

const ProfessionalServicePage: FC<ProfessionalServicePageProps> = async ({
  params,
}) => {
  const { id } = await params;
  const service = await professionalServiceRepository.getByPublicId(id);
  if (!service) {
    notFound();
  }
  return <ProfessionalServiceDetailClient service={service} />;
};

export default ProfessionalServicePage;
