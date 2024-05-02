import React from "react"

const getProducts = async () => {
  // no cache for get products
  const res = await fetch("http://localhost:8000/api/v1/products", {
    cache: "no-store",
  })

  if (!res.ok) {
    throw new Error("Failed to fetch data")
  }

  return res.json()
}

const Store: React.FC = async () => {
  const productsData = getProducts()
  const products: APIv1.Product[] = await productsData

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
