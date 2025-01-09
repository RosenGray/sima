"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import * as Navigation from "@radix-ui/react-navigation-menu";
import {
  CaretDownIcon,
  HamburgerMenuIcon,
  MoonIcon,
  CrossCircledIcon,
} from "@radix-ui/react-icons";

import simaLightLogo from "@/assets/images/sima.light.logo.png";
import simaDarkLogo from "@/assets/images/sima.dark.logo.png";
import Image from "next/image";
import realestate from "@/assets/images/realestate.webp";
// import professionals from "@/assets/images/professionals.webp";
// import marketPlace from "@/assets/images/marketPlace.webp";
import { IconButton } from "@radix-ui/themes";
import NavigationItem from "./NavigationItem/NavigationItem";
import { realEstatenavigationItems } from "./config";
import Loader from "../Loader/Loader";
import styles from "./Header.module.scss";

const NavigationMenu = () => {
  const { theme, setTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  console.log(styles);
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

  function toggleMenuVisibilityHandler() {
    setMenuIsOpen((p) => !p);
  }

  const isDark = theme === "dark";
  const logoSrc = isMounted
    ? isDark
      ? simaDarkLogo
      : simaLightLogo
    : simaLightLogo;

  if (!isMounted)
    return (
      <div className={styles.LoaderContainer}>
        <Loader isSpin width={100} height={100} />
      </div>
    );
  return (
    <div className={styles.AppHeaderContainer} data-menu-is-open={menuIsOpen}>
      {menuIsOpen && (
        <div
          onClick={toggleMenuVisibilityHandler}
          className={styles.BackDrop}
        ></div>
      )}
      <header className={styles.AppHeader}>
        <IconButton onClick={toggleThemeHandler} color="yellow">
          <MoonIcon />
        </IconButton>

        <div className={styles.LogoContainer}>
          <Image width={150} src={logoSrc} alt="Sima" priority />
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
                <NavigationItem
                  title="Недвижимость"
                  icon={
                    <CaretDownIcon className={styles.CaretDown} aria-hidden />
                  }
                  innerListClassNames={`${styles.List} ${styles.List__One}`}
                  imageSrc={realestate.src}
                  menuItems={realEstatenavigationItems}
                  hideImageOnMobile={true}
                />

                {/* Item 2 */}
                {/* <Navigation.Item className={styles.NavigationMenuItem}>
                    <Navigation.Trigger
                      className={styles.NavigationMenuTrigger}
                    >
                      Профессионалы
                      <HomeIcon className={styles.CaretDown} aria-hidden />
                    </Navigation.Trigger>
                    <Navigation.Content
                      className={styles.NavigationMenuContent}
                    >
                      <ul className={`${styles.List} ${styles.Two}`}>
                        <li
                          className={styles.HideOnMobile}
                          style={{ gridRow: "1/4" }}
                        >
                          <div className={styles.ItemAsImageBlock}>
                            <Image
                              src={professionals}
                              fill
                              alt="Real Estate"
                              style={{ objectFit: "cover" }}
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
                  </Navigation.Item> */}
                {/* Item 3 */}
                {/* <Navigation.Item className={styles.NavigationMenuItem}>
                    <Navigation.Trigger
                      className={styles.NavigationMenuTrigger}
                    >
                      Куплю-Продам
                      <HomeIcon className={styles.CaretDown} aria-hidden />
                    </Navigation.Trigger>
                    <Navigation.Content
                      className={styles.NavigationMenuContent}
                    >
                      <ul className={`${styles.List} ${styles.Two}`}>
                        <li style={{ gridRow: "1/4", width: 200 }}>
                    <div className={styles.ItemAsImageBlock}>
                      <Image
                        src={marketPlace}
                        fill
                        alt="Real Estate"
                        objectFit="cover"
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
                      </ul>
                    </Navigation.Content>
                  </Navigation.Item> */}

                <Navigation.Indicator
                  className={styles.NavigationMenuIndicator}
                >
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
  );
};

export default NavigationMenu;
