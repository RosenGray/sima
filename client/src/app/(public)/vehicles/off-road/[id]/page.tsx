import { FC } from "react";
import { offRoadVehicleRepository } from "@/lib/vehicles/off-road/repository/OffRoadVehicleRepository";
import { notFound } from "next/navigation";
import OffRoadVehicleDetailClient from "../_components/OffRoadVehicleDetailClient/OffRoadVehicleDetailClient";
import { thisUserIsOwner } from "@/lib/auth/utils/auth.utils";
import { getAdViewCount, recordAdView } from "@/lib/views/actions/views.actions";
import { ENTITY_TYPE_OFF_ROAD } from "@/lib/constants/entityTypes";

interface OffRoadVehiclePageProps {
  params: Promise<{ id: string }>;
}

const OffRoadVehiclePage: FC<OffRoadVehiclePageProps> = async ({ params }) => {
  const { id } = await params;
  const offRoadVehicle = await offRoadVehicleRepository.getByPublicId(id);
  if (!offRoadVehicle) {
    return notFound();
  }
  const isOwner = await thisUserIsOwner(offRoadVehicle.user.id);
  const viewCount = await getAdViewCount(ENTITY_TYPE_OFF_ROAD, offRoadVehicle.publicId);
  if (!isOwner) {
    await recordAdView(ENTITY_TYPE_OFF_ROAD, offRoadVehicle.publicId);
  }
  return <OffRoadVehicleDetailClient offRoadVehicle={offRoadVehicle} viewCount={viewCount} />;
};

export default OffRoadVehiclePage;
