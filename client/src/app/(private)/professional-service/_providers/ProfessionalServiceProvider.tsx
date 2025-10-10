"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { SerilizeProfessionalService } from "@/lib/professionals/professional-service/types/professional-service.scema";

// Context type
interface ProfessionalServiceContextType {
  professionalServices: SerilizeProfessionalService[];
}

const ProfessionalServiceContext = createContext<ProfessionalServiceContextType | undefined>(
  undefined
);

// Provider component
interface ProfessionalServiceProviderProps {
  children: ReactNode;
  data: {
    professionalServices: SerilizeProfessionalService[];
  }
}

export const ProfessionalServiceProvider: React.FC<ProfessionalServiceProviderProps> = ({
  children,
  data,
}) => {
  const contextValue: ProfessionalServiceContextType = {
    professionalServices: data.professionalServices,
  };

  return (
    <ProfessionalServiceContext.Provider value={contextValue}>
      {children}
    </ProfessionalServiceContext.Provider>
  );
};

// Custom hook to use the context
export const useProfessionalService = (): ProfessionalServiceContextType => {
  const context = useContext(ProfessionalServiceContext);
  if (context === undefined) {
    throw new Error("useProfessionalService must be used within a ProfessionalServiceProvider");
  }
  return context;
};

export default ProfessionalServiceProvider;
