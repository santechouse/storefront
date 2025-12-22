import { FeaturedBrands } from "@/types/payload";
import { payload } from "../config";

export const getFeaturedBrands = async (props: { locale: string }) => {
  const { locale } = props;
  const {
    docs: [featuredBrands],
  } = await payload.find({
    locale,
    collection: "featured-brands",
  });

  return featuredBrands as FeaturedBrands;
};
