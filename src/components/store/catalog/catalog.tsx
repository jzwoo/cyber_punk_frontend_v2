import ProductCard from "@/components/store/catalog/productCard/productCard"
import updateUserCart from "@/lib/updateUserCart"
import { redirect } from "next/navigation"
import React from "react"
import "./catalog.css"

interface CatalogProps {
  products: APIv1.Product[]
  userCart: APIv1.Cart | null
}

const Catalog: React.FC<CatalogProps> = (props) => {
  const { products, userCart } = props

  const onClickHeart = async (productId: string, isLike: boolean) => {
    "use server"

    if (!userCart) {
      redirect("/login")
    }

    const newUserCart: APIv1.Cart = {
      ...userCart,
    }

    if (isLike && !newUserCart.likes.includes(productId)) {
      newUserCart.likes.push(productId)
    } else {
      newUserCart.likes = newUserCart.likes.filter((id) => id !== productId)
    }

    await updateUserCart(newUserCart)
  }

  return (
    <div className="gallery">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onClickHeart={onClickHeart}
          liked={userCart ? userCart.likes.includes(product.id) : false}
        />
      ))}
    </div>
  )
}

export default Catalog
