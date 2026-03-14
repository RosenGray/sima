import type { Metadata } from "next";
import { getScooterManufacturers } from "@/lib/vehicles/scooters/scooterManufacturers";
import {
  SubSitemapContainer,
  PageTitle,
  ManufacturerSection,
  ManufacturerHeading,
  ModelList,
  ModelItem,
} from "../../_components/SubSitemapLayout.styles";

export const metadata: Metadata = {
  title: "Все марки и модели скутеров | Sima",
  description: "Полный список марок и моделей скутеров на Sima.",
};

export default function ScootersManufacturersPage() {
  const manufacturers = getScooterManufacturers();

  return (
    <SubSitemapContainer size="3">
      <PageTitle as="h1" size="6">
        Марки и модели скутеров
      </PageTitle>
      <p>
        <a href="/sitemap-html">← Карта сайта</a>
        &nbsp;/&nbsp;
        <a href="/vehicles/scooters">Скутеры</a>
      </p>

      {manufacturers.map((mfr) => (
        <ManufacturerSection key={mfr.id}>
          <ManufacturerHeading as="h2" size="4">
            <a href={`/vehicles/scooters?manufacturer=${mfr.id}`}>
              {mfr.russianName}
            </a>
          </ManufacturerHeading>
          <ModelList>
            {mfr.models.map((model) => (
              <ModelItem key={model.id}>
                <a
                  href={`/vehicles/scooters?manufacturer=${mfr.id}&model=${model.id}`}
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
