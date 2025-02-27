import Image from "next/image";
import Link from "next/link";
import styles from "./Logo.module.scss";
import { generateBackblazeUrl } from "@/utils/common";

interface LogoProps {
  isDark: boolean;
}

export const Logo = ({ isDark }: LogoProps) => {
  const darkSrc = generateBackblazeUrl("public", "sima.dark.logo.png");
  const lightSrc = generateBackblazeUrl("public", "sima.light.logo.png");

  const logoSrc = isDark ? darkSrc : lightSrc;

  return (
    <div className={styles.LogoContainer}>
      <Link href="/">
        <Image width={150} height={55} src={logoSrc} alt="Sima" priority />
      </Link>
    </div>
  );
};
