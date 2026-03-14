import type { Metadata } from "next";
import { getCommercialVehicleManufacturers } from "@/lib/vehicles/commercial-vehicles/vehicleCommercialManufacturers";
import {
  SubSitemapContainer,
  PageTitle,
  ManufacturerSection,
  ManufacturerHeading,
  ModelList,
  ModelItem,
} from "../../_components/SubSitemapLayout.styles";

export const metadata: Metadata = {
  title: "Все марки коммерческого транспорта | Sima",
  description:
    "Полный список марок и моделей коммерческих автомобилей на Sima.",
};

export default function CommercialVehiclesManufacturersPage() {
  const manufacturers = getCommercialVehicleManufacturers();

  return (
    <SubSitemapContainer size="3">
      <PageTitle as="h1" size="6">
        Марки коммерческого транспорта
      </PageTitle>
      <p>
        <a href="/sitemap-html">← Карта сайта</a>
        &nbsp;/&nbsp;
        <a href="/vehicles/commercial-vehicles">Коммерческий транспорт</a>
      </p>

      {manufacturers.map((mfr) => (
        <ManufacturerSection key={mfr.id}>
          <ManufacturerHeading as="h2" size="4">
            <a href={`/vehicles/commercial-vehicles?manufacturer=${mfr.id}`}>
              {mfr.russianName}
            </a>
          </ManufacturerHeading>
          <ModelList>
            {mfr.models.map((model) => (
              <ModelItem key={model.id}>
                <a
                  href={`/vehicles/commercial-vehicles?manufacturer=${mfr.id}&model=${model.id}`}
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
