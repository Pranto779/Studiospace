import { auth } from "@/app/lib/auth"
import { headers } from "next/headers"

export const getTokenserver=async()=>{
     const jwtToken=await auth.api.getToken({
  headers:await headers()

})

  const token=jwtToken?.token
  return token
}