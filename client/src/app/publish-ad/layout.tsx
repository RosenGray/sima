import SimpleHeader from "@/components/Header/SimpleHeader/SimpleHeader";
import type { Metadata } from "next";
import styles from "./layout.module.scss";

export const metadata: Metadata = {
  title: "Публикация нового объявления",
  description: "Публикация нового объявления",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className={styles.PublishAdLayout}>
      <SimpleHeader />
      <main>{children}</main>
    </section>
  );
}
