"use client";

import { authClient } from "../_lib/auth-client";

export async function getUserId() {
  const { data: session } = await authClient.getSession();
  return session?.user.id;
}