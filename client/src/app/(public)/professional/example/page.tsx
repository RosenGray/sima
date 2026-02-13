import { SerializedProfessionalPage } from "@/lib/professionals/professional-page/types/professional-page.types";
import ProfessionalPageView from "../_components/ProfessionalPageView/ProfessionalPageView";
import { UserRole } from "@/lib/auth/types/auth.scema";

const DUMMY_PAGE: SerializedProfessionalPage = {
  id: "example-id",
  publicId: "example-pub",
  slug: "example",
  user: {
    id: "user-example",
    email: "alexey@example.com",
    firstName: "Алексей",
    lastName: "Петров",
    isEmailVerified: true,
    role: UserRole.User,
    hasPrivateProfessionalPage: true,
    createdAt: "2024-06-01T10:00:00.000Z",
    updatedAt: "2024-06-01T10:00:00.000Z",
  },
  displayName: "Алексей Петров",
  description: `Профессиональный сантехник с более чем 12-летним опытом работы в Израиле.

Предоставляю полный спектр сантехнических услуг:
- Установка и ремонт смесителей, унитазов, раковин
- Замена и ремонт труб (водоснабжение, канализация)
- Установка бойлеров и фильтров для воды
- Устранение протечек и засоров любой сложности
- Монтаж систем отопления

Работаю быстро, качественно и с гарантией на все виды работ. Выезд в день обращения. Бесплатная консультация по телефону.

Обслуживаю центральный район: Тель-Авив, Рамат-Ган, Гиватаим, Бней-Брак, Холон, Бат-Ям.`,
  profileImage: {
    id: "profile-1",
    originalName: "profile.jpg",
    uniqueName: "profile-example.jpg",
    url: "https://picsum.photos/seed/pro-avatar/400/400",
    fieldname: "profileImage",
    folderName: "example",
  },
  galleryImages: [
    {
      id: "gallery-1",
      originalName: "work-1.jpg",
      uniqueName: "gallery-1.jpg",
      url: "https://picsum.photos/seed/pro-work1/800/600",
      fieldname: "galleryImages",
      folderName: "example",
    },
    {
      id: "gallery-2",
      originalName: "work-2.jpg",
      uniqueName: "gallery-2.jpg",
      url: "https://picsum.photos/seed/pro-work2/800/600",
      fieldname: "galleryImages",
      folderName: "example",
    },
    {
      id: "gallery-3",
      originalName: "work-3.jpg",
      uniqueName: "gallery-3.jpg",
      url: "https://picsum.photos/seed/pro-work3/800/600",
      fieldname: "galleryImages",
      folderName: "example",
    },
  ],
  category: {
    id: "cat-example",
    key: "ConstructionRepair",
    displayName: "Construction & Repair",
    description: "Construction and repair services",
    russianDisplayName: "Строительство и ремонт",
    russianDescription: "Услуги строительства и ремонта",
    navItem: { label: "Строительство и ремонт", href: "#", id: "nav-cat" },
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2024-01-01T00:00:00.000Z",
  },
  subCategory: {
    id: "subcat-example",
    key: "Plumbing",
    displayName: "Plumbing",
    description: "Plumbing services",
    russianDisplayName: "Сантехника",
    russianDescription: "Сантехнические услуги",
    serviceCategoryKey: "ConstructionRepair",
    serviceCategory: {
      id: "cat-example",
      key: "ConstructionRepair",
      displayName: "Construction & Repair",
      description: "Construction and repair services",
      russianDisplayName: "Строительство и ремонт",
      russianDescription: "Услуги строительства и ремонта",
      navItem: { label: "Строительство и ремонт", href: "#", id: "nav-cat" },
      createdAt: "2024-01-01T00:00:00.000Z",
      updatedAt: "2024-01-01T00:00:00.000Z",
    },
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2024-01-01T00:00:00.000Z",
  },
  district: "Центр",
  city: "Тель-Авив",
  contactPhone: "+972-50-123-4567",
  contactEmail: "alexey.petrov@example.com",
  socialLinks: {
    whatsapp: "https://wa.me/972501234567",
    instagram: "https://instagram.com/alexey_plumber",
    facebook: "https://facebook.com/alexey.petrov.plumber",
    website: "https://example.com",
  },
  isPublished: true,
  createdAt: "2024-06-01T10:00:00.000Z",
  updatedAt: "2025-01-15T14:30:00.000Z",
};

export default function ProfessionalExamplePage() {
  return <ProfessionalPageView page={DUMMY_PAGE} />;
}
