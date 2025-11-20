import { FC } from "react";
import { FiltersProvider } from "@/components/filters/FiltersContext";
import FiltersClient from "./FiltersClient";

const Filters: FC = () => {
  return (
    <FiltersProvider>
      <FiltersClient />
    </FiltersProvider>
  );
};

export default Filters;

