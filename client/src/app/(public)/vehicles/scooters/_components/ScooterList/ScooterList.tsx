"use client";
import React from "react";
import { Flex, Link } from "@radix-ui/themes";
import ScooterListItem from "./ScooterListItem";
import { SerializedScooter } from "@/lib/vehicles/scooters/types/scooter.types";

interface ScooterListProps {
  scooters: SerializedScooter[];
}

export const ScooterList: React.FC<ScooterListProps> = ({ scooters }) => {
  return (
    <Flex direction="column" gap="3" width="100%">
      {scooters.map((scooter) => (
        <Link
          href={`/vehicles/scooters/${scooter.publicId}`}
          key={scooter.publicId}
        >
          <ScooterListItem scooter={scooter} />
        </Link>
      ))}
    </Flex>
  );
};
