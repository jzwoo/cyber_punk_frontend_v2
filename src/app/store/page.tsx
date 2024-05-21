import Store from "@/components/store/store"
import getProducts from "@/lib/getProducts"
import React from "react"

const StorePage: React.FC = async () => {
  const products: APIv1.Product[] = await getProducts()

  return <Store productsString={JSON.stringify(products)} />
}

export default StorePage
