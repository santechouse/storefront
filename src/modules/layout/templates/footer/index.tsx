import { useTranslations } from "next-intl";
import Image from "next/image";

export default function Footer() {
  const t = useTranslations("Footer");
  return (
    <footer className="mt-12 border-t bg-secondary py-12 px-4 md:px-10 lg:px-20 flex justify-center">
      <div className="w-full max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-2">
              <div className="relative size-6">
                <Image
                  src="/logo.svg"
                  className="object-cover"
                  alt="santechouse"
                  fill
                />
              </div>
              <h3 className="text-lg font-bold">Santechouse</h3>
            </div>
            <p className="text-text-secondary text-xs leading-relaxed">
              {t("description")}
            </p>
          </div>
        </div>
        <div className="border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-text-secondary text-sm">
            © 2025 Santechouse. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
