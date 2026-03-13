import { FC } from "react";
import { specialVehicleRepository } from "@/lib/vehicles/special-vehicles/repository/SpecialVehicleRepository";
import { notFound } from "next/navigation";
import SpecialVehicleDetailClient from "../_components/SpecialVehicleDetailClient/SpecialVehicleDetailClient";
import { thisUserIsOwner } from "@/lib/auth/utils/auth.utils";
import { getAdViewCount, recordAdView } from "@/lib/views/actions/views.actions";
import { ENTITY_TYPE_SPECIAL_VEHICLES } from "@/lib/constants/entityTypes";

interface SpecialVehiclePageProps {
  params: Promise<{ id: string }>;
}

const SpecialVehiclePage: FC<SpecialVehiclePageProps> = async ({ params }) => {
  const { id } = await params;
  const specialVehicle = await specialVehicleRepository.getByPublicId(id);
  if (!specialVehicle) {
    return notFound();
  }
  const isOwner = await thisUserIsOwner(specialVehicle.user.id);
  const viewCount = await getAdViewCount(ENTITY_TYPE_SPECIAL_VEHICLES, specialVehicle.publicId);
  if (!isOwner) {
    await recordAdView(ENTITY_TYPE_SPECIAL_VEHICLES, specialVehicle.publicId);
  }
  return <SpecialVehicleDetailClient specialVehicle={specialVehicle} viewCount={viewCount} />;
};

export default SpecialVehiclePage;
