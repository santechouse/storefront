"use client";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Link } from "@/i18n/navigation";
import { Banner } from "@/types/payload";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import React from "react";

export type BannerCarouselProps = {
  banners: Banner[];
};

export default function BannerCarousel({ banners }: BannerCarouselProps) {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true }),
  );
  return (
    <Carousel plugins={[plugin.current]} className="w-full ">
      <CarouselContent>
        {banners.map((banner, index) => (
          <CarouselItem key={index}>
            <div className="p-1 ">
              <Link href={banner.link}>
                <Card className="p-0 overflow-hidden">
                  <CardContent className="relative p-0 h-62.5 md:h-87.5">
                    <Image
                      src={`${banner.image.url}`}
                      alt={banner.image.alt}
                      fill
                      className="object-cover"
                    />
                  </CardContent>
                </Card>
              </Link>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
