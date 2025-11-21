import { FC } from "react";
import { VehicleFiltersContainer, VehicleFiltersContent, VehicleFiltersHeader } from "./VehicleFilters.styles";

interface VehicleFiltersProps {
children: React.ReactNode;
}

const VehicleFilters: FC<VehicleFiltersProps> = ({ children }) => {
  return <VehicleFiltersContainer>
    <VehicleFiltersHeader>
      Header
    </VehicleFiltersHeader>
    <VehicleFiltersContent>
      {children}
    </VehicleFiltersContent>
  </VehicleFiltersContainer>;
};

export default VehicleFilters;
