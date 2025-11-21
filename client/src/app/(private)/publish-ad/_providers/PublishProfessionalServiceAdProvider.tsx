"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { ServiceCategoryMapping } from "@/lib/professionals/professional-service/types/professional-service.scema";

// Context type
interface PublishProfessionalServiceAdContextType {
  mappedCategories: ServiceCategoryMapping;
}

const PublishProfessionalServiceAdContext = createContext<
  PublishProfessionalServiceAdContextType | undefined
>(undefined);

// Provider component
interface PublishProfessionalServiceAdProviderProps {
  children: ReactNode;
  data: {
    mappedCategories: ServiceCategoryMapping;
  };
}

export const PublishProfessionalServiceAdProvider: React.FC<
  PublishProfessionalServiceAdProviderProps
> = ({ children, data }) => {
  const contextValue: PublishProfessionalServiceAdContextType = {
    mappedCategories: data.mappedCategories,
  };

  return (
    <PublishProfessionalServiceAdContext.Provider value={contextValue}>
      {children}
    </PublishProfessionalServiceAdContext.Provider>
  );
};

// Custom hook to use the context
export const usePublishProfessionalServiceAd =
  (): PublishProfessionalServiceAdContextType => {
    const context = useContext(PublishProfessionalServiceAdContext);
    if (context === undefined) {
      throw new Error(
        "usePublishProfessionalServiceAd must be used within a PublishProfessionalServiceAdProvider"
      );
    }
    return context;
  };

export default PublishProfessionalServiceAdProvider;
