import React from "react";
import { IProfessionalService } from "@/lib/professionals/professional-service/models/ProfessionalService";
import { EnvelopeClosedIcon } from "@radix-ui/react-icons";
import {
  Card,
  CardContent,
  CardImage,
  CardTitle,
  CardDescription,
  CardLocation,
  CardContact,
  CardCategory,
  CardImageContainer,
  CardImageOverlay,
  CardImageCount,
  CardContactItem,
} from "./ProfessionalServiceCard.styles";

interface ProfessionalServiceCardProps {
  service: IProfessionalService;
}

const ProfessionalServiceCard: React.FC<ProfessionalServiceCardProps> = ({
  service,
}) => {
  const firstImage = service.images?.[0];
  const imageCount = service.images?.length || 0;

  return (
    <div>
      1
    </div>
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
