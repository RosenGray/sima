import Image from 'next/image'
import Link from 'next/link'
import styles from './Logo.module.scss'
import { generateBackblazeUrl } from '@/utils/common'

interface LogoProps {
  isDark: boolean
}

export const Logo = ({ isDark }: LogoProps) => {
  const darkSrc = generateBackblazeUrl("sima", "sima.dark.logo.png");
  const lightSrc = generateBackblazeUrl("sima", "sima.light.logo.png");
  console.log('isDark',isDark)
  const logoSrc = isDark ? darkSrc : lightSrc;
  console.log('logoSrc',logoSrc)
  return (
    <div className={styles.LogoContainer}>
      <Link href="/">
        <Image width={150} height={55} src={logoSrc} alt="Sima" priority />
      </Link>
    </div>
  )
}