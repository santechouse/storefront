import { HttpTypes } from "@medusajs/types";
import { sdk } from "../config";
import { getLocale } from "../util/get-locale";
import { getCacheOptions } from "./cookies";

export const listCategories = async (props: {
  query?: Record<string, any>;
  locale: string;
}): Promise<HttpTypes.StoreProductCategoryListResponse> => {
  const { locale, query } = props;
  const next = {
    ...(await getCacheOptions("categories")),
  };

  const headers = {
    "x-medusa-locale": getLocale(locale),
  };

  return sdk.client.fetch(`/store/product-categories`, {
    query: {
      ...query,
    },
    next,
    cache: "force-cache",
    headers,
  });
};
