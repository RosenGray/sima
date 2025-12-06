"use client";
import { createContext, useContext, useState, ReactNode, FC } from "react";

interface CarsFiltersContextType {
  temp?: string;
}

const CarsFiltersContext = createContext<CarsFiltersContextType | undefined>(
  undefined
);

export const useFiltersModal = () => {
  const context = useContext(CarsFiltersContext);
  if (!context) {
    throw new Error("useFiltersModal must be used within CarsFiltersProvider");
  }
  return context;
};

interface CarsFiltersProviderProps {
  children: ReactNode;
}

export const CarsFiltersProvider: FC<CarsFiltersProviderProps> = ({
  children,
}) => {
  return (
    <CarsFiltersContext.Provider value={{}}>
      {children}
    </CarsFiltersContext.Provider>
  );
};
