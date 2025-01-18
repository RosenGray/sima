"use client";
import { FC, ReactNode, useEffect } from "react";
import { useRouter } from "next/router";
import Loader from "../Loader/Loader";

const DelayedRedirect: FC<{ children?: ReactNode }> = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/");
    }, 1500);

    return () => clearTimeout(timer);
  }, [router]);

  return <div>{children || <Loader isSuccess />}</div>;
};

export default DelayedRedirect;
