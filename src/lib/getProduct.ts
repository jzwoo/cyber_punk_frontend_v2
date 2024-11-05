import { BASE_URL } from "@/api/api"
import { PRODUCT_API_ROUTES } from "@/api/products/routes"

const getProduct = async (productId: string) => {
  const res = await fetch(
    `${BASE_URL}${PRODUCT_API_ROUTES.GET_PRODUCT(productId)}`,
    {
      cache: "no-store",
    }
  )

  if (!res.ok) {
    throw new Error("Failed to fetch product")
  }

  return res.json()
}

export default getProduct
