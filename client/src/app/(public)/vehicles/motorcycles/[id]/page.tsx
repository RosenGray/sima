import { FC } from "react";
import { motorcycleRepository } from "@/lib/vehicles/motorcycles/repository/MotorcycleRepository";
import { notFound } from "next/navigation";
import MotorcycleDetailClient from "../_components/MotorcycleDetailClient/MotorcycleDetailClient";
import { thisUserIsOwner } from "@/lib/auth/utils/auth.utils";
import { getAdViewCount, recordAdView } from "@/lib/views/actions/views.actions";
import { ENTITY_TYPE_MOTORCYCLES } from "@/lib/constants/entityTypes";

interface MotorcyclePageProps {
  params: Promise<{ id: string }>;
}

const MotorcyclePage: FC<MotorcyclePageProps> = async ({ params }) => {
  const { id } = await params;
  const motorcycle = await motorcycleRepository.getByPublicId(id);
  if (!motorcycle) {
    return notFound();
  }
  const isOwner = await thisUserIsOwner(motorcycle.user.id);
  const viewCount = isOwner
    ? await getAdViewCount(ENTITY_TYPE_MOTORCYCLES, motorcycle.publicId)
    : null;
  if (!isOwner) {
    await recordAdView(ENTITY_TYPE_MOTORCYCLES, motorcycle.publicId);
  }
  return <MotorcycleDetailClient motorcycle={motorcycle} viewCount={viewCount} />;
};

export default MotorcyclePage;
