"use client";
import { Link } from "@/i18n/navigation";
import { SearchIcon, ShoppingCart, UserIcon } from "lucide-react";
import Image from "next/image";
import React from "react";
import { SearchInput } from "../../components/search-input";
import { MobileSearchInput } from "../../components/mobile-search-input";
import { Button } from "@/components/ui/button";

export default function Nav() {
  const [isMobileSearch, setMobileSearch] = React.useState(false);
  if (isMobileSearch) {
    return <MobileSearchInput onClose={() => setMobileSearch(false)} />;
  }
  return (
    <div className=" sticky top-0 z-50 w-full px-4 py-4 md:px-6 lg:px-8 flex justify-center backdrop-blur-md bg-white/80 dark:bg-background/80 border-b border-slate-200 dark:border-[#282e39]/50">
      <div className="flex w-full items-center justify-between gap-4">
        <div className="flex items-center gap-8 md:gap-12">
          <div className="flex items-center gap-3 text-slate-900 dark:text-white">
            <div className="size-8 text-primary">
              <Image src="/logo.svg" width={40} height={40} alt="Logo" />
            </div>
            <h2 className="text-xl font-bold leading-tight tracking-[-0.015em]">
              Santechouse
            </h2>
          </div>
        </div>
        <div className="flex items-center justify-end gap-4 md:gap-6 flex-1">
          <div className="hidden md:flex flex-col min-w-40 h-10 max-w-64 flex-1">
            <SearchInput />
          </div>
          <div className="flex gap-3">
            <Button
              onClick={() => setMobileSearch(true)}
              variant="secondary"
              className="rounded-full lg:hidden"
            >
              <SearchIcon className="size-4" />
            </Button>
            <Link href="/cart" className="hidden lg:block">
              <Button size="icon" variant="secondary" className="rounded-full">
                <ShoppingCart className="size-4" />
              </Button>
            </Link>
            <Link href="/profile" className="hidden lg:block">
              <Button size="icon" variant="secondary" className="rounded-full">
                <UserIcon className="size-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
