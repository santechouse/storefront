"use server";

import { sdk } from "@lib/config";
import medusaError from "@lib/util/medusa-error";
import { HttpTypes } from "@medusajs/types";
import { revalidateTag } from "next/cache";
import {
  getAuthHeaders,
  getCacheOptions,
  getCacheTag,
  getCartId,
  removeAuthToken,
  removeCartId,
  setAuthToken,
  setCacheId,
  removeCacheId,
} from "./cookies";
import { redirect } from "next/navigation";

export interface StoreCashbackAccount {
  id: string;
  balance: number;
  currency_code: string;
}

export type ExtendedStoreCustomer = HttpTypes.StoreCustomer & {
  cashback_accounts?: StoreCashbackAccount[];
};

export const retrieveCustomer =
  async (): Promise<ExtendedStoreCustomer | null> => {
    const authHeaders = await getAuthHeaders();

    if (!authHeaders) return null;

    const headers = {
      ...authHeaders,
    };

    const next = {
      ...(await getCacheOptions("customers")),
    };

    return await sdk.client
      .fetch<{ customer: ExtendedStoreCustomer }>(`/store/customers/me`, {
        method: "GET",
        query: {
          fields: "*orders,*addresses,cashback_accounts.*",
        },
        headers,
        next,
        cache: "force-cache",
      })
      .then(({ customer }) => customer)
      .catch(() => null);
  };

export const updateCustomer = async (body: HttpTypes.StoreUpdateCustomer) => {
  const headers = {
    ...(await getAuthHeaders()),
  };

  const updateRes = await sdk.store.customer
    .update(body, {}, headers)
    .then(({ customer }) => customer)
    .catch(medusaError);

  const cacheTag = await getCacheTag("customers");
  // @ts-ignore
  revalidateTag(cacheTag);

  return updateRes;
};

export async function signup(_currentState: unknown, formData: FormData) {
  const password = formData.get("password") as string;
  const customerForm = {
    first_name: formData.get("first_name") as string,
    last_name: formData.get("last_name") as string,
    phone: formData.get("phone") as string,
  };

  try {
    const token = await sdk.auth.register("customer", "phonepass", {
      phone: customerForm.phone,
      password: password,
    });

    await setAuthToken(token as string);

    const headers = {
      ...(await getAuthHeaders()),
    };

    await sdk.store.customer.create(
      { ...customerForm, email: `+${customerForm.phone}@gmail.com` },
      {},
      headers,
    );

    const loginToken = await sdk.auth.login("customer", "phonepass", {
      phone: customerForm.phone,
      password,
    });

    await setAuthToken(loginToken as string);
    await setCacheId(crypto.randomUUID());

    const customerCacheTag = await getCacheTag("customers");
    // @ts-ignore
    revalidateTag(customerCacheTag);

    await transferCart();
  } catch (error: any) {
    return error.toString();
  }

  redirect("/account");
}

export async function login(_currentState: unknown, formData: FormData) {
  const phone = formData.get("phone") as string;
  const password = formData.get("password") as string;

  try {
    await sdk.auth
      .login("customer", "phonepass", { phone, password })
      .then(async (token) => {
        await setAuthToken(token as string);
        await setCacheId(crypto.randomUUID());
        const customerCacheTag = await getCacheTag("customers");
        // @ts-ignore
        revalidateTag(customerCacheTag);
      });
  } catch (error: any) {
    console.log(error);
    return error.toString();
  }

  try {
    await transferCart();
  } catch (error: any) {
    return error.toString();
  }

  redirect("/account");
}

export async function signout() {
  await sdk.auth.logout();

  await removeAuthToken();
  await removeCacheId();

  const customerCacheTag = await getCacheTag("customers");
  // @ts-ignore
  revalidateTag(customerCacheTag);

  await removeCartId();

  const cartCacheTag = await getCacheTag("carts");
  // @ts-ignore
  revalidateTag(cartCacheTag);

  redirect(`/account`);
}

export async function transferCart() {
  const cartId = await getCartId();

  if (!cartId) {
    return;
  }

  const headers = await getAuthHeaders();
  await sdk.store.cart.transferCart(cartId, {}, headers);

  const cartCacheTag = await getCacheTag("carts");
  // @ts-ignore
  revalidateTag(cartCacheTag);
}

export const addCustomerAddress = async (
  currentState: Record<string, unknown>,
  formData: FormData,
): Promise<any> => {
  const isDefaultBilling = (currentState.isDefaultBilling as boolean) || false;
  const isDefaultShipping =
    (currentState.isDefaultShipping as boolean) || false;

  const address = {
    first_name: formData.get("first_name") as string,
    last_name: formData.get("last_name") as string,
    company: formData.get("company") as string,
    address_1: formData.get("address_1") as string,
    address_2: formData.get("address_2") as string,
    city: formData.get("city") as string,
    postal_code: formData.get("postal_code") as string,
    province: formData.get("province") as string,
    country_code: formData.get("country_code") as string,
    phone: formData.get("phone") as string,
    is_default_billing: isDefaultBilling,
    is_default_shipping: isDefaultShipping,
  };

  const headers = {
    ...(await getAuthHeaders()),
  };

  return sdk.store.customer
    .createAddress(address, {}, headers)
    .then(async () => {
      const customerCacheTag = await getCacheTag("customers");
      // @ts-ignore
      revalidateTag(customerCacheTag);
      return { success: true, error: null };
    })
    .catch((err) => {
      return { success: false, error: err.toString() };
    });
};

export const deleteCustomerAddress = async (
  addressId: string,
): Promise<void> => {
  const headers = {
    ...(await getAuthHeaders()),
  };

  await sdk.store.customer
    .deleteAddress(addressId, headers)
    .then(async () => {
      const customerCacheTag = await getCacheTag("customers");
      // @ts-ignore
      revalidateTag(customerCacheTag);
      return { success: true, error: null };
    })
    .catch((err) => {
      return { success: false, error: err.toString() };
    });
};

export const updateCustomerAddress = async (
  currentState: Record<string, unknown>,
  formData: FormData,
): Promise<any> => {
  const addressId =
    (currentState.addressId as string) || (formData.get("addressId") as string);

  if (!addressId) {
    return { success: false, error: "Address ID is required" };
  }

  const address = {
    first_name: formData.get("first_name") as string,
    last_name: formData.get("last_name") as string,
    company: formData.get("company") as string,
    address_1: formData.get("address_1") as string,
    address_2: formData.get("address_2") as string,
    city: formData.get("city") as string,
    postal_code: formData.get("postal_code") as string,
    province: formData.get("province") as string,
    country_code: formData.get("country_code") as string,
  } as HttpTypes.StoreUpdateCustomerAddress;

  const phone = formData.get("phone") as string;

  if (phone) {
    address.phone = phone;
  }

  const headers = {
    ...(await getAuthHeaders()),
  };

  return sdk.store.customer
    .updateAddress(addressId, address, {}, headers)
    .then(async () => {
      const customerCacheTag = await getCacheTag("customers");
      // @ts-ignore
      revalidateTag(customerCacheTag);
      return { success: true, error: null };
    })
    .catch((err) => {
      return { success: false, error: err.toString() };
    });
};
