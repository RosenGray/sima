import Header from "@/components/Header/Header";
import styles from "./page.module.scss";
import BannerCarousel from "@/components/BannerCarousel/BannerCarousel";
import { bannerslides } from "@/components/BannerCarousel/config";
import Image from 'next/image'
import bla from './../assets/images/1.png';
import { config } from "@/utils/config";
import Dummy from "@/components/Dummy/Dummy";
import { Box } from "@radix-ui/themes";
import { customFetch } from "@/fetch/server";

const fetchCurrentUserClient = async () => {
  'use server'
  console.log('this is server')
  const response = await customFetch("/api/auth/signout", {
    credentials: "include",
    method: "POST",
  });
  return response.json();
};

export default function Home() {
  
  return (
    <>
      <Header />
      <main className={styles.Page}>
  
  <form action={fetchCurrentUserClient}>
    <button type="submit">server</button>
  </form>

        <Dummy/>

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
