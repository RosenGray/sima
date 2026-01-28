"use client";

import { Heading, Text } from "@radix-ui/themes";
import { PublishAdPageContainer, PublishAdGrid } from "./page.styles";
import { IdCardIcon, HeartFilledIcon, CameraIcon } from "@radix-ui/react-icons";
import IconCard from "@/components/IconCard/IconCard";
import HandymanIcon from "@/components/svg/Handyman/Handyman";
import HouseIcon from "@/components/svg/House/House";
import TransportIcon from "@/components/svg/Transport/Transport";

interface PublishAdCategory {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
}

const categories: PublishAdCategory[] = [
  {
    id: "professional-services",
    title: "Услуги специалистов",
    description: "Разместите объявление о ваших профессиональных услугах",
    icon: <HandymanIcon viewBox={{ width: 120, height: 120 }} />,
    href: "/publish-ad/professional-service/create",
  },
  {
    id: "real-estate",
    title: "Недвижимость",
    description:
      "Продажа или аренда квартир, домов и коммерческой недвижимости",
    icon: <HouseIcon viewBox={{ width: 120, height: 120 }} />,
    href: "/publish-ad/real-estate",
  },
  {
    id: "vehicles",
    title: "Транспорт",
    description:
      "Продажа автомобилей, мотоциклов и других транспортных средств",
    icon: <TransportIcon viewBox={{ width: 120, height: 120 }} />,
    href: "/publish-ad/vehicles",
  },
  {
    id: "jobs",
    title: "Работа",
    description: "Предложения работы и вакансии для специалистов",
    icon: <IdCardIcon width="32" height="32" />,
    href: "/publish-ad/jobs/create",
  },
  {
    id: "dating",
    title: "Знакомства",
    description: "Поиск новых знакомств и общения",
    icon: <HeartFilledIcon width="32" height="32" />,
    href: "/publish-ad/dating",
  },
  {
    id: "electronics",
    title: "Электроника",
    description: "Техника, гаджеты и электронные устройства",
    icon: <CameraIcon width="32" height="32" />,
    href: "/publish-ad/electronics",
  },
];

const PublishAdPage = () => {
  return (
    <PublishAdPageContainer size="3">
      <Heading size="8" mb="6" align="center">
        Разместить объявление
      </Heading>
      <Text
        size="4"
        style={{ display: "block" }}
        color="gray"
        mb="10px"
        align="center"
        as="p"
      >
        Выберите категорию для размещения вашего объявления
      </Text>
      <PublishAdGrid
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
        {categories.map((category) => (
          <IconCard
            key={category.id}
            icon={category.icon}
            title={category.title}
            description={category.description}
            href={category.href}
          />
        ))}
      </PublishAdGrid>
    </PublishAdPageContainer>
  );
};

export default PublishAdPage;
