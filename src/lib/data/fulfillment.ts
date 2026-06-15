"use server";

import { sdk } from "@lib/config";
import { HttpTypes } from "@medusajs/types";
import { getAuthHeaders, getCacheOptions } from "./cookies";
import { getLocale } from "../util/get-locale";

export const listCartShippingMethods = async (
  cartId: string,
  locale: string,
) => {
  const headers = {
    ...(await getAuthHeaders()),
    "x-medusa-locale": getLocale(locale),
  };

  const next = {
    ...(await getCacheOptions("fulfillment")),
  };

  return sdk.client
    .fetch<HttpTypes.StoreShippingOptionListResponse>(
      `/store/shipping-options?locale=${locale}`,
      {
        method: "GET",
        query: {
          cart_id: cartId,
        },
        headers,

        cache: "no-cache",
      },
    )
    .then(({ shipping_options }) => shipping_options)
    .catch(() => {
      return null;
    });
};

export const calculatePriceForShippingOption = async (
  optionId: string,
  cartId: string,
  data?: Record<string, unknown>,
) => {
  const headers = {
    ...(await getAuthHeaders()),
  };

  const next = {
    ...(await getCacheOptions("fulfillment")),
  };

  const body = { cart_id: cartId, data };

  if (data) {
    body.data = data;
  }

  return sdk.client
    .fetch<{ shipping_option: HttpTypes.StoreCartShippingOption }>(
      `/store/shipping-options/${optionId}/calculate`,
      {
        method: "POST",
        body,
        headers,
        next,
      },
    )
    .then(({ shipping_option }) => shipping_option)
    .catch((e) => {
      return null;
    });
};
