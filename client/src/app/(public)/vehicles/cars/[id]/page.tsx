import { FC } from "react";
import { carRepository } from "@/lib/vehicles/cars/repository/CarRepository";
import { notFound } from "next/navigation";
import CarDetailClient from "../_components/CarDetailClient/CarDetailClient";

interface CarPageProps {
  params: Promise<{ id: string }>;
}

const CarPage: FC<CarPageProps> = async ({ params }) => {
  const { id } = await params;
  const car = await carRepository.getByPublicId(id);
  if (!car) {
    notFound();
  }
  return <CarDetailClient car={car} />;
};

export default CarPage;

