"use server";
import { sdk } from "@lib/config";
import { sortProducts } from "@lib/util/sort-products";
import { HttpTypes } from "@medusajs/types";
import { getAuthHeaders, getCacheOptions } from "./cookies";
import { getRegion, retrieveRegion } from "./regions";
import { SortOptions } from "@/types/globals";
import { getLocale } from "../util/get-locale";

export const listProductTags = async ({
  value,
}: {
  value: string;
}): Promise<HttpTypes.StoreProductTag[]> => {
  const { product_tags } =
    await sdk.client.fetch<HttpTypes.StoreProductTagListResponse>(
      "/store/product-tags",
      {
        query: { value },
      },
    );
  return product_tags;
};

export const listProducts = async ({
  locale,
  pageParam = 1,
  queryParams,
  countryCode,
  regionId,
}: {
  locale: string;
  pageParam?: number;
  queryParams?: HttpTypes.FindParams &
    HttpTypes.StoreProductListParams & { brand_id?: string };
  countryCode?: string;
  regionId?: string;
}): Promise<{
  response: { products: HttpTypes.StoreProduct[]; count: number };
  nextPage: number | null;
  queryParams?: HttpTypes.FindParams & HttpTypes.StoreProductListParams;
}> => {
  if (!countryCode && !regionId) {
    throw new Error("Country code or region ID is required");
  }

  const limit = queryParams?.limit || 12;
  const _pageParam = Math.max(pageParam, 1);
  const offset = _pageParam === 1 ? 0 : (_pageParam - 1) * limit;

  let region: HttpTypes.StoreRegion | undefined | null;

  if (countryCode) {
    region = await getRegion(countryCode);
  } else {
    region = await retrieveRegion(regionId!);
  }

  if (!region) {
    return {
      response: { products: [], count: 0 },
      nextPage: null,
    };
  }

  const authHeaders = await getAuthHeaders();
  const isAuthenticated = "authorization" in authHeaders;

  const headers = {
    ...authHeaders,
    "x-medusa-locale": getLocale(locale),
  };

  const next = isAuthenticated
    ? {}
    : { ...(await getCacheOptions("products")) };

  return sdk.client
    .fetch<{ products: HttpTypes.StoreProduct[]; count: number }>(
      "/store/products",
      {
        method: "GET",
        query: {
          limit,
          offset,
          region_id: region?.id,
          fields:
            "*variants.calculated_price,+variants.inventory_quantity,*variants.images,+metadata,+tags",
          ...queryParams,
          brand_id: undefined,
        },
        headers,
        next,
        cache: isAuthenticated ? "no-store" : "force-cache",
      },
    )
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

/**
 * This will fetch 100 products to the Next.js cache and sort them based on the sortBy parameter.
 * It will then return the paginated products based on the page and limit parameters.
 */
const SORT_FETCH_LIMIT = 100;
const SORT_PAGE_LIMIT = 12;

export const listProductsWithSort = async ({
  locale,
  page = 1,
  queryParams,
  sortBy = "created_at",
}: {
  locale: string;
  page?: number;
  queryParams?: HttpTypes.FindParams & HttpTypes.StoreProductListParams;
  sortBy?: SortOptions;
}): Promise<{
  response: { products: HttpTypes.StoreProduct[]; count: number };
  nextPage: number | null;
  queryParams?: HttpTypes.FindParams &
    HttpTypes.StoreProductParams & { brand_id?: string };
}> => {
  const displayLimit = SORT_PAGE_LIMIT;
  const region = await getRegion();

  const {
    response: { products, count },
  } = await listProducts({
    locale,
    regionId: region?.id,
    pageParam: 1,
    queryParams: {
      ...queryParams,
      limit: SORT_FETCH_LIMIT,
    },
  });

  const sortedProducts = sortProducts(products, sortBy);

  const currentPage = Math.max(page, 1);
  const offset = (currentPage - 1) * displayLimit;

  const nextPage = count > offset + displayLimit ? currentPage + 1 : null;

  const paginatedProducts = sortedProducts.slice(offset, offset + displayLimit);

  return {
    response: {
      products: paginatedProducts,
      count,
    },
    nextPage,
    queryParams,
  };
};
