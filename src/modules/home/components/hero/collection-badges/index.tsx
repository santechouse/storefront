import { Link } from "@/i18n/navigation";
import { HttpTypes } from "@medusajs/types";

type CollectionBadgesProps = {
  collections: HttpTypes.StoreCollection[];
};

export default function CollectionBadges({ collections }: CollectionBadgesProps) {
  return (
    <div className="w-full">
      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
        {collections.map((collection) => (
          <Link
            key={collection.id}
            href={`/collections/${collection.handle}`}
            className="flex-shrink-0 px-4 py-2 rounded-full border border-border bg-secondary text-foreground text-sm font-medium hover:bg-muted hover:border-border/80 active:bg-muted/60 transition-colors"
          >
            {collection.title}
          </Link>
        ))}
      </div>
    </div>
  );
}
