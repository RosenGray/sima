import React from "react";
import { IProfessionalService } from "@/lib/professionals/professional-service/models/ProfessionalService";
import Image from "next/image";
import { ServiceCardBox } from "./ProfessionalServiceCard.styles";

interface ProfessionalServiceCardProps {
  service: IProfessionalService;
}

const ProfessionalServiceCard: React.FC<ProfessionalServiceCardProps> = ({
  service,
}) => {
  const firstImage = service.images?.[0];

  return (
    <ServiceCardBox>
      <Image 
        src={firstImage.url} 
        alt={firstImage.originalName} 
        fill 
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        style={{ objectFit: 'cover' }}
        priority={false}
      />
    </ServiceCardBox>
    // <Card>
    //   <CardImageContainer>
    //     {firstImage ? (
    //       <>
    //         <CardImage src={firstImage.url} alt={firstImage.originalName} />
    //         {imageCount > 1 && (
    //           <CardImageOverlay>
    //             <CardImageCount>+{imageCount - 1}</CardImageCount>
    //           </CardImageOverlay>
    //         )}
    //       </>
    //     ) : (
    //       <CardImage src="/placeholder-service.jpg" alt="No image" />
    //     )}
    //   </CardImageContainer>

    //   <CardContent>
    //     <CardCategory>
    //       {/* Placeholder for category name - will be populated from populated data */}
    //       Категория
    //     </CardCategory>

    //     <CardTitle>
    //       {/* Placeholder for subcategory name - will be populated from populated data */}
    //       Подкатегория
    //     </CardTitle>

    //     <CardDescription>{service.description}</CardDescription>

    //     <CardLocation>
    //       {/* <MapPinIcon /> */}
    //       {service.city}, {service.district}
    //     </CardLocation>

    //     <CardContact>
    //       <CardContactItem>
    //         <EnvelopeClosedIcon />
    //         {service.email}
    //       </CardContactItem>
    //       <CardContactItem>
    //         {/* <PhoneIcon /> */}
    //         {service.phoneNumber}
    //       </CardContactItem>
    //     </CardContact>
    //   </CardContent>
    // </Card>
  );
};

export default ProfessionalServiceCard;
