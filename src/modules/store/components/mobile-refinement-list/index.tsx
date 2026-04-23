"use client";

import React, { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useRouter } from "@/i18n/navigation";
import { HttpTypes } from "@medusajs/types";
import {
  ArrowLeftIcon,
  CheckIcon,
  CornerDownRightIcon,
  SlidersHorizontalIcon,
} from "lucide-react";
import { useTranslations } from "next-intl";

interface Props {
  initialCategory?: HttpTypes.StoreProductCategory;
  categories: HttpTypes.StoreProductCategory[];
}

const findCategoryInTree = (
  id: string,
  tree: HttpTypes.StoreProductCategory[],
): HttpTypes.StoreProductCategory | null => {
  for (const cat of tree) {
    if (cat.id === id) return cat;
    if (cat.category_children?.length) {
      const found = findCategoryInTree(id, cat.category_children);
      if (found) return found;
    }
  }
  return null;
};

const findParentInTree = (
  targetId: string,
  tree: HttpTypes.StoreProductCategory[],
  parent: HttpTypes.StoreProductCategory | null = null,
): HttpTypes.StoreProductCategory | null => {
  for (const cat of tree) {
    if (cat.id === targetId) return parent;
    if (cat.category_children?.length) {
      const found = findParentInTree(targetId, cat.category_children, cat);
      if (found) return found;
    }
  }
  return null;
};

type DisplayItem = HttpTypes.StoreProductCategory & {
  role: "choice" | "selected" | "child" | "parent" | "root";
  displayName?: string;
};

export function MobileRefinementList({ initialCategory, categories }: Props) {
  const t = useTranslations("Filters");
  const router = useRouter();

  const [viewingCategoryId, setViewingCategoryId] = useState<string | null>(
    initialCategory?.id || null,
  );

  const displayItems = useMemo<DisplayItem[]>(() => {
    if (!viewingCategoryId) {
      return categories.map((cat) => ({ ...cat, role: "choice" }));
    }

    const current = findCategoryInTree(viewingCategoryId, categories);
    if (!current) {
      return categories.map((cat) => ({ ...cat, role: "choice" }));
    }

    const items: DisplayItem[] = [];
    const parent = findParentInTree(viewingCategoryId, categories);

    if (parent) {
      items.push({ ...parent, role: "parent", displayName: parent.name });
    }

    items.push({ ...current, role: "selected" });

    if (current.category_children?.length) {
      current.category_children.forEach((child) => {
        items.push({ ...child, role: "child" });
      });
    }

    return items;
  }, [viewingCategoryId, categories]);

  const handleApply = () => {
    if (!viewingCategoryId) {
      router.push("/catalog");
      return;
    }
    const finalCat = findCategoryInTree(viewingCategoryId, categories);
    const path = finalCat ? `/catalog/${finalCat.handle}` : "/catalog";
    router.push(path);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="gap-1.5 text-xs h-8">
          <SlidersHorizontalIcon className="size-3.5" />
          {t("title")}
        </Button>
      </SheetTrigger>

      <SheetContent side="right" className="flex flex-col w-[300px] sm:w-[360px]">
        <SheetHeader className="text-left">
          <SheetTitle className="text-base">{t("title")}</SheetTitle>
          <SheetDescription />
        </SheetHeader>

        <div className="flex-1 overflow-y-auto">
          <div className="mb-3">
            <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground px-1">
              {t("categories")}
            </span>
          </div>
          <div className="rounded-2xl border border-border overflow-hidden divide-y divide-border">
            {displayItems.map((item) => {
              const isSelected = item.role === "selected";
              const isBack = item.role === "parent" || item.role === "root";

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    if (item.role === "selected") return;
                    if (item.role === "root") {
                      setViewingCategoryId(null);
                    } else {
                      setViewingCategoryId(item.id);
                    }
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3.5 text-sm transition-colors text-left ${
                    isSelected
                      ? "bg-primary/5 font-medium text-primary cursor-default"
                      : "hover:bg-muted/40 text-foreground"
                  }`}
                >
                  {isBack && (
                    <ArrowLeftIcon className="size-3.5 text-muted-foreground shrink-0" />
                  )}
                  {isSelected && (
                    <CheckIcon className="size-3.5 text-primary shrink-0" />
                  )}
                  {item.role === "child" && (
                    <CornerDownRightIcon className="size-3.5 text-muted-foreground ml-2 shrink-0" />
                  )}
                  <span className="flex-1">{item.displayName || item.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        <SheetFooter className="mt-auto pt-4 border-t border-border">
          <SheetClose asChild>
            <Button className="w-full" onClick={handleApply}>
              {t("apply")}
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
