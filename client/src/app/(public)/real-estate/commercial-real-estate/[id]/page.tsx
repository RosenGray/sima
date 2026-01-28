import { FC } from "react";
import { commercialRealEstateRepository } from "@/lib/real-estate/commercial-real-estate/repository/CommercialRealEstateRepository";
import { notFound } from "next/navigation";
import CommercialRealEstateDetailClient from "../_components/CommercialRealEstateDetailClient/CommercialRealEstateDetailClient";

interface CommercialRealEstatePageProps {
  params: Promise<{ id: string }>;
}

const CommercialRealEstatePage: FC<CommercialRealEstatePageProps> = async ({
  params,
}) => {
  const { id } = await params;
  const commercialRealEstate =
    await commercialRealEstateRepository.getByPublicId(id);
  if (!commercialRealEstate) {
    return notFound();
  }
  return (
    <CommercialRealEstateDetailClient
      commercialRealEstate={commercialRealEstate}
    />
  );
};

export default CommercialRealEstatePage;
