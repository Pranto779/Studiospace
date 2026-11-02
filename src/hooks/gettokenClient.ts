import { authClient } from "@/app/lib/auth-client";

export const gettokenclient = async () => {
  const { data, error } = await authClient.token();

  if (error) return null;

  return data?.token || null;
};