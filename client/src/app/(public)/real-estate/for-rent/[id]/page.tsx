import { FC } from "react";
import { realEstateForRentRepository } from "@/lib/real-estate/for-rent/repository/RealEstateForRentRepository";
import { notFound } from "next/navigation";
import RealEstateForRentDetailClient from "../_components/RealEstateForRentDetailClient/RealEstateForRentDetailClient";

interface RealEstateForRentPageProps {
  params: Promise<{ id: string }>;
}

const RealEstateForRentPage: FC<RealEstateForRentPageProps> = async ({
  params,
}) => {
  const { id } = await params;
  const realEstate = await realEstateForRentRepository.getByPublicId(id);
  if (!realEstate) {
    return notFound();
  }
  return <RealEstateForRentDetailClient realEstate={realEstate} />;
};

export default RealEstateForRentPage;
