"use client";
import React from "react";
import { Flex, Link } from "@radix-ui/themes";
import MotorcycleListItem from "./MotorcycleListItem";
import { SerializedMotorcycle } from "@/lib/vehicles/motorcycles/types/motorcycle.types";

interface MotorcycleListProps {
  motorcycles: SerializedMotorcycle[];
}

export const MotorcycleList: React.FC<MotorcycleListProps> = ({
  motorcycles,
}) => {
  return (
    <Flex direction="column" gap="3" width="100%">
      {motorcycles.map((motorcycle) => (
        <Link
          href={`/vehicles/motorcycles/${motorcycle.publicId}`}
          key={motorcycle.publicId}
        >
          <MotorcycleListItem motorcycle={motorcycle} />
        </Link>
      ))}
    </Flex>
  );
};
