import type { Metadata } from "next";
import { Flex } from "@radix-ui/themes";
import {
  SitemapContainer,
  PageTitle,
  SectionBlock,
  SectionHeading,
  SubSectionHeading,
  LinkList,
  LinkItem,
  SubSitemapLink,
} from "./page.styles";

export const metadata: Metadata = {
  title: "Карта сайта | Sima",
  description: "Все разделы и страницы сайта Sima",
  robots: { index: true, follow: true },
};

const VEHICLE_SECTIONS = [
  { href: "/vehicles/cars", label: "Легковые автомобили" },
  { href: "/vehicles/motorcycles", label: "Мотоциклы" },
  { href: "/vehicles/off-road", label: "Внедорожники" },
  { href: "/vehicles/scooters", label: "Скутеры" },
  { href: "/vehicles/commercial-vehicles", label: "Коммерческий транспорт" },
  { href: "/vehicles/special-vehicles", label: "Спецтехника" },
  { href: "/vehicles/accessories", label: "Запчасти и аксессуары" },
];

const PET_SECTIONS = [
  { href: "/pets/for-sale", label: "Животные — продажа" },
  { href: "/pets/for-free", label: "Животные — отдаём даром" },
  { href: "/pets/accessories", label: "Зоотовары" },
];

const REAL_ESTATE_SECTIONS = [
  { href: "/real-estate/for-sale", label: "Продажа недвижимости" },
  { href: "/real-estate/for-rent", label: "Аренда недвижимости" },
  { href: "/real-estate/commercial-real-estate", label: "Коммерческая недвижимость" },
];

const OTHER_SECTIONS = [
  { href: "/jobs", label: "Работа" },
  { href: "/professional-service", label: "Профессиональные услуги" },
  { href: "/other", label: "Разное" },
  { href: "/yad2", label: "Яд2" },
];

const INFO_SECTIONS = [
  { href: "/about", label: "О нас" },
  { href: "/service/contact-us", label: "Связаться с нами" },
];

// Human-readable sub-sitemap pages for programmatic SEO discovery
const VEHICLE_SUB_SITEMAPS = [
  { href: "/sitemap/vehicles/cars/manufacturers", label: "Все марки и модели автомобилей" },
  { href: "/sitemap/vehicles/motorcycles/manufacturers", label: "Все марки и модели мотоциклов" },
  { href: "/sitemap/vehicles/off-road/manufacturers", label: "Все марки и модели внедорожников" },
  { href: "/sitemap/vehicles/commercial-vehicles/manufacturers", label: "Все марки коммерческого транспорта" },
  { href: "/sitemap/vehicles/scooters/manufacturers", label: "Все марки и модели скутеров" },
];

const PET_SUB_SITEMAPS = [
  { href: "/sitemap/pets/animals", label: "Все виды и породы животных" },
];

function SiteSection({
  title,
  links,
}: {
  title: string;
  links: { href: string; label: string }[];
}) {
  return (
    <SectionBlock as="section">
      <SectionHeading as="h2" size="4">
        {title}
      </SectionHeading>
      <LinkList>
        {links.map(({ href, label }) => (
          <LinkItem key={href}>
            <a href={href}>{label}</a>
          </LinkItem>
        ))}
      </LinkList>
    </SectionBlock>
  );
}

export default function SitemapPage() {
  return (
    <SitemapContainer size="3">
      <PageTitle as="h1" size="6">
        Карта сайта
      </PageTitle>

      <SiteSection title="Транспортные средства" links={VEHICLE_SECTIONS} />
      <SiteSection title="Животные" links={PET_SECTIONS} />
      <SiteSection title="Недвижимость" links={REAL_ESTATE_SECTIONS} />
      <SiteSection title="Другие объявления" links={OTHER_SECTIONS} />
      <SiteSection title="Информация" links={INFO_SECTIONS} />

      {/* Programmatic SEO sub-sitemap pages */}
      <SectionBlock as="section">
        <SectionHeading as="h2" size="4">
          Марки и модели — подробные страницы
        </SectionHeading>
        <SubSectionHeading as="h3" size="3">
          Транспортные средства
        </SubSectionHeading>
        <Flex wrap="wrap" gap="2">
          {VEHICLE_SUB_SITEMAPS.map(({ href, label }) => (
            <SubSitemapLink key={href} href={href}>
              {label} →
            </SubSitemapLink>
          ))}
        </Flex>

        <SubSectionHeading as="h3" size="3">
          Животные
        </SubSectionHeading>
        <Flex wrap="wrap" gap="2">
          {PET_SUB_SITEMAPS.map(({ href, label }) => (
            <SubSitemapLink key={href} href={href}>
              {label} →
            </SubSitemapLink>
          ))}
        </Flex>
      </SectionBlock>
    </SitemapContainer>
  );
}
