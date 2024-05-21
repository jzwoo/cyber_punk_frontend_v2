import { CART_API_ROUTES } from "@/api/carts/routes"
import { AxiosInstance } from "axios"

export async function getUserCart(
  axios: AxiosInstance,
  username: string,
  options?: Record<string, any>
): Promise<APIv1.Response<APIv1.Cart>> {
  return axios.request({
    url: CART_API_ROUTES.GET_CART(username),
    method: "GET",
    headers: { "Content-Type": "application/json" },
    ...(options || {}),
  })
}

export async function updateUserCart(
  axios: AxiosInstance,
  username: string,
  data: APIv1.Cart,
  options?: Record<string, any>
): Promise<APIv1.Response<APIv1.Cart>> {
  return axios.request({
    url: CART_API_ROUTES.UPDATE_CART(username),
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    ...(options || {}),
    data,
  })
}
