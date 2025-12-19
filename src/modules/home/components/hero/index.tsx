"use client";

import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent } from "@/components/ui/card";
import { Banner } from "@/types/payload";
import { Link } from "@/i18n/navigation";

type Props = {
  banners: Banner[];
};

const Hero = ({ banners }: Props) => {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true }),
  );
  return (
    <section className="@container">
      <div className="flex flex-col-reverse lg:flex-row gap-8 lg:gap-16 items-center">
        <Carousel plugins={[plugin.current]} className="w-full ">
          <CarouselContent>
            {banners.map((banner, index) => (
              <CarouselItem key={index}>
                <div className="p-1 ">
                  <Link href={banner.link}>
                    <Card className="p-0 overflow-hidden">
                      <CardContent className="flex items-center justify-center p-0 ">
                        <img
                          src={`http://localhost:3000${banner.image.url!}`}
                          className="object-cover w-full h-[250px] md:h-[350px]"
                        />
                      </CardContent>
                    </Card>
                  </Link>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
};

export default Hero;
