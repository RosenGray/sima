import React from "react";
import { Link } from "@radix-ui/themes";
import ScooterCard from "./ScooterCard";
import { SerializedScooter } from "@/lib/vehicles/scooters/types/scooter.types";

interface ScooterCardsProps {
  scooters: SerializedScooter[];
}

export const ScooterCards: React.FC<ScooterCardsProps> = ({ scooters }) => {
  return (
    <>
      {scooters.map((scooter) => (
        <Link
          href={`/vehicles/scooters/${scooter.publicId}`}
          key={scooter.publicId}
        >
          <ScooterCard scooter={scooter} />
        </Link>
      ))}
    </>
  );
};
