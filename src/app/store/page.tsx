import { Button } from "@/components/ui/button"
import getProducts from "@/lib/getProducts"
import { Heart, Star } from "lucide-react"
import Image from "next/image"
import React from "react"
import "./store.css"

const Store: React.FC = async () => {
  const products: APIv1.Product[] = await getProducts()

  return (
    <div className="flex h-[calc(100vh-60px)]">
      <div className="flex flex-1 flex-col">
        <div className="h-[100px] bg-red-500">top half</div>

        <div className="gallery">
          {products.map((product) => (
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

                <div className="text-2xl font-bold">
                  {`$${product.price}.00 SGD`}
                </div>

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
          ))}
        </div>

        <div className="h-[100px] bg-red-500">bottom half</div>
      </div>

      <div className="w-[400px] bg-blue-500">Filter bar</div>
    </div>
  )
}

export default Store
