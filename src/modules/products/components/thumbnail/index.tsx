import { ImageIcon } from "lucide-react";

export type ThumbnailProps = {
  thumbnail: string | null;
};

export default function Thumbnail({ thumbnail }: ThumbnailProps) {
  return (
    <div className="relative aspect-3/4 w-full overflow-hidden rounded-2xl">
      {thumbnail ? (
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
          data-alt="Green high-top sneakers on dark background"
          style={{
            backgroundImage: `url("${thumbnail}")`,
          }}
        ></div>
      ) : (
        <ImageIcon />
      )}
    </div>
  );
}
