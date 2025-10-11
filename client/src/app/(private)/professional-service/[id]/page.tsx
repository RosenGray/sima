import { FC } from "react";
import { professionalServiceRepository } from "@/lib/professionals/professional-service/repository/ProfessionalServiceRepository";
import { notFound } from "next/navigation";
import { getCurrentUser } from "@/lib/auth/utils/auth.utils";
import ProfessionalServiceDetailClient from "../_components/ProfessionalServiceDetailClient/ProfessionalServiceDetailClient";

interface ProfessionalServicePageProps {
  params: Promise<{ id: string }>;
}

const ProfessionalServicePage: FC<ProfessionalServicePageProps> = async ({
  params,
}) => {
  const { id } = await params;

  // Fetch the professional service data server-side
  const service = await professionalServiceRepository.getByPublicId(id);

  // If service not found, trigger Next.js 404 page
  if (!service) {
    notFound();
  }

  // Check if user is authenticated
  const currentUser = await getCurrentUser();
  const isAuthenticated = !!currentUser;

  return (
    <ProfessionalServiceDetailClient
      service={service}
      isAuthenticated={isAuthenticated}
    />
  );
};

export default ProfessionalServicePage;
