import Catalog from "@/components/catalog/catalog"
import { Separator } from "@/components/ui/separator"
import getProducts from "@/lib/getProducts"
import React from "react"

const Store: React.FC = async () => {
  const products: APIv1.Product[] = await getProducts()

  const displaySection = (sectionName: string) => {
    return (
      <div className="flex flex-1 bg-black rounded-xl bg-opacity-30 p-4">
        {sectionName}
      </div>
    )
  }

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

      <div className="w-[400px] flex flex-col bg-gray-500 rounded-xl bg-opacity-10 p-4 gap-2">
        <div className="text-xl">FILTER PRODUCTS</div>

        {["CATEGORY", "PRODUCT RATING COUNT", "PRICE", "LOCATION"].map(
          (sectionName) => displaySection(sectionName)
        )}
      </div>
    </div>
  )
}

export default Store
