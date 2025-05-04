"use client"

import { axiosPublic } from "@/api/api"
import axios from "axios"
import { Session } from "next-auth"
import { getSession } from "next-auth/react"

const getAxiosAuth = (session: Session) => {
  // Create a duplicate axios instance
  const axiosAuth = axios.create(axiosPublic.defaults)

  axiosAuth.interceptors.request.use((config) => {
    if (!config.headers["Authorization"] && session?.accessToken) {
      config.headers["Authorization"] = `Bearer ${session.accessToken}`
    }
    return config
  })

  axiosAuth.interceptors.response.use(
    (response) => response,
    async (error) => {
      const prevRequest = error.config

      if (error.response?.status === 401 && !prevRequest.sent) {
        prevRequest.sent = true
        const newSession = await getSession()

        if (!newSession?.accessToken) {
          return Promise.reject(error) // Reject if no new token is available
        }

        prevRequest.headers["Authorization"] =
          `Bearer ${newSession.accessToken}`
        return axiosAuth(prevRequest)
      }

      return Promise.reject(error)
    }
  )

  return axiosAuth
}

export default getAxiosAuth
