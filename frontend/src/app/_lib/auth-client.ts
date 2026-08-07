import { createAuthClient } from "better-auth/react";
import { usernameClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  baseURL:
    process.env.NODE_ENV === "production"
      ? process.env.NEXT_PUBLIC_BETTER_AUTH_BASEURL_PROD
      : "http://localhost:8097/auth",
  plugins: [usernameClient()],
});
