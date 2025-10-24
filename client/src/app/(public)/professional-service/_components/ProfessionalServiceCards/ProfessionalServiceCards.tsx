import { Link } from "@radix-ui/themes";
import ProfessionalServiceCard from "./ProfessionalServiceCard";
import { professionalServiceRepository } from "@/lib/professionals/professional-service/repository/ProfessionalServiceRepository";

interface ProfessionalServiceCardsProps {
  query?: string;
  currentPage?: number;
}
export const ProfessionalServiceCards: React.FC<
  ProfessionalServiceCardsProps
> = async ({ query, currentPage }) => {
  const professionalServices = await professionalServiceRepository.getAll( query, currentPage );
  return (
    <>
      {professionalServices.map((service, index) => (
        <Link href={`/professional-service/${service.publicId}`} key={index}>
          <ProfessionalServiceCard key={index} service={service} />
        </Link>
      ))}
    </>
  );
};
