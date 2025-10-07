"use client";

import React, { createContext, useContext, ReactNode } from "react";

// Context type - placeholder for now
interface ProfessionalServiceContextType {
  // Add actual data types here when needed
  [key: string]: any;
}

const ProfessionalServiceContext = createContext<ProfessionalServiceContextType | undefined>(
  undefined
);

// Provider component
interface ProfessionalServiceProviderProps {
  children: ReactNode;
  data: {
    // Add actual data structure here when needed
    [key: string]: any;
  };
}

export const ProfessionalServiceProvider: React.FC<ProfessionalServiceProviderProps> = ({
  children,
  data,
}) => {
  const contextValue: ProfessionalServiceContextType = {
    // Map placeholder data here when needed
   p:data,
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
