"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { ServiceCategoryMapping } from "@/lib/professionals/types/professionals.scema";

// Context type
interface PublishAdContextType {
  mappedCategories: ServiceCategoryMapping;
}

const PublishAdContext = createContext<PublishAdContextType | undefined>(
  undefined
);

// Provider component
interface PublishAdProviderProps {
  children: ReactNode;
  data: {
    mappedCategories: ServiceCategoryMapping;
  };
}

export const PublishAdProvider: React.FC<PublishAdProviderProps> = ({
  children,
  data,
}) => {
  const contextValue: PublishAdContextType = {
    mappedCategories: data.mappedCategories,
  };

  return (
    <PublishAdContext.Provider value={contextValue}>
      {children}
    </PublishAdContext.Provider>
  );
};

// Custom hook to use the context
export const usePublishAd = (): PublishAdContextType => {
  const context = useContext(PublishAdContext);
  if (context === undefined) {
    throw new Error("usePublishAd must be used within a PublishAdProvider");
  }
  return context;
};

export default PublishAdProvider;
