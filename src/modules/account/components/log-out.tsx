"use client";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { signout } from "@/lib/data/customer";
import {
  ArrowRight01Icon,
  LogoutSquare01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useTranslations } from "next-intl";

export const LogOut = () => {
  const t = useTranslations("Account");
  const handleLogout = async () => {
    await signout();
  };
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <div className="flex items-center justify-between px-4 py-3.5 cursor-pointer active:bg-rose-50 dark:active:bg-rose-950/20 transition-colors text-rose-500">
          <div className="flex items-center gap-3">
            <span className="opacity-70">
              <HugeiconsIcon className="size-5" icon={LogoutSquare01Icon} />
            </span>
            <span className="text-sm font-medium">{t("logOut")}</span>
          </div>
          <HugeiconsIcon icon={ArrowRight01Icon} className="size-4 opacity-40" />
        </div>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="text-xl text-rose-500">Logout</DrawerTitle>
          <DrawerDescription>
            Are you sure you want to log out?
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <div className="flex justify-between gap-3">
            <DrawerClose className="w-1/2">
              <Button className="w-full" variant="outline">
                Cancel
              </Button>
            </DrawerClose>
            <Button onClick={handleLogout} className="w-1/2">
              Logout
            </Button>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
