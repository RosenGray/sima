import React from "react";
import { Link } from "@radix-ui/themes";
import PetForFreeCard from "./PetForFreeCard";
import { SerializedPetForFree } from "@/lib/pets/for-free/types/petForFree.types";

interface PetForFreeCardsProps {
  pets: SerializedPetForFree[];
}

export const PetForFreeCards: React.FC<PetForFreeCardsProps> = ({ pets }) => {
  return (
    <>
      {pets.map((pet) => (
        <Link href={`/pets/for-free/${pet.publicId}`} key={pet.publicId}>
          <PetForFreeCard pet={pet} />
        </Link>
      ))}
    </>
  );
};
