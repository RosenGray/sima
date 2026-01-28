"use client";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  FC,
  useCallback,
} from "react";

interface FiltersContextType {
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  // Track which dropdown is currently open
  openDropdownId: string | null;
  setOpenDropdownId: (id: string | null) => void;
}

const FiltersContext = createContext<FiltersContextType | undefined>(undefined);

export const useFiltersModal = () => {
  const context = useContext(FiltersContext);
  if (!context) {
    throw new Error("useFiltersModal must be used within FiltersProvider");
  }
  return context;
};

// Hook specifically for dropdown coordination
export const useDropdownCoordination = () => {
  const context = useContext(FiltersContext);
  // Return null values if not within provider (for standalone usage)
  if (!context) {
    return {
      openDropdownId: null,
      setOpenDropdownId: () => {},
    };
  }
  return {
    openDropdownId: context.openDropdownId,
    setOpenDropdownId: context.setOpenDropdownId,
  };
};

interface FiltersProviderProps {
  children: ReactNode;
}

export const FiltersProvider: FC<FiltersProviderProps> = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openDropdownId, setOpenDropdownIdState] = useState<string | null>(
    null
  );

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const setOpenDropdownId = useCallback((id: string | null) => {
    setOpenDropdownIdState(id);
  }, []);

  return (
    <FiltersContext.Provider
      value={{
        isModalOpen,
        openModal,
        closeModal,
        openDropdownId,
        setOpenDropdownId,
      }}
    >
      {children}
    </FiltersContext.Provider>
  );
};

