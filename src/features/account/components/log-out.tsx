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
      <DrawerTrigger className="w-full">
        <div className="flex justify-between items-center text-rose-500">
          <div className="flex gap-3 items-center">
            <HugeiconsIcon className="size-5" icon={LogoutSquare01Icon} />
            <h3 className="font-medium">{t("logOut")}</h3>
          </div>
          <HugeiconsIcon icon={ArrowRight01Icon} />
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
