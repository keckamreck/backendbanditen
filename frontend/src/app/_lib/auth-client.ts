import { createAuthClient } from "better-auth/react";
import { usernameClient } from "better-auth/client/plugins";

const defaultProductionAuthBaseUrl = "https://backend.biber.mom/auth";
const productionAuthBaseUrl = process.env.NEXT_PUBLIC_BETTER_AUTH_BASEURL_PROD;

const resolveProductionAuthBaseUrl = () => {
  if (!productionAuthBaseUrl) {
    return defaultProductionAuthBaseUrl;
  }

  const normalizedProductionAuthBaseUrl = productionAuthBaseUrl.startsWith("http")
    ? productionAuthBaseUrl
    : `https://${productionAuthBaseUrl}`;

  try {
    new URL(normalizedProductionAuthBaseUrl);
    return normalizedProductionAuthBaseUrl;
  } catch {
    return defaultProductionAuthBaseUrl;
  }
};

export const authClient = createAuthClient({
  baseURL:
    process.env.NODE_ENV === "production"
      ? resolveProductionAuthBaseUrl()
      : "http://localhost:8097/auth",
  plugins: [usernameClient()],
});
