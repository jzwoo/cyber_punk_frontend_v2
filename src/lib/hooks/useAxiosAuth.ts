"use client"

import { axiosPublic } from "@/api/api"
import useRefreshToken from "@/lib/hooks/useRefreshToken"
import axios from "axios"
import { useSession } from "next-auth/react"
import { useEffect } from "react"

const useAxiosAuth = () => {
  const { data: session } = useSession()
  const refreshToken = useRefreshToken()
  // create a duplicate axios instance
  // this is done because in the refresh function, axiosPublic is also used, can cause a recursion
  const axiosAuth = axios.create(axiosPublic.defaults)

  useEffect(() => {
    const requestIntercept = axiosAuth.interceptors.request.use((config) => {
      if (!config.headers["Authorization"]) {
        config.headers["Authorization"] = `Bearer ${session?.user.access_token}`
      }

      return config
    })

    const responseIntercept = axiosAuth.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error.config

        if (error.response.status === 401 && !prevRequest?.sent) {
          prevRequest.sent = true
          const newAccessToken = await refreshToken()
          prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`
          return axiosAuth(prevRequest)
        }

        return Promise.reject(error)
      }
    )

    return () => {
      axiosAuth.interceptors.request.eject(requestIntercept)
      axiosAuth.interceptors.response.eject(responseIntercept)
    }
  }, [session, refreshToken, axiosAuth])

  return axiosAuth
}

export default useAxiosAuth
