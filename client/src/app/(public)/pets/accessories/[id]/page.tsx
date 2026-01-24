import { FC } from "react";
import { petAccessoryRepository } from "@/lib/pets/accessories/repository/PetAccessoryRepository";
import { notFound } from "next/navigation";
import PetAccessoryDetailClient from "../_components/PetAccessoryDetailClient/PetAccessoryDetailClient";

interface PetAccessoryPageProps {
  params: Promise<{ id: string }>;
}

const PetAccessoryPage: FC<PetAccessoryPageProps> = async ({ params }) => {
  const { id } = await params;
  const accessory = await petAccessoryRepository.getByPublicId(id);
  if (!accessory) {
    return notFound();
  }
  return <PetAccessoryDetailClient accessory={accessory} />;
};

export default PetAccessoryPage;
