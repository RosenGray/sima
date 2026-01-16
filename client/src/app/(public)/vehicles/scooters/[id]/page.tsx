import { FC } from "react";
import { scooterRepository } from "@/lib/vehicles/scooters/repository/ScooterRepository";
import { notFound } from "next/navigation";
import ScooterDetailClient from "../_components/ScooterDetailClient/ScooterDetailClient";

interface ScooterPageProps {
  params: Promise<{ id: string }>;
}

const ScooterPage: FC<ScooterPageProps> = async ({ params }) => {
  const { id } = await params;
  const scooter = await scooterRepository.getByPublicId(id);
  if (!scooter) {
    return notFound();
  }
  return <ScooterDetailClient scooter={scooter} />;
};

export default ScooterPage;
