"use client"

import { axiosPublic } from "@/api/api"
import { refreshToken } from "@/api/auth/authAPI"
import { useSession } from "next-auth/react"

const useRefreshToken = () => {
  const { data: session, update } = useSession()

  return async () => {
    const res = await refreshToken(axiosPublic, { withCredentials: true })

    const newAccessToken = res.data.access_token

    if (session && res.status === 200) {
      // update the session with the new access token
      // see route.ts for the jwt callback with the "trigger" update
      session.user.access_token = newAccessToken
      await update(session)
    }

    return newAccessToken
  }
}

export default useRefreshToken
