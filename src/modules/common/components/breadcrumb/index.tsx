"use client";

import * as Native from "@/components/ui/breadcrumb";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import React, { Fragment } from "react";

interface BreadcrumbProps {
  items: Array<{
    name: string;
    link: string;
  }>;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  const t = useTranslations("Breadcrumb");

  return (
    <Native.Breadcrumb>
      <Native.BreadcrumbList>
        <Native.BreadcrumbItem>
          <Native.BreadcrumbLink asChild>
            <Link href="/">{t("home")}</Link>
          </Native.BreadcrumbLink>
        </Native.BreadcrumbItem>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <Fragment key={item.link}>
              <Native.BreadcrumbSeparator />
              <Native.BreadcrumbItem>
                {isLast ? (
                  <Native.BreadcrumbPage>{item.name}</Native.BreadcrumbPage>
                ) : (
                  <Native.BreadcrumbLink asChild>
                    <Link href={item.link}>{item.name}</Link>
                  </Native.BreadcrumbLink>
                )}
              </Native.BreadcrumbItem>
            </Fragment>
          );
        })}
      </Native.BreadcrumbList>
    </Native.Breadcrumb>
  );
};

export default Breadcrumb;
