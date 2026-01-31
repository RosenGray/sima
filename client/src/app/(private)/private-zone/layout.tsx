import type { Metadata } from "next";
import {
  PrivateZoneLayoutSection,
  PrivateZoneContentRow,
  PrivateZoneSidebar,
  PrivateZoneMain,
} from "./layout.styles";
import PrivateZoneHeader from "@/components/Header/PrivateZoneHeader/PrivateZoneHeader";
import PrivateZoneSidebarContent from "./_components/PrivateZoneSidebarContent/PrivateZoneSidebarContent";
import { requireAuthOrRedirectTo } from "@/lib/auth/utils/auth.utils";

export const metadata: Metadata = {
  title: "Личный кабинет",
  description: "Личный кабинет",
};

export default async function PrivateZoneLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await requireAuthOrRedirectTo("/auth/login");

  return (
    <PrivateZoneLayoutSection>
      <PrivateZoneHeader />
      <PrivateZoneContentRow>
        <PrivateZoneSidebar>
          <PrivateZoneSidebarContent />
        </PrivateZoneSidebar>
        <PrivateZoneMain>{children}</PrivateZoneMain>
      </PrivateZoneContentRow>
    </PrivateZoneLayoutSection>
  );
}
