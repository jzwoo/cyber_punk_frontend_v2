import { AUTH_API_ROUTES } from "@/api/auth/routes"
import { AxiosInstance } from "axios"

export async function register(
  axios: AxiosInstance,
  data: {
    name: string
    username: string
    password: string
  },
  options?: Record<string, any>
): Promise<APIv1.Response<any>> {
  return axios.request({
    url: AUTH_API_ROUTES.REGISTER(),
    method: "POST",
    headers: { "Content-Type": "application/json" },
    ...(options || {}),
    data,
  })
}

export async function login(
  axios: AxiosInstance,
  data: {
    username: string
    password: string
  },
  options?: Record<string, any>
): Promise<
  APIv1.Response<{
    user: APIv1.User
    access_token: string
  }>
> {
  return axios.request({
    url: AUTH_API_ROUTES.LOGIN(),
    method: "POST",
    headers: { "Content-Type": "application/json" },
    ...(options || {}),
    data,
  })
}

export async function logout(
  axios: AxiosInstance,
  options?: Record<string, any>
): Promise<APIv1.Response<any>> {
  return axios.request({
    url: AUTH_API_ROUTES.LOGOUT(),
    method: "POST",
    headers: { "Content-Type": "application/json" },
    ...(options || {}),
  })
}

export async function refreshToken(
  axios: AxiosInstance,
  options?: Record<string, any>
): Promise<
  APIv1.Response<{
    user: APIv1.User
    access_token: string
  }>
> {
  return axios.request({
    url: AUTH_API_ROUTES.REFRESH(),
    method: "GET",
    headers: { "Content-Type": "application/json" },
    ...(options || {}),
  })
}
