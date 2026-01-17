import { FC } from "react";
import FiltersClient from "./FiltersClient";
import { FiltersProvider } from "@/components/filters/FiltersContext";

const Filters: FC = () => {
  return (
    <FiltersProvider>
      <FiltersClient />
    </FiltersProvider>
  );
};

export default Filters;
