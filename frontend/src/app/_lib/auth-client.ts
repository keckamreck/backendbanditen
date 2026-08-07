import { createAuthClient } from "better-auth/react";
import { usernameClient } from "better-auth/client/plugins";

const defaultProductionAuthBaseUrl = "https://backend.biber.mom/auth";
const productionAuthBaseUrl = process.env.NEXT_PUBLIC_BETTER_AUTH_BASEURL_PROD;
const normalizedProductionAuthBaseUrl = productionAuthBaseUrl?.startsWith("http")
  ? productionAuthBaseUrl
  : productionAuthBaseUrl
    ? `https://${productionAuthBaseUrl}`
    : defaultProductionAuthBaseUrl;

export const authClient = createAuthClient({
  baseURL:
    process.env.NODE_ENV === "production"
      ? normalizedProductionAuthBaseUrl
      : "http://localhost:8097/auth",
  plugins: [usernameClient()],
});
