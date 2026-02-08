"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { SerializeServiceCategory } from "@/lib/service-categories/types/service-categories.types";

// Context type
interface HomePageContextType {
  serviceCategories: SerializeServiceCategory[];
}

const HomePageContext = createContext<HomePageContextType | undefined>(
  undefined
);

// Provider component
interface ProfessionalServiceProviderProps {
  children: ReactNode;
  data: {
    serviceCategories: SerializeServiceCategory[];
  }
}

export const HomePageProvider: React.FC<ProfessionalServiceProviderProps> = ({
  children,
  data,
}) => {
  const contextValue: HomePageContextType = {
    serviceCategories: data.serviceCategories,
  };

  return (
    <HomePageContext.Provider value={contextValue}>
      {children}
    </HomePageContext.Provider>
  );
};

// Custom hook to use the context
export const useHomePage = (): HomePageContextType => {
  const context = useContext(HomePageContext);
  if (context === undefined) {
    throw new Error("useHomePage must be used within a HomePageProvider");
  }
  return context;
};

export default HomePageProvider;
