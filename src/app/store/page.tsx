import Catalog from "@/components/catalog/catalog"
import FilterBar from "@/components/catalog/filterBar/filterBar"
import { Separator } from "@/components/ui/separator"
import getProducts from "@/lib/getProducts"
import React from "react"

const Store: React.FC = async () => {
  const products: APIv1.Product[] = await getProducts()

  return (
    <div className="flex h-[calc(100vh-60px)] p-4 gap-4">
      <div className="flex flex-1 flex-col p-4 bg-gray-500 bg-opacity-30 rounded-xl">
        <div className="text-3xl">
          CATALOG DRONES
          <p className="text-sm text-muted">
            Check out the latest drone collection
          </p>
        </div>

        <Separator className="my-8 mx-2" />

        <Catalog products={products} />
      </div>

      <FilterBar />
    </div>
  )
}

export default Store
