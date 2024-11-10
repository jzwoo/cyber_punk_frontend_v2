import { AUTH_API_ROUTES } from "@/api/auth/routes"
import { AxiosInstance } from "axios"

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
    refresh_token: string
  }>
> {
  return axios.request({
    url: AUTH_API_ROUTES.REFRESH(),
    method: "POST",
    headers: { "Content-Type": "application/json" },
    ...(options || {}),
  })
}
