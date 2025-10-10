import React from "react";
import { IProfessionalService } from "@/lib/professionals/professional-service/models/ProfessionalService";
import Image from "next/image";
import { ServiceCard, ServiceCardBox, ServiceCardFooter, ServiceCardHeader, ServiceCardImageContainer } from "./ProfessionalServiceCard.styles";

interface ProfessionalServiceCardProps {
  service: IProfessionalService;
}

const ProfessionalServiceCard: React.FC<ProfessionalServiceCardProps> = ({
  service,
}) => {
  const firstImage = service.images?.[0];

  return (
    <ServiceCardBox>
      <ServiceCard variant="surface">
        <ServiceCardHeader>Header</ServiceCardHeader>

{/* 
      <ServiceCardImageContainer>
          <Image 
        src={firstImage.url} 
        alt={firstImage.originalName} 
        fill 
        // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        style={{ objectFit: 'cover' }}
        priority={false}
      />
      </ServiceCardImageContainer> */}
      <ServiceCardFooter>
 footer
      </ServiceCardFooter>
      </ServiceCard>

    </ServiceCardBox>

  );
};

export default ProfessionalServiceCard;
