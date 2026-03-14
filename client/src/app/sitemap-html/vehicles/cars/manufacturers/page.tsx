import type { Metadata } from "next";
import { getVehicleManufacturers } from "@/lib/vehicles/cars/vehicleManufacturers";
import {
  SubSitemapContainer,
  PageTitle,
  ManufacturerSection,
  ManufacturerHeading,
  ModelList,
  ModelItem,
} from "../../_components/SubSitemapLayout.styles";

export const metadata: Metadata = {
  title: "Все марки и модели автомобилей | Sima",
  description:
    "Полный список марок и моделей автомобилей на Sima — поиск по каждой марке и модели.",
};

export default function CarsManufacturersPage() {
  const manufacturers = getVehicleManufacturers();

  return (
    <SubSitemapContainer size="3">
      <PageTitle as="h1" size="6">
        Марки и модели автомобилей
      </PageTitle>
      <p>
        <a href="/sitemap-html">← Карта сайта</a>
        &nbsp;/&nbsp;
        <a href="/vehicles/cars">Легковые автомобили</a>
      </p>

      {manufacturers.map((mfr) => (
        <ManufacturerSection key={mfr.id}>
          <ManufacturerHeading as="h2" size="4">
            <a href={`/vehicles/cars?manufacturer=${mfr.id}`}>
              {mfr.russianName}
            </a>
          </ManufacturerHeading>
          <ModelList>
            {mfr.models.map((model) => (
              <ModelItem key={model.id}>
                <a
                  href={`/vehicles/cars?manufacturer=${mfr.id}&model=${model.id}`}
                >
                  {mfr.russianName} {model.russianName}
                </a>
              </ModelItem>
            ))}
          </ModelList>
        </ManufacturerSection>
      ))}
    </SubSitemapContainer>
  );
}
