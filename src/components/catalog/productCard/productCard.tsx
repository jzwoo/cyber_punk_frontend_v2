import { Button } from "@/components/ui/button"
import { Heart, Star } from "lucide-react"
import Image from "next/image"
import React from "react"

interface ProductCardProps {
  product: APIv1.Product
}

const ProductCard: React.FC<ProductCardProps> = (props) => {
  const { product } = props

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
              className="h-[40px] w-[40px] p-1 rounded-full"
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
