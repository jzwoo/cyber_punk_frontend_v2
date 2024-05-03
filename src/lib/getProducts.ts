import { axiosPublic } from "@/api/api"
import { getAllProducts } from "@/api/products/productsAPI"

const getProducts = async () => {
  try {
    return getAllProducts(axiosPublic)
  } catch (error) {
    throw new Error("Failed to fetch products")
  }
}

export default getProducts
