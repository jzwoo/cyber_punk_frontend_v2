import { BASE_URL } from "@/api/api"
import { PRODUCT_API_ROUTES } from "@/api/products/routes"

const getProducts = async () => {
  const res = await fetch(`${BASE_URL}${PRODUCT_API_ROUTES.GET_PRODUCTS()}`, {
    cache: "no-store",
  })

  if (!res.ok) {
    throw new Error("Failed to fetch products")
  }

  return res.json()
}

export default getProducts
