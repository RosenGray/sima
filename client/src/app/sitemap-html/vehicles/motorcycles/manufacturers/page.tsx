import type { Metadata } from "next";
import { getMotorcycleManufacturers } from "@/lib/vehicles/motorcycles/motorcycleManufacturers";
import {
  SubSitemapContainer,
  PageTitle,
  ManufacturerSection,
  ManufacturerHeading,
  ModelList,
  ModelItem,
} from "../../_components/SubSitemapLayout.styles";

export const metadata: Metadata = {
  title: "Все марки и модели мотоциклов | Sima",
  description:
    "Полный список марок и моделей мотоциклов на Sima — поиск по каждой марке и модели.",
};

export default function MotorcyclesManufacturersPage() {
  const manufacturers = getMotorcycleManufacturers();

  return (
    <SubSitemapContainer size="3">
      <PageTitle as="h1" size="6">
        Марки и модели мотоциклов
      </PageTitle>
      <p>
        <a href="/sitemap-html">← Карта сайта</a>
        &nbsp;/&nbsp;
        <a href="/vehicles/motorcycles">Мотоциклы</a>
      </p>

      {manufacturers.map((mfr) => (
        <ManufacturerSection key={mfr.id}>
          <ManufacturerHeading as="h2" size="4">
            <a href={`/vehicles/motorcycles?manufacturer=${mfr.id}`}>
              {mfr.russianName}
            </a>
          </ManufacturerHeading>
          <ModelList>
            {mfr.models.map((model) => (
              <ModelItem key={model.id}>
                <a
                  href={`/vehicles/motorcycles?manufacturer=${mfr.id}&model=${model.id}`}
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
