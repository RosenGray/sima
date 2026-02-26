"use client";
import React from "react";
import { Flex, Link } from "@radix-ui/themes";
import CommercialVehicleListItem from "./CommercialVehicleListItem";
import { SerializedCommercialVehicle } from "@/lib/vehicles/commercial-vehicles/types/commercialVehicle.types";

interface CommercialVehicleListProps {
  commercialVehicles: SerializedCommercialVehicle[];
}

export const CommercialVehicleList: React.FC<CommercialVehicleListProps> = ({
  commercialVehicles,
}) => {
  return (
    <Flex direction="column" gap="3" width="100%">
      {commercialVehicles.map((vehicle) => (
        <Link
          href={`/vehicles/commercial-vehicles/${vehicle.publicId}`}
          key={vehicle.publicId}
        >
          <CommercialVehicleListItem commercialVehicle={vehicle} />
        </Link>
      ))}
    </Flex>
  );
};
