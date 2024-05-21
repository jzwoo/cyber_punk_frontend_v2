"use client"

import { getUserCart, updateUserCart } from "@/api/carts/cartsAPI"
import ProductCard from "@/components/store/catalog/productCard/productCard"
import useAxiosAuth from "@/lib/hooks/useAxiosAuth"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import React, { useEffect, useState } from "react"
import "./catalog.css"

interface CatalogProps {
  products: APIv1.Product[]
}

const Catalog: React.FC<CatalogProps> = (props) => {
  const { products } = props
  // session has 3 states: undefined (still retrieving), null (unauthenticated), and session (authenticated)
  const { data: session, status } = useSession()

  if (status === "loading" || session === undefined)
    return <div>Loading...</div>

  return <FullCatalog products={products} />
}

interface FullCatalogProps {
  products: APIv1.Product[]
}

const FullCatalog: React.FC<FullCatalogProps> = (props) => {
  const { products } = props

  const { data: session } = useSession()
  const axiosAuth = useAxiosAuth()
  const router = useRouter()

  const [loading, setLoading] = useState(false)
  const [cart, setCart] = useState<APIv1.Cart>()

  useEffect(() => {
    // if the user is not authenticated, no need to fetch the user's cart
    if (session === null) return

    setLoading(true)
    getUserCart(axiosAuth, session.user.username)
      .then((res) => {
        if (res.status === 200) setCart(res.data)
      })
      .catch((err) => {
        console.log("Error retrieving user's cart")
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  const onClickHeart = async (productUuid: string, isLike: boolean) => {
    if (!session || !cart) {
      router.push("api/auth/signin")
      return
    }

    if (isLike && !cart.likes.includes(productUuid)) {
      cart.likes.push(productUuid)
    }

    if (!isLike && cart.likes.includes(productUuid)) {
      cart.likes = cart.likes.filter((like) => like !== productUuid)
    }

    updateUserCart(axiosAuth, session.user.username, cart).then((res) => {
      if (res.status === 200) setCart(res.data)
    })
  }

  if (loading) return <div>Loading...</div>

  return (
    <div className="gallery">
      {products.map((product) => (
        <ProductCard
          key={product.uuid}
          product={product}
          onClickHeart={onClickHeart}
          liked={cart?.likes.includes(product.uuid)}
        />
      ))}
    </div>
  )
}

export default Catalog
