import Medusa from "@medusajs/js-sdk";
import { PayloadSDK } from "@payloadcms/sdk";

let MEDUSA_BACKEND_URL = "http://localhost:9000";

let PAYLOAD_URL = "http://localhost:8000";
const PAYLOAD_COLLECTION = process.env.NEXT_PUBLIC_PAYLOAD_COLLECTION;
const PAYLOAD_API_KEY = process.env.NEXT_PUBLIC_PAYLOAD_API_KEY;
const PAYLOAD_AUTH = `${PAYLOAD_COLLECTION || "users"} API-Key ${PAYLOAD_API_KEY}`;

if (process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL) {
  MEDUSA_BACKEND_URL = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL;
}

if (process.env.NEXT_PUBLIC_PAYLOAD_URL) {
  PAYLOAD_URL = process.env.NEXT_PUBLIC_PAYLOAD_URL;
}

export const sdk = new Medusa({
  baseUrl: MEDUSA_BACKEND_URL,
  debug: process.env.NODE_ENV === "development",
  publishableKey: process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY,
});

export const payload = new PayloadSDK({
  baseURL: PAYLOAD_URL,
  baseInit: {
    headers: {
      Authorization: PAYLOAD_AUTH,
    },
  },
});
