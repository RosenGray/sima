"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Button } from "@radix-ui/themes";
import { TabsWrapper } from "@/app/(private)/private-zone/my-ads/my-ads.styles";
import type { MyAdsStatusFilter } from "@/lib/my-ads/actions/getMyAds";

const TABS: { value: MyAdsStatusFilter; label: string }[] = [
  { value: "active", label: "Активные" },
  { value: "expired", label: "Истёкшие" },
  { value: "archived", label: "В архиве" },
  { value: "all", label: "Все" },
];

interface MyAdsStatusTabsProps {
  currentStatus: MyAdsStatusFilter;
}

export default function MyAdsStatusTabs({ currentStatus }: MyAdsStatusTabsProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleChange = (status: MyAdsStatusFilter) => {
    const params = new URLSearchParams(searchParams?.toString() ?? "");
    params.set("status", status);
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <TabsWrapper>
      {TABS.map((tab) => (
        <Button
          key={tab.value}
          size="2"
          variant={currentStatus === tab.value ? "soft" : "outline"}
          color={currentStatus === tab.value ? "blue" : "gray"}
          style={{ cursor: "pointer" }}
          onClick={() => handleChange(tab.value)}
        >
          {tab.label}
        </Button>
      ))}
    </TabsWrapper>
  );
}
