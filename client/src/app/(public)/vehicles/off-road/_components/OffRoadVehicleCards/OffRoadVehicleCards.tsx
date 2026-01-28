import React from "react";
import { Link } from "@radix-ui/themes";
import OffRoadVehicleCard from "./OffRoadVehicleCard";
import { SerializedOffRoadVehicle } from "@/lib/vehicles/off-road/types/offRoadVehicle.types";

interface OffRoadVehicleCardsProps {
  offRoadVehicles: SerializedOffRoadVehicle[];
}

export const OffRoadVehicleCards: React.FC<OffRoadVehicleCardsProps> = ({ offRoadVehicles }) => {
  return (
    <>
      {offRoadVehicles.map((offRoadVehicle) => (
        <Link
          href={`/vehicles/off-road/${offRoadVehicle.publicId}`}
          key={offRoadVehicle.publicId}
        >
          <OffRoadVehicleCard offRoadVehicle={offRoadVehicle} />
        </Link>
      ))}
    </>
  );
};
