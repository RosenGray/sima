"use client";
import { usePathname, useSearchParams } from "next/navigation";
import { FC } from "react";
import Link from "next/link";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import {
  PaginationContainer,
  PaginationButton,
  PaginationNavButton,
  PaginationEllipsis,
  PaginationInfo,
} from "./Pagination.styles";

interface PaginationProps {
  totalPages: number;
}

const Pagination: FC<PaginationProps> = ({ totalPages }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  // Generate page numbers to display
  const generatePageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 7; // Total number of page buttons to show

    if (totalPages <= maxVisiblePages) {
      // Show all pages if total is less than max visible
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      if (currentPage <= 3) {
        // Near the beginning
        for (let i = 2; i <= 4; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        // Near the end
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        // In the middle
        pages.push("...");
        pages.push(currentPage - 1);
        pages.push(currentPage);
        pages.push(currentPage + 1);
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const pageNumbers = generatePageNumbers();
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  if (totalPages <= 1) {
    return null;
  }

  return (
    <PaginationContainer>
      {/* Previous Button */}
      <Link
        href={createPageURL(currentPage - 1)}
        style={{ pointerEvents: isFirstPage ? "none" : "auto" }}
      >
        <PaginationNavButton disabled={isFirstPage} variant="outline">
          <ChevronLeftIcon />
          Previous
        </PaginationNavButton>
      </Link>

      {/* Page Info (mobile hidden) */}
      <PaginationInfo>
        Page {currentPage} of {totalPages}
      </PaginationInfo>

      {/* Page Numbers */}
      {pageNumbers.map((page, index) => {
        if (page === "...") {
          return <PaginationEllipsis key={`ellipsis-${index}`}>...</PaginationEllipsis>;
        }

        const pageNumber = page as number;
        const isActive = pageNumber === currentPage;

        return (
          <Link key={pageNumber} href={createPageURL(pageNumber)}>
            <PaginationButton $isActive={isActive} variant="outline">
              {pageNumber}
            </PaginationButton>
          </Link>
        );
      })}

      {/* Next Button */}
      <Link
        href={createPageURL(currentPage + 1)}
        style={{ pointerEvents: isLastPage ? "none" : "auto" }}
      >
        <PaginationNavButton disabled={isLastPage} variant="outline">
          Next
          <ChevronRightIcon />
        </PaginationNavButton>
      </Link>
    </PaginationContainer>
  );
};

export default Pagination;
