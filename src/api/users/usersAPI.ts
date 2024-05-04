import { USER_API_ROUTES } from "@/api/users/routes"
import { AxiosInstance } from "axios"

export async function getUser(
  axios: AxiosInstance,
  username: string,
  options?: Record<string, any>
): Promise<APIv1.Response<APIv1.User>> {
  return axios.request({
    url: USER_API_ROUTES.GET_USER(username),
    method: "GET",
    headers: { "Content-Type": "application/json" },
    ...(options || {}),
  })
}
