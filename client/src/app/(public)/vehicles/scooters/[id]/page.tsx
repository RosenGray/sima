import { FC } from "react";
import { scooterRepository } from "@/lib/vehicles/scooters/repository/ScooterRepository";
import { notFound } from "next/navigation";
import ScooterDetailClient from "../_components/ScooterDetailClient/ScooterDetailClient";
import { thisUserIsOwner } from "@/lib/auth/utils/auth.utils";
import { getAdViewCount, recordAdView } from "@/lib/views/actions/views.actions";
import { ENTITY_TYPE_SCOOTERS } from "@/lib/constants/entityTypes";

interface ScooterPageProps {
  params: Promise<{ id: string }>;
}

const ScooterPage: FC<ScooterPageProps> = async ({ params }) => {
  const { id } = await params;
  const scooter = await scooterRepository.getByPublicId(id);
  if (!scooter) {
    return notFound();
  }
  const isOwner = await thisUserIsOwner(scooter.user.id);
  const viewCount = isOwner
    ? await getAdViewCount(ENTITY_TYPE_SCOOTERS, scooter.publicId)
    : null;
  if (!isOwner) {
    await recordAdView(ENTITY_TYPE_SCOOTERS, scooter.publicId);
  }
  return <ScooterDetailClient scooter={scooter} viewCount={viewCount} />;
};

export default ScooterPage;
