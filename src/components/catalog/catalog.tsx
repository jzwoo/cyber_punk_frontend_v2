import ProductCard from "@/components/catalog/productCard/productCard"
import React from "react"
import "./catalog.css"

interface CatalogProps {
  products: APIv1.Product[]
}

const Catalog: React.FC<CatalogProps> = (props) => {
  const { products } = props

  return (
    <div className="gallery">
      {products.map((product) => (
        <ProductCard product={product} />
      ))}
    </div>
  )
}

export default Catalog
