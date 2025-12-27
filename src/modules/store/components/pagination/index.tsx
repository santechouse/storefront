"use client";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useRouter } from "@/i18n/navigation";
import { useSearchParams } from "next/navigation";
import { useTransition } from "react";

interface DataTablePaginationProps {
  currentPage: number;
  totalPages: number;
}

export function ProductPagination({
  currentPage,
  totalPages,
}: DataTablePaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  // Logic to determine which page numbers to show
  //
  function onPageChange(page: number) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", `${page}`);

    startTransition(() => {
      router.push(`?${params.toString()}`);
    });
  }

  const getPages = () => {
    const pages: (number | string)[] = [];
    const showMax = 2;

    pages.push(1);

    if (currentPage > showMax + 2) {
      pages.push("ellipsis-1");
    }

    const start = Math.max(2, currentPage - showMax);
    const end = Math.min(totalPages - 1, currentPage + showMax);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (currentPage < totalPages - (showMax + 1)) {
      pages.push("ellipsis-2");
    }

    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={(e) => {
              e.preventDefault();
              if (currentPage > 1) onPageChange(currentPage - 1);
            }}
            className={
              currentPage === 1
                ? "pointer-events-none opacity-50"
                : "cursor-pointer"
            }
          />
        </PaginationItem>
        {getPages().map((page, idx) => (
          <PaginationItem key={idx}>
            {page === "ellipsis-1" || page === "ellipsis-2" ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink
                onClick={(e) => {
                  e.preventDefault();
                  onPageChange(page as number);
                }}
                isActive={currentPage === page}
              >
                {page}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext
            onClick={(e) => {
              e.preventDefault();
              if (currentPage < totalPages) onPageChange(currentPage + 1);
            }}
            className={
              currentPage === totalPages
                ? "pointer-events-none opacity-50"
                : "cursor-pointer"
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
