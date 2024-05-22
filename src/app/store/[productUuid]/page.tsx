import getProduct from "@/lib/getProduct"
import React from "react"

interface ProductPageProps {
  params: { productUuid: string }
}

export const generateMetadata = async (props: ProductPageProps) => {
  const { params } = props

  const product: APIv1.Product = await getProduct(params.productUuid)

  return {
    title: product.name,
    description: product.description,
  }
}

const ProductPage: React.FC<ProductPageProps> = async (props) => {
  const { params } = props

  const product: APIv1.Product = await getProduct(params.productUuid)

  return <div>{JSON.stringify(product)}</div>
}

export default ProductPage
