import { FC } from "react";
import { professionalServiceRepository } from "@/lib/professionals/professional-service/repository/ProfessionalServiceRepository";
import { notFound } from "next/navigation";
import ProfessionalServiceDetailClient from "../_components/ProfessionalServiceDetailClient/ProfessionalServiceDetailClient";
import { thisUserIsOwner } from "@/lib/auth/utils/auth.utils";
import {
  getAdViewCount,
  recordAdView,
} from "@/lib/views/actions/views.actions";
import { ENTITY_TYPE_PROFESSIONAL_SERVICE } from "@/lib/constants/entityTypes";

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
  const isOwner = await thisUserIsOwner(service.user.id);
  const viewCount = isOwner
    ? await getAdViewCount(ENTITY_TYPE_PROFESSIONAL_SERVICE, service.publicId)
    : null;
  if (!isOwner) {
    await recordAdView(ENTITY_TYPE_PROFESSIONAL_SERVICE, service.publicId);
  }
  return (
    <ProfessionalServiceDetailClient service={service} viewCount={viewCount} />
  );
};

export default ProfessionalServicePage;
