export function isJwtExpired(token: string): boolean {
  const parts = token.split(".");
  if (parts.length !== 3) {
    return true;
  }

  try {
    const payloadJson = Buffer.from(parts[1], "base64url").toString("utf-8");
    const payload = JSON.parse(payloadJson) as { exp?: number };

    if (typeof payload.exp !== "number") {
      return true;
    }

    return payload.exp * 1000 <= Date.now();
  } catch {
    return true;
  }
}

export function isJwtExpiringSoon(
  token: string,
  thresholdSeconds: number,
): boolean {
  const parts = token.split(".");
  if (parts.length !== 3) {
    return false;
  }

  try {
    const payloadJson = Buffer.from(parts[1], "base64url").toString("utf-8");
    const payload = JSON.parse(payloadJson) as { exp?: number };

    if (typeof payload.exp !== "number") {
      return false;
    }

    const msRemaining = payload.exp * 1000 - Date.now();
    return msRemaining > 0 && msRemaining <= thresholdSeconds * 1000;
  } catch {
    return false;
  }
}
