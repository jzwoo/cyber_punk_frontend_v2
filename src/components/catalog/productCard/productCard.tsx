"use client"

import { Button } from "@/components/ui/button"
import { Heart, Star } from "lucide-react"
import Image from "next/image"
import React from "react"

interface ProductCardProps {
  // product is passed down as a string because to pass down props from server to client component, we need the props to be serializable
  // reference: https://nextjs.org/docs/app/building-your-application/rendering/composition-patterns#passing-props-from-server-to-client-components-serialization
  productString: string
}

const ProductCard: React.FC<ProductCardProps> = (props) => {
  const { productString } = props
  const product = JSON.parse(productString) as APIv1.Product

  return (
    <div className="flex flex-col items-center bg-gray-200 rounded-3xl p-2">
      <div className="relative w-full h-[180px]">
        <Image
          className="object-cover"
          src={product.image.url}
          alt="Drone 1"
          fill={true}
          quality={100}
        />
      </div>

      <div className="p-4 text-black flex flex-col gap-2 w-full rounded-3xl bg-white">
        <div className="h-[30px]">{product.name}</div>

        <div className="text-2xl font-bold">{`$${product.price}.00 SGD`}</div>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Star size={16} />
            0.0 (0 Reviews)
          </div>

          <div>
            <Button
              variant="secondary"
              className="h-[40px] w-[40px] p-1 rounded-full text-red-500"
            >
              <Heart />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
