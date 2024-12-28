"use client";

import React, { ReactNode, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import * as Navigation from "@radix-ui/react-navigation-menu";
import classNames from "classnames";
import {
  CaretDownIcon,
  HamburgerMenuIcon,
  MoonIcon,
  CrossCircledIcon,
  HomeIcon,
} from "@radix-ui/react-icons";
import { yellow } from '@radix-ui/colors';

import simaLightLogo from "@/assets/images/sima.light.logo.png";
import simaDarkLogo from "@/assets/images/sima.dark.logo.png";
import Image from "next/image";
import realestate from "@/assets/images/realestate.webp";
import professionals from "@/assets/images/professionals.webp";
import marketPlace from "@/assets/images/marketPlace.webp";
import { IconButton, Spinner } from "@radix-ui/themes";
import styles from "./Header.module.scss";

console.log("this is a header component");

const NavigationMenu = () => {
  const { theme, setTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const toggleThemeHandler = () => {
    if (isDark) {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  function toggleMenuVisibilityHandler(){
    setMenuIsOpen((p) => !p);
  };

  console.log(theme);
  console.log("NODE_ENVsadasdsd,", process.env.NODE_ENV);
  const envtest = process.env.NEXT_PUBLIC_TEST;
  console.log("API envtest:", envtest);
  const isDark = theme === "dark";
  // const [isDark, setIsDark] = useState(false);
  const logoSrc = isMounted ? (isDark ? simaDarkLogo : simaLightLogo) : simaLightLogo;

  // if (!isMounted) return null
  return (
    <Spinner loading={!isMounted}>
      {/* <h1 className={styles.h1}>ddd</h1> */}
      <div  className={styles.AppHeaderContainer} data-menu-is-open={menuIsOpen}>
        {menuIsOpen && <div onClick={toggleMenuVisibilityHandler} className={styles.BackDrop}></div>}
        <header className={styles.AppHeader}>
          <IconButton onClick={toggleThemeHandler} color="yellow">
            <MoonIcon />
          </IconButton>

          <div className={styles.LogoContainer}>
            <Image  width={150} src={logoSrc}  alt="Sima"  priority/>
          </div>
          <IconButton className={styles.HamburgerIconButton} color="yellow">
            {menuIsOpen ? (
              <CrossCircledIcon onClick={toggleMenuVisibilityHandler} />
            ) : (
              <HamburgerMenuIcon onClick={toggleMenuVisibilityHandler} />
            )}
          </IconButton>
          <aside className={styles.Aside}>
            <section className={styles.TopSection}></section>
            <section className={styles.BottomSection}>
              <Navigation.Root className={styles.NavigationMenuRoot}>
                <Navigation.List className={styles.NavigationMenuList}>
                  {/* Item 1 */}
                  <Navigation.Item className={styles.NavigationMenuItem}>
                    <Navigation.Trigger
                      className={styles.NavigationMenuTrigger}
                    >
                      Недвижимость
                      <HomeIcon
                        className={styles.CaretDown}
                        aria-hidden
                      />
                    </Navigation.Trigger>
                    <Navigation.Content
                      className={styles.NavigationMenuContent}
                    >
                      <ul className={`${styles.List} ${styles.One}`}>
                        <li className={styles.HideOnMobile} style={{ gridRow: "span 3" }}>
                          <div className={styles.ItemAsImageBlock}>
                            <Image
                              src={realestate}
                              fill
                              alt="Real Estate"
                              style={{ objectFit: "cover" }}
                            />
                          </div>
                        </li>

                        <ListItem href="https://stitches.dev/" title="">
                          Квартиры в аренду
                        </ListItem>
                        <ListItem href="/realestate/forsale" title="">
                          Квартиры на продажу
                        </ListItem>
                        <ListItem href="https://icons.radix-ui.com/" title="">
                          Агентства недвижимости в Израиле
                        </ListItem>
                        <ListItem href="https://icons.radix-ui.com/" title="">
                          Агентства недвижимости в Израиле
                        </ListItem>
                        <ListItem href="https://icons.radix-ui.com/" title="">
                          Агентства недвижимости в Израиле
                        </ListItem>
                      </ul>
                    </Navigation.Content>
                  </Navigation.Item>
                  {/* Item 2 */}
                  <Navigation.Item className={styles.NavigationMenuItem}>
                    <Navigation.Trigger
                      className={styles.NavigationMenuTrigger}
                    >
                      Профессионалы
                      <HomeIcon
                        className={styles.CaretDown}
                        aria-hidden
                      />
                    </Navigation.Trigger>
                    <Navigation.Content
                      className={styles.NavigationMenuContent}
                    >
                      <ul className={`${styles.List} ${styles.Two}`}>
                        <li className={styles.HideOnMobile}  style={{ gridRow: "1/4" }}>
                          <div className={styles.ItemAsImageBlock}>
                            <Image
                              src={professionals}
                              fill
                              alt="Real Estate"
                              style={{objectFit:'cover'}}
                            />
                          </div>
                        </li>
                        <ListItem
                          title=""
                          href="/primitives/docs/overview/introduction"
                        >
                          Build high-quality, accessible design systems and web
                          apps.
                        </ListItem>
                        <ListItem
                          title=""
                          href="/primitives/docs/overview/introduction"
                        >
                          Build high-quality, accessible design systems and web
                          apps.
                        </ListItem>
                        <ListItem
                          title=""
                          href="/primitives/docs/overview/introduction"
                        >
                          Build high-quality, accessible design systems and web
                          apps.
                        </ListItem>
                        <ListItem
                          title=""
                          href="/primitives/docs/overview/introduction"
                        >
                          Build high-quality, accessible design systems and web
                          apps.
                        </ListItem>
                        <ListItem
                          title=""
                          href="/primitives/docs/overview/introduction"
                        >
                          Build high-quality, accessible design systems and web
                          apps.
                        </ListItem>
                        <ListItem
                          title=""
                          href="/primitives/docs/overview/introduction"
                        >
                          Build high-quality, accessible design systems and web
                          apps.
                        </ListItem>
                      </ul>
                    </Navigation.Content>
                  </Navigation.Item>
                  {/* Item 3 */}
                  <Navigation.Item className={styles.NavigationMenuItem}>
                    <Navigation.Trigger
                      className={styles.NavigationMenuTrigger}
                    >
                      Куплю-Продам
                      <HomeIcon
  
                        className={styles.CaretDown}
                        aria-hidden
                      />
                    </Navigation.Trigger>
                    <Navigation.Content
                      className={styles.NavigationMenuContent}
                    >
                      <ul className={`${styles.List} ${styles.Two}`}>
                        {/* <li style={{ gridRow: "1/4", width: 200 }}>
                    <div className={styles.ItemAsImageBlock}>
                      <Image
                        src={marketPlace}
                        fill
                        alt="Real Estate"
                        objectFit="cover"
                      />
                    </div>
                  </li> */}
                        <ListItem
                          title=""
                          href="/primitives/docs/overview/introduction"
                        >
                          Build high-quality, accessible design systems and web
                          apps.
                        </ListItem>
                        <ListItem
                          title=""
                          href="/primitives/docs/overview/introduction"
                        >
                          Build high-quality, accessible design systems and web
                          apps.
                        </ListItem>
                        <ListItem
                          title=""
                          href="/primitives/docs/overview/introduction"
                        >
                          Build high-quality, accessible design systems and web
                          apps.
                        </ListItem>
                      </ul>
                    </Navigation.Content>
                  </Navigation.Item>

                  <Navigation.Indicator className={styles.NavigationMenuIndicator}>
                <div className={styles.Arrow} />
              </Navigation.Indicator>
                </Navigation.List>

                <div className={styles.ViewportPosition}>
                  <Navigation.Viewport
                    className={styles.NavigationMenuViewport}
                  />
                </div>
              </Navigation.Root>
            </section>
          </aside>
        </header>
      </div>
    </Spinner>
  );
};

interface ListItemProps {
  className: string;
  children: ReactNode;
  title: string;
  [key: string]: any;
}

const ListItem = React.forwardRef<HTMLAnchorElement, ListItemProps>(
  ({ className, children, title, href, ...props }, forwardedRef) => (
    <li className={styles.ListItem}>
      <Link
        className={classNames(styles.ListItemLink, className)}
        href={href}
        {...props}
        ref={forwardedRef}
      >
        <div className={styles.ListItemHeading}>{title}</div>
        <p className={styles.ListItemText}>{children}</p>
      </Link>
    </li>
  )
);
ListItem.displayName = "ListItem";

export default NavigationMenu;
