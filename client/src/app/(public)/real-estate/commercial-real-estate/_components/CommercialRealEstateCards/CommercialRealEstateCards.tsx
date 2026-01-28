import React from "react";
import { Link } from "@radix-ui/themes";
import CommercialRealEstateCard from "./CommercialRealEstateCard";
import { SerializedCommercialRealEstate } from "@/lib/real-estate/commercial-real-estate/types/commercialRealEstate.types";

interface CommercialRealEstateCardsProps {
  commercialRealEstates: SerializedCommercialRealEstate[];
}

export const CommercialRealEstateCards: React.FC<
  CommercialRealEstateCardsProps
> = ({ commercialRealEstates }) => {
  return (
    <>
      {commercialRealEstates.map((commercialRealEstate) => (
        <Link
          href={`/real-estate/commercial-real-estate/${commercialRealEstate.publicId}`}
          key={commercialRealEstate.publicId}
        >
          <CommercialRealEstateCard
            commercialRealEstate={commercialRealEstate}
          />
        </Link>
      ))}
    </>
  );
};
