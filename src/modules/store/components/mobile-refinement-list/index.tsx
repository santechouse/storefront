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
  ArrowLeft,
  Check,
  CornerDownRightIcon,
  SlidersHorizontalIcon,
} from "lucide-react";
import { useTranslations } from "next-intl";

interface Props {
  initialCategory?: HttpTypes.StoreProductCategory;
  categories: HttpTypes.StoreProductCategory[]; // This must be the full tree
}

// Helper: Deep find the current object
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

// Helper: Deep find the PARENT of the current object
// We need this because the category object itself often doesn't have parent data
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

// Custom type for our display items so TS doesn't complain
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
    // 1. If nothing is selected, show top-level categories
    if (!viewingCategoryId) {
      return categories.map((cat) => ({ ...cat, role: "choice" }));
    }

    const current = findCategoryInTree(viewingCategoryId, categories);

    // Safety check: if current ID is invalid/not found, reset to root list
    if (!current) {
      return categories.map((cat) => ({ ...cat, role: "choice" }));
    }

    const items: DisplayItem[] = [];

    // 2. Find the parent to determine where the "Back" button goes
    const parent = findParentInTree(viewingCategoryId, categories);

    if (parent) {
      // If we have a parent, Back button goes to Parent
      items.push({
        ...parent,
        role: "parent",
        displayName: `${parent.name}`,
      });
    }

    // 3. Add the Current Category (Marked as selected)
    items.push({ ...current, role: "selected" });

    // 4. Add Children (Drill-down options)
    if (current.category_children?.length) {
      current.category_children.forEach((child) => {
        items.push({ ...child, role: "child" });
      });
    }

    return items;
  }, [viewingCategoryId, categories]);

  const handleApply = () => {
    // If viewing root (null), go to base catalog
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
        <Button variant="secondary" className="border font-normal gap-2">
          <SlidersHorizontalIcon className="size-4" />
          {t("title")}
        </Button>
      </SheetTrigger>

      <SheetContent
        side="right"
        className="flex flex-col w-[300px] sm:w-[400px]"
      >
        <SheetHeader className="text-left">
          <SheetTitle>{t("title")}</SheetTitle>
          <SheetDescription />
        </SheetHeader>
        <div className="flex-1 overflow-y-auto">
          <div className="flex flex-col gap-1">
            <div className="uppercase text-muted-foreground text-xs ml-4 font-medium">
              {t("categories")}
            </div>
            {displayItems.map((item) => {
              const isSelected = item.role === "selected";
              const isBack = item.role === "parent" || item.role === "root";

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    if (item.role === "selected") return; // Do nothing if clicking current header

                    if (item.role === "root") {
                      setViewingCategoryId(null);
                    } else {
                      setViewingCategoryId(item.id);
                    }
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-4 text-sm rounded-lg transition-colors ${
                    isSelected
                      ? "bg-slate-100 dark:bg-slate-800 font-bold text-primary cursor-default"
                      : "hover:bg-slate-50 dark:hover:bg-slate-900"
                  }`}
                >
                  {isBack && <ArrowLeft className="size-4 text-slate-500" />}
                  {isSelected && <Check className="size-4" />}
                  {item.role === "child" && (
                    <CornerDownRightIcon className="size-4 text-slate-400 ml-2" />
                  )}

                  <span className="flex-1 text-left">
                    {item.displayName || item.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
        <SheetFooter className="mt-auto pt-4 border-t">
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
