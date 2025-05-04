import { axiosPublic } from "@/api/api"
import { getAllProducts } from "@/api/products/productsAPI"

// TODO: add filters into parameters to filter for products
const getProducts = async () => {
  try {
    const res = await getAllProducts(axiosPublic)

    return res.data
  } catch (error) {
    throw new Error("Failed to fetch products")
  }
}

export default getProducts
