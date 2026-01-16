import React from "react";
import Link from "next/link";
import AccessoryCard from "./AccessoryCard";
import { SerializedAccessory } from "@/lib/vehicles/accessories/types/accessory.types";

interface AccessoryCardsProps {
  accessories: SerializedAccessory[];
}

export const AccessoryCards: React.FC<AccessoryCardsProps> = ({
  accessories,
}) => {
  return (
    <>
      {accessories.map((accessory) => (
        <Link
          href={`/vehicles/accessories/${accessory.publicId}`}
          key={accessory.publicId}
        >
          <AccessoryCard accessory={accessory} />
        </Link>
      ))}
    </>
  );
};
