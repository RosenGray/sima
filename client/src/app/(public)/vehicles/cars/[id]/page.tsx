import { FC } from "react";
import { carRepository } from "@/lib/vehicles/cars/repository/CarRepository";
import { notFound } from "next/navigation";
import CarDetailClient from "../_components/CarDetailClient/CarDetailClient";
import { thisUserIsOwner } from "@/lib/auth/utils/auth.utils";
import { getAdViewCount, recordAdView } from "@/lib/views/actions/views.actions";
import { ENTITY_TYPE_CARS } from "@/lib/constants/entityTypes";

interface CarPageProps {
  params: Promise<{ id: string }>;
}

const CarPage: FC<CarPageProps> = async ({ params }) => {
  const { id } = await params;
  const car = await carRepository.getByPublicId(id);
  if (!car) {
    return notFound();
  }
  const isOwner = await thisUserIsOwner(car.user.id);
  const viewCount = isOwner
    ? await getAdViewCount(ENTITY_TYPE_CARS, car.publicId)
    : null;
  if (!isOwner) {
    await recordAdView(ENTITY_TYPE_CARS, car.publicId);
  }
  return <CarDetailClient car={car} viewCount={viewCount} />;
};

export default CarPage;
