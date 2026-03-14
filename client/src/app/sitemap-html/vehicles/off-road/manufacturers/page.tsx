import type { Metadata } from "next";
import { getOffRoadVehicleManufacturers } from "@/lib/vehicles/off-road/offRoadVehicleManufacturers";
import {
  SubSitemapContainer,
  PageTitle,
  ManufacturerSection,
  ManufacturerHeading,
  ModelList,
  ModelItem,
} from "../../_components/SubSitemapLayout.styles";

export const metadata: Metadata = {
  title: "Все марки и модели внедорожников | Sima",
  description:
    "Полный список марок и моделей внедорожников и кроссоверов на Sima.",
};

export default function OffRoadManufacturersPage() {
  const manufacturers = getOffRoadVehicleManufacturers();

  return (
    <SubSitemapContainer size="3">
      <PageTitle as="h1" size="6">
        Марки и модели внедорожников
      </PageTitle>
      <p>
        <a href="/sitemap-html">← Карта сайта</a>
        &nbsp;/&nbsp;
        <a href="/vehicles/off-road">Внедорожники</a>
      </p>

      {manufacturers.map((mfr) => (
        <ManufacturerSection key={mfr.id}>
          <ManufacturerHeading as="h2" size="4">
            <a href={`/vehicles/off-road?manufacturer=${mfr.id}`}>
              {mfr.russianName}
            </a>
          </ManufacturerHeading>
          <ModelList>
            {mfr.models.map((model) => (
              <ModelItem key={model.id}>
                <a
                  href={`/vehicles/off-road?manufacturer=${mfr.id}&model=${model.id}`}
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
