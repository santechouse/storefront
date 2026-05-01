import { Link } from "@/i18n/navigation";
import { Brand } from "@/types/brand";

export function BrandCard(props: { brand: Brand }) {
  const { brand } = props;
  return (
    <Link
      href={`/brands/${brand.handle}`}
      className="group flex flex-col items-center justify-center p-6 rounded-xl bg-surface-light dark:bg-surface-dark border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-md h-full min-h-[120px]"
    >
      <h3 className="text-lg font-semibold text-slate-900 dark:text-white group-hover:text-primary transition-colors text-center line-clamp-2">
        {brand.name}
      </h3>
    </Link>
  );
}
