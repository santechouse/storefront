import Image from "next/image";
import { ImageIcon } from "lucide-react";

export type ThumbnailProps = {
  thumbnail: string | null | undefined;
};

export default function Thumbnail({ thumbnail }: ThumbnailProps) {
  return (
    <div className="relative w-full h-full overflow-hidden rounded-xl bg-muted/30">
      {thumbnail ? (
        <Image
          src={thumbnail}
          alt=""
          fill
          className="object-contain transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          <ImageIcon className="size-8 text-muted-foreground/40" />
        </div>
      )}
    </div>
  );
}
