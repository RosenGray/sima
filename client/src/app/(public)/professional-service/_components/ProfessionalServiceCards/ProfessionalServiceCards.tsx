import { Link } from "@radix-ui/themes";
import ProfessionalServiceCard from "./ProfessionalServiceCard";
import { SerilizeProfessionalService } from "@/lib/professionals/professional-service/types/professional-service.scema";

interface ProfessionalServiceCardsProps {
  professionalServices: SerilizeProfessionalService[];
}
export const ProfessionalServiceCards: React.FC<
  ProfessionalServiceCardsProps
> = async ({ professionalServices }) => {
  return (
    <>
      {professionalServices.map((service) => (
        <Link
          href={`/professional-service/${service.publicId}`}
          key={service.publicId}
        >
          <ProfessionalServiceCard service={service} />
        </Link>
      ))}
    </>
  );
};
