"use client";

import { Heading, Text } from "@radix-ui/themes";
import {
  VehiclesPageContainer,
  VehiclesGrid,
} from "./page.styles";
import {
  CubeIcon,
  MixIcon,
  BoxIcon,
  RocketIcon,
  LightningBoltIcon,
  LayersIcon,
  DrawingPinIcon,
  SpeakerLoudIcon,
} from "@radix-ui/react-icons";
import IconCard from "@/components/IconCard/IconCard";

interface VehicleCategory {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
}

const vehicleCategories: VehicleCategory[] = [
  {
    id: "passenger-cars",
    title: "Легковые автомобили",
    description: "Продажа легковых автомобилей различных марок и моделей",
    icon: <CubeIcon width="32" height="32" />,
    href: "/publish-ad/vehicles/passenger-cars",
  },
  {
    id: "off-road",
    title: "Внедорожники и джипы",
    description: "Внедорожники, джипы и автомобили повышенной проходимости",
    icon: <MixIcon width="32" height="32" />,
    href: "/publish-ad/vehicles/off-road",
  },
  {
    id: "commercial",
    title: "Коммерческий транспорт",
    description: "Грузовые автомобили, фургоны и коммерческий транспорт",
    icon: <BoxIcon width="32" height="32" />,
    href: "/publish-ad/vehicles/commercial",
  },
  {
    id: "motorcycles",
    title: "Мотоциклы",
    description: "Мотоциклы различных классов и моделей",
    icon: <RocketIcon width="32" height="32" />,
    href: "/publish-ad/vehicles/motorcycles",
  },
  {
    id: "scooters",
    title: "Скутеры",
    description: "Скутеры и мопеды для городской езды",
    icon: <LightningBoltIcon width="32" height="32" />,
    href: "/publish-ad/vehicles/scooters",
  },
  {
    id: "atv",
    title: "Квадроциклы",
    description: "Квадроциклы и вездеходы для бездорожья",
    icon: <LayersIcon width="32" height="32" />,
    href: "/publish-ad/vehicles/atv",
  },
  {
    id: "trailers",
    title: "Прицепы, караваны и специальные",
    description: "Прицепы, караваны и специальные транспортные средства",
    icon: <DrawingPinIcon width="32" height="32" />,
    href: "/publish-ad/vehicles/trailers",
  },
  {
    id: "accessories",
    title: "Аксессуары и звук",
    description: "Автомобильные аксессуары и аудиосистемы",
    icon: <SpeakerLoudIcon width="32" height="32" />,
    href: "/publish-ad/vehicles/accessories",
  },
];

const PublishAdVehiclesPage = () => {
  return (
    <VehiclesPageContainer size="3">
      <Heading size="8" mb="6" align="center">
        Транспорт
      </Heading>
      <Text
        size="4"
        style={{ display: "block" }}
        color="gray"
        mb="10px"
        align="center"
        as="p"
      >
        Выберите категорию транспортного средства
      </Text>
      <VehiclesGrid
        width="100%"
        columns={{
          initial: "1",
          xs: "2",
          md: "3",
        }}
        gap={{
          initial: "4",
          md: "5",
          lg: "6",
        }}
      >
        {vehicleCategories.map((category) => (
          <IconCard
            key={category.id}
            icon={category.icon}
            title={category.title}
            description={""}
            href={category.href}
          />
        ))}
      </VehiclesGrid>
    </VehiclesPageContainer>
  );
};

export default PublishAdVehiclesPage;