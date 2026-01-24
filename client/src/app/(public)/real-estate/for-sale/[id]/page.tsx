import { FC } from "react";
import { realEstateForSaleRepository } from "@/lib/real-estate/for-sale/repository/RealEstateForSaleRepository";
import { notFound } from "next/navigation";
import RealEstateForSaleDetailClient from "../_components/RealEstateForSaleDetailClient/RealEstateForSaleDetailClient";

interface RealEstateForSalePageProps {
  params: Promise<{ id: string }>;
}

const RealEstateForSalePage: FC<RealEstateForSalePageProps> = async ({
  params,
}) => {
  const { id } = await params;
  const realEstate = await realEstateForSaleRepository.getByPublicId(id);
  if (!realEstate) {
    return notFound();
  }
  return <RealEstateForSaleDetailClient realEstate={realEstate} />;
};

export default RealEstateForSalePage;
