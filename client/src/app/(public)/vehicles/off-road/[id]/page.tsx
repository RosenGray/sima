import { FC } from "react";
import { offRoadVehicleRepository } from "@/lib/vehicles/off-road/repository/OffRoadVehicleRepository";
import { notFound } from "next/navigation";
import OffRoadVehicleDetailClient from "../_components/OffRoadVehicleDetailClient/OffRoadVehicleDetailClient";

interface OffRoadVehiclePageProps {
  params: Promise<{ id: string }>;
}

const OffRoadVehiclePage: FC<OffRoadVehiclePageProps> = async ({ params }) => {
  const { id } = await params;
  const offRoadVehicle = await offRoadVehicleRepository.getByPublicId(id);
  if (!offRoadVehicle) {
    return notFound();
  }
  return <OffRoadVehicleDetailClient offRoadVehicle={offRoadVehicle} />;
};

export default OffRoadVehiclePage;
