import { Link } from "@/i18n/navigation";
import { HttpTypes } from "@medusajs/types";

type CollectionBadgesProps = {
  collections: HttpTypes.StoreCollection[];
};

export default function CollectionBadges({ collections }: CollectionBadgesProps) {
  return (
    <div className="w-full">
      <div className="flex gap-4 overflow-x-auto no-scrollbar pb-1 px-1">
        {collections.map((collection) => (
          <Link
            key={collection.id}
            href={`/collections/${collection.handle}`}
            className="flex-shrink-0 shrint-0 px-5 py-2.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm font-semibold hover:bg-slate-200 dark:hover:bg-slate-700 transition-all duration-200"
          >
            {collection.title}
          </Link>
        ))}
      </div>
    </div>
  );
}
