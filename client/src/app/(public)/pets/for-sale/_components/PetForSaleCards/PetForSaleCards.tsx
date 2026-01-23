import React from "react";
import { Link } from "@radix-ui/themes";
import PetForSaleCard from "./PetForSaleCard";
import { SerializedPetForSale } from "@/lib/pets/for-sale/types/petForSale.types";

interface PetForSaleCardsProps {
  pets: SerializedPetForSale[];
}

export const PetForSaleCards: React.FC<PetForSaleCardsProps> = ({ pets }) => {
  return (
    <>
      {pets.map((pet) => (
        <Link href={`/pets/for-sale/${pet.publicId}`} key={pet.publicId}>
          <PetForSaleCard pet={pet} />
        </Link>
      ))}
    </>
  );
};
