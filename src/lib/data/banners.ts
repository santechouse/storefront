import { Banner } from "@/types/payload";
import { payload } from "../config";

export const getBanners = async (props: {
  locale: string;
}): Promise<Banner[]> => {
  const { locale } = props;
  const now = new Date().toISOString();
  const { docs: banners } = await payload.find({
    locale,
    collection: "banners",
    where: {
      startDate: {
        less_than_equal: now,
      },
      endDate: {
        greater_than_equal: now,
      },
    },
  });
  console.log(banners);
  return banners as Banner[];
};
