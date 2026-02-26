"use client";
import React from "react";
import { Flex, Link } from "@radix-ui/themes";
import CarListItem from "./CarListItem";
import { SerializedCar } from "@/lib/vehicles/cars/types/cars.types";

interface CarListProps {
  cars: SerializedCar[];
}

export const CarList: React.FC<CarListProps> = ({ cars }) => {
  return (
    <Flex direction="column" gap="3" width="100%">
      {cars.map((car) => (
        <Link href={`/vehicles/cars/${car.publicId}`} key={car.publicId}>
          <CarListItem car={car} />
        </Link>
      ))}
    </Flex>
  );
};
