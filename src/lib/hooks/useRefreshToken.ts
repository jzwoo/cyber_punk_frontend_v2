"use client"

import { axiosPublic } from "@/api/api"
import { refreshToken } from "@/api/auth/authAPI"
import { useSession } from "next-auth/react"

const useRefreshToken = () => {
  const { data: session } = useSession()

  return async () => {
    const res = await refreshToken(axiosPublic, { withCredentials: true })

    const newAccessToken = res.data.access_token

    if (session && res.status === 200) {
      session.user.access_token = newAccessToken
    }

    return newAccessToken
  }
}

export default useRefreshToken
