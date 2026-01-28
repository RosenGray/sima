import React from "react";
import { Link } from "@radix-ui/themes";
import RealEstateForSaleCard from "./RealEstateForSaleCard";
import { SerializedRealEstateForSale } from "@/lib/real-estate/for-sale/types/realEstateForSale.types";

interface RealEstateForSaleCardsProps {
  realEstates: SerializedRealEstateForSale[];
}

export const RealEstateForSaleCards: React.FC<RealEstateForSaleCardsProps> = ({
  realEstates,
}) => {
  return (
    <>
      {realEstates.map((realEstate) => (
        <Link
          href={`/real-estate/for-sale/${realEstate.publicId}`}
          key={realEstate.publicId}
        >
          <RealEstateForSaleCard realEstate={realEstate} />
        </Link>
      ))}
    </>
  );
};
