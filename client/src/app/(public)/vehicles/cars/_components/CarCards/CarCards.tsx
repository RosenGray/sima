import React from "react";
import { Link } from "@radix-ui/themes";
import CarCard from "./CarCard";
import { SerializedCar } from "@/lib/vehicles/cars/types/cars.types";

interface CarCardsProps {
  cars: SerializedCar[];
}

export const CarCards: React.FC<CarCardsProps> = ({ cars }) => {
  return (
    <>
      {cars.map((car) => (
        <Link
          href={`/vehicles/cars/${car.publicId}`}
          key={car.publicId}
        >
          <CarCard car={car} />
        </Link>
      ))}
    </>
  );
};

