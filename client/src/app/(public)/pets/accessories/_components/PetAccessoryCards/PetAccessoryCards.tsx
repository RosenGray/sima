import React from "react";
import { Link } from "@radix-ui/themes";
import PetAccessoryCard from "./PetAccessoryCard";
import { SerializedPetAccessory } from "@/lib/pets/accessories/types/petAccessory.types";

interface PetAccessoryCardsProps {
  accessories: SerializedPetAccessory[];
}

export const PetAccessoryCards: React.FC<PetAccessoryCardsProps> = ({
  accessories,
}) => {
  return (
    <>
      {accessories.map((accessory) => (
        <Link
          href={`/pets/accessories/${accessory.publicId}`}
          key={accessory.publicId}
        >
          <PetAccessoryCard accessory={accessory} />
        </Link>
      ))}
    </>
  );
};
