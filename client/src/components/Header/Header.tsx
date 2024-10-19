'use client'

import React, { ReactNode, useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import * as NavigationMenu from '@radix-ui/react-navigation-menu'
import classNames from 'classnames'
import { CaretDownIcon } from '@radix-ui/react-icons'
import simaLightLogo from '@/assets/images/sima.light.logo.png'
import simaDarkLogo from '@/assets/images/sima.dark.logo.png'
import styles from './Header.module.scss'
import Image from 'next/image'
import realestate from '@/assets/images/realestate.webp'
import professionals from '@/assets/images/professionals.webp'
import marketPlace from '@/assets/images/marketPlace.webp'
import { Spinner } from '@radix-ui/themes'

console.log('this is a header component')

const NavigationMenuDemo = () => {
  const { theme, setTheme } = useTheme()

  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  console.log(theme)
  console.log('NODE_ENVsadasdsd,',process.env.NODE_ENV)
  const isDark = theme === 'dark'
  // const [isDark, setIsDark] = useState(false);
  const logoSrc = isDark ? simaDarkLogo : simaLightLogo
  // if (!isMounted) return null
  return (
    <Spinner loading={!isMounted}>
      <header className={styles.Header}>
        <button
        onClick={() => {
          if (isDark) {
            setTheme('light')
          } else {
            setTheme('dark')
          }
        }}
      >
        bbbb
      </button>

        <div className={styles.LogoContainer}>
          <Image src={logoSrc.src} fill alt="Sima" objectFit="contain" />
        </div>

        <NavigationMenu.Root className={styles.NavigationMenuRoot}>
          <NavigationMenu.List className={styles.NavigationMenuList}>
            {/* Item 1 */}
            <NavigationMenu.Item>
              <NavigationMenu.Trigger className={styles.NavigationMenuTrigger}>
                Недвижимость
                <CaretDownIcon className={styles.CaretDown} aria-hidden />
              </NavigationMenu.Trigger>
              <NavigationMenu.Content className={styles.NavigationMenuContent}>
                <ul className={`${styles.List} ${styles.One}`}>
                  <li style={{ gridRow: 'span 3' }}>
                    <div className={styles.ItemAsImageBlock}>
                      <Image src={realestate.src} fill alt="Real Estate" />
                    </div>
                  </li>

                  

                  <ListItem href="https://stitches.dev/" title="">
                    Квартиры в аренду
                  </ListItem>
                  <ListItem href="/colors" title="">
                    Квартиры на продажу
                  </ListItem>
                  <ListItem href="https://icons.radix-ui.com/" title="">
                    Агентства недвижимости в Израиле
                  </ListItem>
                </ul>
              </NavigationMenu.Content>
            </NavigationMenu.Item>
            {/* Item 2 */}
            <NavigationMenu.Item>
              <NavigationMenu.Trigger className={styles.NavigationMenuTrigger}>
                Профессионалы
                <CaretDownIcon className={styles.CaretDown} aria-hidden />
              </NavigationMenu.Trigger>
              <NavigationMenu.Content className={styles.NavigationMenuContent}>
                <ul className={`${styles.List} ${styles.Two}`}>
                  <li style={{ gridRow: '1/4', width: 200 }}>
                    <div className={styles.ItemAsImageBlock}>
                      <Image
                        src={professionals.src}
                        fill
                        alt="Real Estate"
                        objectFit="cover"
                      />
                    </div>
                  </li>
                  <ListItem
                    title="Introduction"
                    href="/primitives/docs/overview/introduction"
                  >
                    Build high-quality, accessible design systems and web apps.
                  </ListItem>
                  <ListItem
                    title="Getting started"
                    href="/primitives/docs/overview/getting-started"
                  >
                    A quick tutorial to get you up and running with Radix
                    Primitives.
                  </ListItem>
                  <ListItem
                    title="Styling"
                    href="/primitives/docs/guides/styling"
                  >
                    Unstyled and compatible with any styling solution.
                  </ListItem>
                  <ListItem
                    title="Animation"
                    href="/primitives/docs/guides/animation"
                  >
                    Use CSS keyframes or any animation library of your choice.
                  </ListItem>
                  <ListItem
                    title="Accessibility"
                    href="/primitives/docs/overview/accessibility"
                  >
                    Tested in a range of browsers and assistive technologies.
                  </ListItem>
                  <ListItem
                    title="Releases"
                    href="/primitives/docs/overview/releases"
                  >
                    Radix Primitives releases and their changelogs.
                  </ListItem>
                </ul>
              </NavigationMenu.Content>
            </NavigationMenu.Item>
            {/* Item 3 */}
            <NavigationMenu.Item>
              <NavigationMenu.Trigger className={styles.NavigationMenuTrigger}>
                Куплю-Продам
                <CaretDownIcon className={styles.CaretDown} aria-hidden />
              </NavigationMenu.Trigger>
              <NavigationMenu.Content className={styles.NavigationMenuContent}>
                <ul className={`${styles.List} ${styles.Two}`}>
                  <li style={{ gridRow: '1/4', width: 200 }}>
                    <div className={styles.ItemAsImageBlock}>
                      <Image
                        src={marketPlace.src}
                        fill
                        alt="Real Estate"
                        objectFit="cover"
                      />
                    </div>
                  </li>
                  <ListItem
                    title="Introduction"
                    href="/primitives/docs/overview/introduction"
                  >
                    Build high-quality, accessible design systems and web apps.
                  </ListItem>
                  <ListItem
                    title="Getting started"
                    href="/primitives/docs/overview/getting-started"
                  >
                    A quick tutorial to get you up and running with Radix
                    Primitives.
                  </ListItem>
                  <ListItem
                    title="Styling"
                    href="/primitives/docs/guides/styling"
                  >
                    Unstyled and compatible with any styling solution.
                  </ListItem>
                  <ListItem
                    title="Animation"
                    href="/primitives/docs/guides/animation"
                  >
                    Use CSS keyframes or any animation library of your choice.
                  </ListItem>
                  <ListItem
                    title="Accessibility"
                    href="/primitives/docs/overview/accessibility"
                  >
                    Tested in a range of browsers and assistive technologies.
                  </ListItem>
                  <ListItem
                    title="Releases"
                    href="/primitives/docs/overview/releases"
                  >
                    Radix Primitives releases and their changelogs.
                  </ListItem>
                </ul>
              </NavigationMenu.Content>
            </NavigationMenu.Item>
            {/* Item 3 */}
            {/* <NavigationMenu.Item>
            <NavigationMenu.Link
              className={styles.NavigationMenuLink}
              href="https://github.com/radix-ui"
            >
              Github
            </NavigationMenu.Link>
          </NavigationMenu.Item> */}

            <NavigationMenu.Indicator
              className={styles.NavigationMenuIndicator}
            >
              <div className={styles.Arrow} />
            </NavigationMenu.Indicator>
          </NavigationMenu.List>

          <div className={styles.ViewportPosition}>
            <NavigationMenu.Viewport
              className={styles.NavigationMenuViewport}
            />
          </div>
        </NavigationMenu.Root>
        <div style={{width:100,height:100,border:'2px solid blue'}} className={styles.Temp}>ddd</div>
      </header>
    </Spinner>
  )
}

interface ListItemProps {
  className: string
  children: ReactNode
  title: string
  [key: string]: any
}

const ListItem = React.forwardRef<HTMLAnchorElement, ListItemProps>(
  ({ className, children, title, ...props }, forwardedRef) => (
    <li>
      <NavigationMenu.Link asChild>
        <a
          className={classNames(styles.ListItemLink, className)}
          {...props}
          ref={forwardedRef}
        >
          <div className={styles.ListItemHeading}>{title}</div>
          <p className={styles.ListItemText}>{children}</p>
        </a>
      </NavigationMenu.Link>
    </li>
  )
)

export default NavigationMenuDemo
