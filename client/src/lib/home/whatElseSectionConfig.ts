import { navItems } from "@/components/Header/Header/navItems";

export interface WhatElseFlowLink {
  label: string;
  href: string;
}

export interface WhatElseFlowTab {
  id: string;
  label: string;
  links: WhatElseFlowLink[];
}

const LABEL_TO_ID: Record<string, string> = {
  "Транспорт": "transport",
  "Домашние животные": "pets",
  "Недвижимость": "real-estate",
  "Куплю-Продам": "yad2",
  "Работа": "jobs",
  "Другое": "other",
  "Услуги специалистов": "professional-service",
};

function labelToId(label: string): string {
  return LABEL_TO_ID[label] ?? label.toLowerCase().replace(/\s+/g, "-");
}

export function getWhatElseFlowTabs(): WhatElseFlowTab[] {
  const fromNav = navItems.map((item) => ({
    id: labelToId(item.label),
    label: item.label,
    links: (item.subItems ?? []).map((s) => ({ label: s.label, href: s.href })),
  }));

  const hasProfessional = fromNav.some((t) => t.id === "professional-service");
  if (!hasProfessional) {
    fromNav.unshift({
      id: "professional-service",
      label: "Услуги специалистов",
      links: [{ label: "Все", href: "/professional-service" }],
    });
  }

  return fromNav;
}
