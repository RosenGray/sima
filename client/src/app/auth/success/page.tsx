'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import SuccessPageLoader from "./loading";

const SuccessPage = () => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/');
    }, 4000);

    return () => clearTimeout(timer);
  }, [router]);

  return <SuccessPageLoader />
};

export default SuccessPage;
