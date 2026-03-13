import { FC } from "react";
import { commercialVehicleRepository } from "@/lib/vehicles/commercial-vehicles/repository/CommercialVehicleRepository";
import { notFound } from "next/navigation";
import CommercialVehicleDetailClient from "../_components/CommercialVehicleDetailClient/CommercialVehicleDetailClient";
import { thisUserIsOwner } from "@/lib/auth/utils/auth.utils";
import { getAdViewCount, recordAdView } from "@/lib/views/actions/views.actions";
import { ENTITY_TYPE_COMMERCIAL_VEHICLES } from "@/lib/constants/entityTypes";

interface CommercialVehiclePageProps {
  params: Promise<{ id: string }>;
}

const CommercialVehiclePage: FC<CommercialVehiclePageProps> = async ({ params }) => {
  const { id } = await params;
  const commercialVehicle = await commercialVehicleRepository.getByPublicId(id);
  if (!commercialVehicle) {
    return notFound();
  }
  const isOwner = await thisUserIsOwner(commercialVehicle.user.id);
  const viewCount = isOwner
    ? await getAdViewCount(ENTITY_TYPE_COMMERCIAL_VEHICLES, commercialVehicle.publicId)
    : null;
  if (!isOwner) {
    await recordAdView(ENTITY_TYPE_COMMERCIAL_VEHICLES, commercialVehicle.publicId);
  }
  return <CommercialVehicleDetailClient commercialVehicle={commercialVehicle} viewCount={viewCount} />;
};

export default CommercialVehiclePage;
