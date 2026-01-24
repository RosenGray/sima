import { FC } from "react";
import { petForFreeRepository } from "@/lib/pets/for-free/repository/PetForFreeRepository";
import { notFound } from "next/navigation";
import PetForFreeDetailClient from "../_components/PetForFreeDetailClient/PetForFreeDetailClient";

interface PetForFreePageProps {
  params: Promise<{ id: string }>;
}

const PetForFreePage: FC<PetForFreePageProps> = async ({ params }) => {
  const { id } = await params;
  const pet = await petForFreeRepository.getByPublicId(id);
  if (!pet) {
    return notFound();
  }
  return <PetForFreeDetailClient pet={pet} />;
};

export default PetForFreePage;
