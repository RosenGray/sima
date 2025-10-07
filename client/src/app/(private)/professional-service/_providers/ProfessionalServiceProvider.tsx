"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { IProfessionalService } from "@/lib/professionals/professional-service/models/ProfessionalService";

// Context type
interface ProfessionalServiceContextType {
  professionalServices: IProfessionalService[];
}

const ProfessionalServiceContext = createContext<ProfessionalServiceContextType | undefined>(
  undefined
);

// Provider component
interface ProfessionalServiceProviderProps {
  children: ReactNode;
  data: IProfessionalService[];
}

export const ProfessionalServiceProvider: React.FC<ProfessionalServiceProviderProps> = ({
  children,
  data,
}) => {
  const contextValue: ProfessionalServiceContextType = {
    professionalServices: data,
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
