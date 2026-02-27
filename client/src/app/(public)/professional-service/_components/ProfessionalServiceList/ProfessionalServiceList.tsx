"use client";
import React from "react";
import { Flex, Link } from "@radix-ui/themes";
import ProfessionalServiceListItem from "./ProfessionalServiceListItem";
import { SerilizeProfessionalService } from "@/lib/professionals/professional-service/types/professional-service.scema";

interface ProfessionalServiceListProps {
  professionalServices: SerilizeProfessionalService[];
}

export const ProfessionalServiceList: React.FC<ProfessionalServiceListProps> = ({
  professionalServices,
}) => {
  return (
    <Flex direction="column" gap="3" width="100%">
      {professionalServices.map((service) => (
        <Link
          href={`/professional-service/${service.publicId}`}
          key={service.publicId}
        >
          <ProfessionalServiceListItem service={service} />
        </Link>
      ))}
    </Flex>
  );
};
