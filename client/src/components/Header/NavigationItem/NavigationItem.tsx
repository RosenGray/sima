import React, { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import * as Navigation from "@radix-ui/react-navigation-menu";
import classNames from "classnames";
import styles from "./NavigationItem.module.scss";

interface NavigationItemProps {
  title: string;
  icon: JSX.Element;
  imageSrc: string;
  innerListClassNames: string;
  menuItems: ListItemProps[];
  hideImageOnMobile: boolean;
}

const NavigationItem: FC<NavigationItemProps> = ({
  title,
  innerListClassNames,
  icon,
  imageSrc,
  menuItems = [],
  hideImageOnMobile = true,
}) => {
  return (
    <Navigation.Item className={styles.NavigationMenuItem}>
      <Navigation.Trigger className={styles.NavigationMenuTrigger}>
        {title}
        {icon}
      </Navigation.Trigger>

      <Navigation.Content className={styles.NavigationMenuContent}>
        <ul className={`${innerListClassNames}`}>
          {imageSrc && (
            <li
              className={`${hideImageOnMobile ? styles.HideOnMobile : ""}`}
              style={{ gridRow: "span 3" }}
            >
              <div className={styles.ItemAsImageBlock}>
                <Image
                  src={imageSrc}
                  fill
                  alt={title}
                  style={{ objectFit: "cover" }}
                />
              </div>
            </li>
          )}

          {menuItems.map((item, index) => (
            <ListItem
              key={index}
              href={item.href}
              title={item.title || ""}
              subTitle={item.subTitle}
            />
          ))}
        </ul>
      </Navigation.Content>
    </Navigation.Item>
  );
};

export interface ListItemProps {
  title: string;
  subTitle: string;
  href: string;
}

const ListItem = React.forwardRef<HTMLAnchorElement, ListItemProps>(
  ({ subTitle, title, href, ...props }, forwardedRef) => (
    <li className={styles.ListItem}>
      <Link
        {...props}
        className={classNames(styles.ListItemLink)}
        href={href}
        ref={forwardedRef}
      >
        <div className={styles.ListItemHeading}>{title}</div>
        <p className={styles.ListItemText}>{subTitle}</p>
      </Link>
    </li>
  )
);
ListItem.displayName = "ListItem";

export default NavigationItem;
