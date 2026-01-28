import { FC } from "react";
import { specialVehicleRepository } from "@/lib/vehicles/special-vehicles/repository/SpecialVehicleRepository";
import { notFound } from "next/navigation";
import SpecialVehicleDetailClient from "../_components/SpecialVehicleDetailClient/SpecialVehicleDetailClient";

interface SpecialVehiclePageProps {
  params: Promise<{ id: string }>;
}

const SpecialVehiclePage: FC<SpecialVehiclePageProps> = async ({ params }) => {
  const { id } = await params;
  const specialVehicle =
    await specialVehicleRepository.getByPublicId(id);
  if (!specialVehicle) {
    return notFound();
  }
  return <SpecialVehicleDetailClient specialVehicle={specialVehicle} />;
};

export default SpecialVehiclePage;
