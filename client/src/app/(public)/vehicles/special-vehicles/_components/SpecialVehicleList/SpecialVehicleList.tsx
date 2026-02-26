"use client";
import React from "react";
import { Flex, Link } from "@radix-ui/themes";
import SpecialVehicleListItem from "./SpecialVehicleListItem";
import { SerializedSpecialVehicle } from "@/lib/vehicles/special-vehicles/types/specialVehicle.types";

interface SpecialVehicleListProps {
  specialVehicles: SerializedSpecialVehicle[];
}

export const SpecialVehicleList: React.FC<SpecialVehicleListProps> = ({
  specialVehicles,
}) => {
  return (
    <Flex direction="column" gap="3" width="100%">
      {specialVehicles.map((vehicle) => (
        <Link
          href={`/vehicles/special-vehicles/${vehicle.publicId}`}
          key={vehicle.publicId}
        >
          <SpecialVehicleListItem specialVehicle={vehicle} />
        </Link>
      ))}
    </Flex>
  );
};
