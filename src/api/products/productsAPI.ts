import { PRODUCT_API_ROUTES } from "@/api/products/routes"
import { AxiosInstance } from "axios"

export async function getAllProducts(
  axios: AxiosInstance,
  options?: Record<string, any>
): Promise<APIv1.Response<APIv1.Product[]>> {
  return axios.request({
    url: PRODUCT_API_ROUTES.GET_PRODUCTS(),
    method: "GET",
    headers: { "Content-Type": "application/json" },
    ...(options || {}),
  })
}
