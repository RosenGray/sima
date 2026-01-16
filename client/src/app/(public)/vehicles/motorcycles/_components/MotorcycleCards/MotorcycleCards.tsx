import React from "react";
import { Link } from "@radix-ui/themes";
import MotorcycleCard from "./MotorcycleCard";
import { SerializedMotorcycle } from "@/lib/vehicles/motorcycles/types/motorcycle.types";

interface MotorcycleCardsProps {
  motorcycles: SerializedMotorcycle[];
}

export const MotorcycleCards: React.FC<MotorcycleCardsProps> = ({
  motorcycles,
}) => {
  return (
    <>
      {motorcycles.map((motorcycle) => (
        <Link
          href={`/vehicles/motorcycles/${motorcycle.publicId}`}
          key={motorcycle.publicId}
        >
          <MotorcycleCard motorcycle={motorcycle} />
        </Link>
      ))}
    </>
  );
};
