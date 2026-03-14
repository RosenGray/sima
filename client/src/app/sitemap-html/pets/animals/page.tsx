import type { Metadata } from "next";
import { animals } from "@/lib/pets/for-sale/animals";
import {
  SubSitemapContainer,
  PageTitle,
  ManufacturerSection,
  ManufacturerHeading,
  ModelList,
  ModelItem,
} from "../../vehicles/_components/SubSitemapLayout.styles";

export const metadata: Metadata = {
  title: "Все виды и породы животных | Sima",
  description:
    "Полный список видов и пород животных на Sima — поиск объявлений о продаже по каждой породе.",
};

export default function PetsAnimalsPage() {
  const animalList = Object.values(animals);

  return (
    <SubSitemapContainer size="3">
      <PageTitle as="h1" size="6">
        Виды и породы животных
      </PageTitle>
      <p>
        <a href="/sitemap-html">← Карта сайта</a>
        &nbsp;/&nbsp;
        <a href="/pets/for-sale">Животные — продажа</a>
      </p>

      {animalList.map((animal) => (
        <ManufacturerSection key={animal.id}>
          <ManufacturerHeading as="h2" size="4">
            <a href={`/pets/for-sale?animal=${animal.id}`}>
              {animal.russianName}
            </a>
          </ManufacturerHeading>
          <ModelList>
            {animal.kinds.map((kind) => (
              <ModelItem key={kind.id}>
                <a
                  href={`/pets/for-sale?animal=${animal.id}&kind=${kind.id}`}
                >
                  {animal.russianName} — {kind.russianName}
                </a>
              </ModelItem>
            ))}
          </ModelList>
        </ManufacturerSection>
      ))}
    </SubSitemapContainer>
  );
}
