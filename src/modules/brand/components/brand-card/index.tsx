import { Link } from "@/i18n/navigation";
import { Brand } from "@/types/brand";
import Image from "next/image";

export function BrandCard(props: { brand: Brand }) {
  const { brand } = props;
  const image = brand.images?.[0];

  return (
    <Link
      href={`/brands/${brand.handle}`}
      className="group relative flex aspect-square overflow-hidden rounded-xl border border-border/50 hover:border-primary/50 transition-colors duration-300"
    >
      {image ? (
        <Image
          src={image.url}
          alt={brand.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-primary/5">
          <span className="text-3xl font-bold text-primary">
            {brand.name.charAt(0).toUpperCase()}
          </span>
        </div>
      )}

      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent px-3 py-2.5">
        <p className="text-sm font-semibold text-white line-clamp-1 drop-shadow-sm">
          {brand.name}
        </p>
      </div>
    </Link>
  );
}
