import { Text } from "@radix-ui/themes";
import Link from "next/link";

interface NavigationSubItem {
  label: string;
  href: string;
}

interface NavigationItem {
  label: string;
  type: "dropdown" | "link";
  subItems: NavigationSubItem[];
}

export type NavigationItems = NavigationItem[];

export const renderLinkOrDropdown = (item: NavigationItem) => {
  return (
    <Text size="2" weight="medium">
      {item.type === "link" ? (
        <Link href={item.subItems[0].href}>{item.label}</Link>
      ) : (
        item.label
      )}
    </Text>
  );
};
