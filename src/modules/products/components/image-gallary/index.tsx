"use client";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { HttpTypes } from "@medusajs/types";
import Image from "next/image";

export type ImageGallaryProps = {
  images: HttpTypes.StoreProductImage[];
};

export default function ImageGallary({ images }: ImageGallaryProps) {
  return (
    <Carousel>
      <CarouselContent>
        {images.map((image, i) => {
          return (
            <CarouselItem key={image.id}>
              <div className="p-1">
                <Card className="p-0 overflow-hidden">
                  <CardContent className="relative p-0 aspect-4/3">
                    <Image
                      src={image.url}
                      alt={image.id}
                      fill
                      priority={i === 0}
                      className="object-cover"
                    />
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          );
        })}
      </CarouselContent>
    </Carousel>
  );
}
