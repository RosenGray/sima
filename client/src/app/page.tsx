import Header from "@/components/Header/Header";
import styles from "./page.module.scss";
import BannerCarousel from "@/components/BannerCarousel/BannerCarousel";
import { bannerslides } from "@/components/BannerCarousel/config";
import Image from 'next/image'
import bla from './../assets/images/1.png';

export default function Home() {
  return (
    <>
      <Header />
      <main className={styles.Page}>
        
      {/* <BannerCarousel slides={bannerslides}/> */}

      {/* <Image
      src={bla}
      // width={140}
      /> */}

{/* <img
      src={bla.src}
      width={140}
      /> */}
      </main>


      <footer style={{ height: 60, background: "black" }}>placeholder</footer>
    </>
  );
}
