import getProducts from "@/lib/getProducts"
import React from "react"

const Store: React.FC = async () => {
  const productsData = await getProducts()
  const products: APIv1.Product[] = productsData.data

  return (
    <div>
      {products.map((product) => (
        <div key={product.name}>
          <div>{product.name}</div>
          <div>{product.price}</div>
        </div>
      ))}
    </div>
  )
}

export default Store
