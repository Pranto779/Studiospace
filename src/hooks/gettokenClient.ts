import { authClient } from "@/app/lib/auth-client";

export async function gettokenclient() {
  const { data, error } = await authClient.token();

  if (error) return null;

  return data?.token || null;
}