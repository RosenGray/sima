import React from "react";
import Link from "next/link";
import SpecialVehicleCard from "./SpecialVehicleCard";
import { SerializedSpecialVehicle } from "@/lib/vehicles/special-vehicles/types/specialVehicle.types";

interface SpecialVehicleCardsProps {
  specialVehicles: SerializedSpecialVehicle[];
}

export const SpecialVehicleCards: React.FC<SpecialVehicleCardsProps> = ({
  specialVehicles,
}) => {
  return (
    <>
      {specialVehicles.map((specialVehicle) => (
        <Link
          href={`/vehicles/special-vehicles/${specialVehicle.publicId}`}
          key={specialVehicle.publicId}
        >
          <SpecialVehicleCard specialVehicle={specialVehicle} />
        </Link>
      ))}
    </>
  );
};
