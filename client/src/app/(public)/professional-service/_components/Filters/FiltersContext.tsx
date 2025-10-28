"use client";
import { createContext, useContext, useState, ReactNode, FC } from "react";

interface FiltersContextType {
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const FiltersContext = createContext<FiltersContextType | undefined>(undefined);

export const useFiltersModal = () => {
  const context = useContext(FiltersContext);
  if (!context) {
    throw new Error("useFiltersModal must be used within FiltersProvider");
  }
  return context;
};

interface FiltersProviderProps {
  children: ReactNode;
}

export const FiltersProvider: FC<FiltersProviderProps> = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <FiltersContext.Provider value={{ isModalOpen, openModal, closeModal }}>
      {children}
    </FiltersContext.Provider>
  );
};

