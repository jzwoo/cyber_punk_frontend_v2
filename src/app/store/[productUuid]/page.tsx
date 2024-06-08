import authOptions from "@/lib/auth/authOptions"
import getProduct from "@/lib/getProduct"
import { getServerSession } from "next-auth"
import Image from "next/image"
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

  const session = await getServerSession(authOptions)
  const product: APIv1.Product = await getProduct(params.productUuid)

  return (
    <div className="flex h-[calc(100vh-60px)]">
      <div className="flex flex-1 bg-gray-200 justify-center items-center">
        <Image
          className="object-cover"
          src={product.image.url}
          alt="Image1"
          width={500}
          height={200}
          quality={100}
        />
      </div>

      <div className="flex flex-col flex-1">
        <div className="w-[500px]">
          {JSON.stringify(product)}
          {JSON.stringify(session)}
        </div>
      </div>
    </div>
  )
}

export default ProductPage
