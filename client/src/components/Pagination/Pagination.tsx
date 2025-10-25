"use client";
import { usePathname, useSearchParams } from "next/navigation";
import { FC } from "react";

interface PaginationProps {
  totalPages: number;
}
const Pagination: FC<PaginationProps> = ({ totalPages }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  return (
    <div>
      <h1>Pagination, totalPages: {totalPages}</h1>
    </div>
  );
};

export default Pagination;
