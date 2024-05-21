"use client"

import Catalog from "@/components/store/catalog/catalog"
import FilterBar from "@/components/store/catalog/filterBar/filterBar"
import { Separator } from "@/components/ui/separator"
import { SessionProvider } from "next-auth/react"
import React from "react"

interface StoreProps {
  // products are passed down as a string because to pass down props from server to client component, we need the props to be serializable
  // reference: https://nextjs.org/docs/app/building-your-application/rendering/composition-patterns#passing-props-from-server-to-client-components-serialization
  productsString: string
}

const Store: React.FC<StoreProps> = (props) => {
  const { productsString } = props

  const [products, setProducts] = React.useState<APIv1.Product[]>(
    JSON.parse(productsString) as APIv1.Product[]
  )
  const [filteredProducts, setFilteredProducts] = React.useState<
    APIv1.Product[]
  >(JSON.parse(productsString) as APIv1.Product[])

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

        <SessionProvider>
          <Catalog products={filteredProducts} />
        </SessionProvider>
      </div>

      <FilterBar />
    </div>
  )
}

export default Store
