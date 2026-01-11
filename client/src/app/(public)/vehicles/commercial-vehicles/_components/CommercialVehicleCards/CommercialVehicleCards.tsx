import React from "react";
import { Link } from "@radix-ui/themes";
import CommercialVehicleCard from "./CommercialVehicleCard";
import { SerializedCommercialVehicle } from "@/lib/vehicles/commercial-vehicles/types/commercialVehicle.types";

interface CommercialVehicleCardsProps {
  commercialVehicles: SerializedCommercialVehicle[];
}

export const CommercialVehicleCards: React.FC<CommercialVehicleCardsProps> = ({ commercialVehicles }) => {
  return (
    <>
      {commercialVehicles.map((commercialVehicle) => (
        <Link
          href={`/vehicles/commercial-vehicles/${commercialVehicle.publicId}`}
          key={commercialVehicle.publicId}
        >
          <CommercialVehicleCard commercialVehicle={commercialVehicle} />
        </Link>
      ))}
    </>
  );
};
