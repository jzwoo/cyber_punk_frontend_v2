import Catalog from "@/components/catalog/catalog"
import getProducts from "@/lib/getProducts"
import React from "react"

const Store: React.FC = async () => {
  const products: APIv1.Product[] = await getProducts()

  return (
    <div className="flex h-[calc(100vh-60px)]">
      <div className="flex flex-1 flex-col">
        <div className="h-[100px] bg-red-500">top half</div>

        <Catalog products={products} />

        <div className="h-[100px] bg-red-500">bottom half</div>
      </div>

      <div className="w-[400px] bg-blue-500">Filter bar</div>
    </div>
  )
}

export default Store
