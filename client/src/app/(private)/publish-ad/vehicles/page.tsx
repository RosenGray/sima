"use client";

import { Heading, Text } from "@radix-ui/themes";
import { VehiclesPageContainer, VehiclesGrid } from "./page.styles";
import IconCard from "@/components/IconCard/IconCard";
import CarIcon from "@/components/svg/vehicles/Car/Car";
import TruckIcon from "@/components/svg/vehicles/Truck/Truck";
import CommercialCarIcon from "@/components/svg/vehicles/Commercial/Commercial";
import MotorcycleIcon from "@/components/svg/vehicles/Motorcycle/Motorcycle";
import ScooterIcon from "@/components/svg/vehicles/Scooter/Scooter";
import AtvIcon from "@/components/svg/vehicles/Atv/Atv";
import CaravanIcon from "@/components/svg/vehicles/Caravan/Caravan";
import AccessoriesAndSoundIcon from "@/components/svg/vehicles/AccessoriesAndSound/AccessoriesAndSound";

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
    icon: <CarIcon viewBox={{ width: 120, height: 120 }}/>,
    href: "/publish-ad/vehicles/cars/create",
  },
  {
    id: "off-road",
    title: "Внедорожники и джипы",
    description: "Внедорожники, джипы и автомобили повышенной проходимости",
    icon: <TruckIcon viewBox={{ width: 120, height: 120 }}/>,
    href: "/publish-ad/vehicles/off-road/create",
  },
  {
    id: "commercial",
    title: "Коммерческий транспорт",
    description: "Грузовые автомобили, фургоны и коммерческий транспорт",
    icon: <CommercialCarIcon viewBox={{ width: 120, height: 120 }}/>,
    href: "/publish-ad/vehicles/commercial-vehicles/create",
  },
  {
    id: "motorcycles",
    title: "Мотоциклы",
    description: "Мотоциклы различных классов и моделей",
    icon: <MotorcycleIcon viewBox={{ width: 120, height: 120 }}/>,
    href: "/publish-ad/vehicles/motorcycles/create",
  },
  {
    id: "scooters",
    title: "Скутеры",
    description: "Скутеры и мопеды для городской езды",
    icon: <ScooterIcon viewBox={{ width: 120, height: 120 }}/>,
    href: "/publish-ad/vehicles/scooters/create",
  },
  {
    id: "atv",
    title: "Квадроциклы",
    description: "Квадроциклы и вездеходы для бездорожья",
    icon: <AtvIcon viewBox={{ width: 120, height: 120 }}/>,
    href: "/publish-ad/vehicles/special-vehicles/create",
  },
  {
    id: "trucks",
    title: "Грузовики",
    description: "Грузовики и фургоны для перевозки грузов",
    icon: <TruckIcon viewBox={{ width: 120, height: 120 }}/>,
    href: "/publish-ad/vehicles/special-vehicles/create",
  },
  {
    id: "special-vehicles",
    title: "Специальные транспортные средства",
    description: "Прицепы, караваны и специальные транспортные средства",
    icon: <CaravanIcon viewBox={{ width: 120, height: 120 }}/>,
    href: "/publish-ad/vehicles/special-vehicles/create",
  },
  {
    id: "accessories",
    title: "Аксессуары и звук",
    description: "Автомобильные аксессуары и аудиосистемы",
    icon: <AccessoriesAndSoundIcon viewBox={{ width: 120, height: 120 }}/>,
    href: "/publish-ad/vehicles/accessories/create",
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
