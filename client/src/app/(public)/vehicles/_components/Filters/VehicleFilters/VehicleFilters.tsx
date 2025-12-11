"use client";
import { FC, ReactNode } from "react";
import { Flex, Heading, IconButton, Text } from "@radix-ui/themes";
import { MixerHorizontalIcon, CrossCircledIcon } from "@radix-ui/react-icons";
import { useFiltersModal } from "@/components/filters/FiltersContext";
import {
  VehicleFiltersContainer,
  VehicleFiltersContent,
  VehicleFiltersHeader,
  MobileFilterButton,
  FiltersCountBadge,
  VehicleFiltersNavBar,
  VehiclesFiltersNavBarList,
  VehicleFiltersNavBarItem,
} from "./VehicleFilters.styles";
import CarIcon from "@/components/svg/vehicles/Car/Car";
import TruckIcon from "@/components/svg/vehicles/Truck/Truck";
import CommercialCarIcon from "@/components/svg/vehicles/Commercial/Commercial";
import MotorcycleIcon from "@/components/svg/vehicles/Motorcycle/Motorcycle";
import ScooterIcon from "@/components/svg/vehicles/Scooter/Scooter";
import AtvIcon from "@/components/svg/vehicles/Atv/Atv";
import CaravanIcon from "@/components/svg/vehicles/Caravan/Caravan";
import AccessoriesAndSoundIcon from "@/components/svg/vehicles/AccessoriesAndSound/AccessoriesAndSound";
import Link from "next/link";
import { usePathname } from "next/navigation";


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
    icon: (
      <CarIcon width={45} height={45} viewBox={{ width: 120, height: 120 }} />
    ),
    href: "/vehicles/cars",
  },
  {
    id: "off-road",
    title: "Внедорожники и джипы",
    description: "Внедорожники, джипы и автомобили повышенной проходимости",
    icon: (
      <TruckIcon width={45} height={45} viewBox={{ width: 120, height: 120 }} />
    ),
    href: "/publish-ad/vehicles/off-road",
  },
  {
    id: "commercial",
    title: "Коммерческий транспорт",
    description: "Грузовые автомобили, фургоны и коммерческий транспорт",
    icon: (
      <CommercialCarIcon
        width={45}
        height={45}
        viewBox={{ width: 120, height: 120 }}
      />
    ),
    href: "/publish-ad/vehicles/commercial",
  },
  {
    id: "motorcycles",
    title: "Мотоциклы",
    description: "Мотоциклы различных классов и моделей",
    icon: (
      <MotorcycleIcon
        width={45}
        height={45}
        viewBox={{ width: 120, height: 120 }}
      />
    ),
    href: "/publish-ad/vehicles/motorcycles",
  },
  {
    id: "scooters",
    title: "Скутеры",
    description: "Скутеры и мопеды для городской езды",
    icon: (
      <ScooterIcon
        width={45}
        height={45}
        viewBox={{ width: 120, height: 120 }}
      />
    ),
    href: "/publish-ad/vehicles/scooters",
  },
  {
    id: "atv",
    title: "Квадроциклы",
    description: "Квадроциклы и вездеходы для бездорожья",
    icon: (
      <AtvIcon width={45} height={45} viewBox={{ width: 120, height: 120 }} />
    ),
    href: "/publish-ad/vehicles/atv",
  },
  {
    id: "trailers",
    title: "Прицепы, караваны и специальные",
    description: "Прицепы, караваны и специальные транспортные средства",
    icon: (
      <CaravanIcon
        width={45}
        height={45}
        viewBox={{ width: 120, height: 120 }}
      />
    ),
    href: "/publish-ad/vehicles/trailers",
  },
  {
    id: "accessories",
    title: "Аксессуары и звук",
    description: "Автомобильные аксессуары и аудиосистемы",
    icon: (
      <AccessoriesAndSoundIcon
        width={45}
        height={45}
        viewBox={{ width: 120, height: 120 }}
      />
    ),
    href: "/publish-ad/vehicles/accessories",
  },
];

interface VehicleFiltersProps {
  children: ReactNode;
  activeFiltersCount?: number;
}

const VehicleFilters: FC<VehicleFiltersProps> = ({
  children,
  activeFiltersCount = 0,
}) => {
  const { isModalOpen, openModal, closeModal } = useFiltersModal();
  const pathname = usePathname();
  console.log('pathname', pathname);
  return (
    <>
      {/* Desktop View */}
      <VehicleFiltersContainer $isModalOpen={isModalOpen}>
        <VehicleFiltersHeader>
          <IconButton
            size="4"
            variant="ghost"
            color="gray"
            onClick={closeModal}
          >
            <CrossCircledIcon width="28" height="28" />
          </IconButton>
          <Heading size="4">Фильтры</Heading>
        </VehicleFiltersHeader>
        <VehicleFiltersNavBar>
          <VehiclesFiltersNavBarList>
            {vehicleCategories.map((category) => (
              <VehicleFiltersNavBarItem $isActive={pathname === category.href} key={category.id}>
                <Link href={category.href}>
                  {category.icon}
                  {/* <Text size="2">{category.title}</Text> */}
                </Link>
              </VehicleFiltersNavBarItem>
            ))}
          </VehiclesFiltersNavBarList>
        </VehicleFiltersNavBar>
        <VehicleFiltersContent>{children}</VehicleFiltersContent>
      </VehicleFiltersContainer>

      {/* Mobile Filter Button */}
      <MobileFilterButton size="2" variant="soft" onClick={openModal}>
        <Flex align="center" gap="2">
          <MixerHorizontalIcon width="18" height="18" />
          <Text>Фильтры</Text>
          {activeFiltersCount > 0 && (
            <FiltersCountBadge>{activeFiltersCount}</FiltersCountBadge>
          )}
        </Flex>
      </MobileFilterButton>
    </>
  );
};

export default VehicleFilters;
