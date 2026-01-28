import { FC } from "react";
import { petForSaleRepository } from "@/lib/pets/for-sale/repository/PetForSaleRepository";
import { notFound } from "next/navigation";
import PetForSaleDetailClient from "../_components/PetForSaleDetailClient/PetForSaleDetailClient";

interface PetForSalePageProps {
  params: Promise<{ id: string }>;
}

const PetForSalePage: FC<PetForSalePageProps> = async ({ params }) => {
  const { id } = await params;
  const pet = await petForSaleRepository.getByPublicId(id);
  if (!pet) {
    return notFound();
  }
  return <PetForSaleDetailClient pet={pet} />;
};

export default PetForSalePage;
