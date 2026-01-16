import { FC } from "react";
import { commercialVehicleRepository } from "@/lib/vehicles/commercial-vehicles/repository/CommercialVehicleRepository";
import { notFound } from "next/navigation";
import CommercialVehicleDetailClient from "../_components/CommercialVehicleDetailClient/CommercialVehicleDetailClient";

interface CommercialVehiclePageProps {
  params: Promise<{ id: string }>;
}

const CommercialVehiclePage: FC<CommercialVehiclePageProps> = async ({ params }) => {
  const { id } = await params;
  const commercialVehicle = await commercialVehicleRepository.getByPublicId(id);
  if (!commercialVehicle) {
    return notFound();
  }
  return <CommercialVehicleDetailClient commercialVehicle={commercialVehicle} />;
};

export default CommercialVehiclePage;
