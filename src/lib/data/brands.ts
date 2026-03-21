import { HttpTypes } from "@medusajs/types";
import { sdk } from "../config";
import { Brand } from "@/types/brand";
import { getCacheOptions } from "./cookies";
import { getLocale } from "../util/get-locale";

export const retrieveBrand = (id: string) => {
  return sdk.client.fetch<{ brand: Brand }>(`/store/brands/${id}`);
};

export const listBrandProducts = async (
  id: string,
  locale: string,
  pageParam: number,
  queryParams?: Record<string, any>,
) => {
  const next = {
    ...(await getCacheOptions("brand_products")),
  };

  const headers = {
    "x-medusa-locale": getLocale(locale),
  };

  const limit = queryParams?.limit || 12;
  const _pageParam = Math.max(pageParam, 1);
  const offset = _pageParam === 1 ? 0 : (_pageParam - 1) * limit;

  return sdk.client
    .fetch<HttpTypes.StoreProductListResponse>(`/store/brands/${id}/products`, {
      query: {
        limit,
        offset,
        ...queryParams,
      },
      next,
      headers,
      cache: "force-cache",
    })
    .then(({ products, count }) => {
      const nextPage = count > offset + limit ? pageParam + 1 : null;

      return {
        response: {
          products,
          count,
        },
        nextPage: nextPage,
        queryParams,
      };
    });
};

export const listBrands = async () => {
  const next = {
    ...(await getCacheOptions("brands")),
  };

  return sdk.client.fetch<{ brands: Brand[] }>(`/store/brands`, {
    query: {
      offset: 0,
      limit: 1000
    },
    next
  }).then(({ brands }) => {
    return brands;
  });
}