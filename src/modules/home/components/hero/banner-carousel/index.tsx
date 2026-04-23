"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Link } from "@/i18n/navigation";
import { Banner } from "@/types/payload";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { useRef } from "react";

export type BannerCarouselProps = {
  banners: Banner[];
};

export default function BannerCarousel({ banners }: BannerCarouselProps) {
  const plugin = useRef(Autoplay({ delay: 3500, stopOnInteraction: true }));

  return (
    <Carousel plugins={[plugin.current]} className="w-full">
      <CarouselContent>
        {banners.map((banner, index) => (
          <CarouselItem key={index}>
            <Link href={banner.link}>
              <div className="relative w-full h-52 md:h-80 rounded-2xl overflow-hidden border border-border/50">
                <Image
                  src={`${process.env.NEXT_PUBLIC_PAYLOAD_URL}${banner.image.url}`}
                  alt={banner.image.alt}
                  fill
                  className="object-cover"
                  priority={index === 0}
                />
              </div>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
