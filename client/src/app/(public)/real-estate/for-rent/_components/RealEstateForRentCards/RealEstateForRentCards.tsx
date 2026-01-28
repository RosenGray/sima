import React from "react";
import { Link } from "@radix-ui/themes";
import RealEstateForRentCard from "./RealEstateForRentCard";
import { SerializedRealEstateForRent } from "@/lib/real-estate/for-rent/types/realEstateForRent.types";

interface RealEstateForRentCardsProps {
  realEstates: SerializedRealEstateForRent[];
}

export const RealEstateForRentCards: React.FC<RealEstateForRentCardsProps> = ({
  realEstates,
}) => {
  return (
    <>
      {realEstates.map((realEstate) => (
        <Link
          href={`/real-estate/for-rent/${realEstate.publicId}`}
          key={realEstate.publicId}
        >
          <RealEstateForRentCard realEstate={realEstate} />
        </Link>
      ))}
    </>
  );
};
