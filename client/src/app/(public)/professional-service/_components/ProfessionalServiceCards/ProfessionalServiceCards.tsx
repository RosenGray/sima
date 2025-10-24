import { Link } from "@radix-ui/themes";
import ProfessionalServiceCard from "./ProfessionalServiceCard";
import {
  professionalServiceRepository,
  SearchFilters,
} from "@/lib/professionals/professional-service/repository/ProfessionalServiceRepository";

interface ProfessionalServiceCardsProps {
  filters?: SearchFilters;
  currentPage?: number;
}
export const ProfessionalServiceCards: React.FC<
  ProfessionalServiceCardsProps
> = async ({ filters, currentPage }) => {
  const professionalServices = await professionalServiceRepository.getAll(
    filters,
    currentPage
  );
  console.log('professionalServices',professionalServices);
  return (
    <>
      {professionalServices.data.map((service, index) => (
        <Link href={`/professional-service/${service.publicId}`} key={index}>
          <ProfessionalServiceCard key={index} service={service} />
        </Link>
      ))}
    </>
  );
};
