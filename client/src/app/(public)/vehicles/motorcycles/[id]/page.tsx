import { FC } from "react";
import { motorcycleRepository } from "@/lib/vehicles/motorcycles/repository/MotorcycleRepository";
import { notFound } from "next/navigation";
import MotorcycleDetailClient from "../_components/MotorcycleDetailClient/MotorcycleDetailClient";

interface MotorcyclePageProps {
  params: Promise<{ id: string }>;
}

const MotorcyclePage: FC<MotorcyclePageProps> = async ({ params }) => {
  const { id } = await params;
  const motorcycle = await motorcycleRepository.getByPublicId(id);
  if (!motorcycle) {
    return notFound();
  }
  return <MotorcycleDetailClient motorcycle={motorcycle} />;
};

export default MotorcyclePage;
