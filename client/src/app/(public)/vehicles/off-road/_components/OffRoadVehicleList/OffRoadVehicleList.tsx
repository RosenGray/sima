"use client";
import React from "react";
import { Flex, Link } from "@radix-ui/themes";
import OffRoadVehicleListItem from "./OffRoadVehicleListItem";
import { SerializedOffRoadVehicle } from "@/lib/vehicles/off-road/types/offRoadVehicle.types";

interface OffRoadVehicleListProps {
  offRoadVehicles: SerializedOffRoadVehicle[];
}

export const OffRoadVehicleList: React.FC<OffRoadVehicleListProps> = ({
  offRoadVehicles,
}) => {
  return (
    <Flex direction="column" gap="3" width="100%">
      {offRoadVehicles.map((vehicle) => (
        <Link
          href={`/vehicles/off-road/${vehicle.publicId}`}
          key={vehicle.publicId}
        >
          <OffRoadVehicleListItem offRoadVehicle={vehicle} />
        </Link>
      ))}
    </Flex>
  );
};
