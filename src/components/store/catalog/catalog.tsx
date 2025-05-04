"use client"

import { getUserCart, updateUserCart } from "@/api/carts/cartsAPI"
import Loading from "@/app/store/loading"
import ProductCard from "@/components/store/catalog/productCard/productCard"
import getAxiosAuth from "@/lib/hooks/useAxiosAuth"
import { getSession, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import React, { useEffect, useState } from "react"
import "./catalog.css"

interface CatalogProps {
  products: APIv1.Product[]
}

const Catalog: React.FC<CatalogProps> = (props) => {
  const { products } = props
  const { data: session, status } = useSession()
  const router = useRouter()

  const [userCart, setUserCart] = useState<APIv1.Cart>()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (status !== "authenticated" || !session) return

    setLoading(true)
    // TODO: move getAxiosAuth out of hooks
    getUserCart(getAxiosAuth(session), session.user.id)
      .then((res) => {
        if (res.status === 200) setUserCart(res.data)
      })
      .catch((err) => {
        // TODO: do proper error handling
        console.log(err)
      })
      .finally(() => setLoading(false))
  }, [status, session])

  const onClickHeart = async (productId: string, isLike: boolean) => {
    if (status !== "authenticated" || !session || !userCart) {
      router.push("/login")
      return
    }

    const currSession = await getSession()

    if (!currSession) {
      router.push("/login")
      return
    }

    const newUserCart: APIv1.Cart = {
      ...userCart,
    }

    if (isLike && !newUserCart.likes.includes(productId)) {
      newUserCart.likes.push(productId)
    } else {
      newUserCart.likes = newUserCart.likes.filter((id) => id !== productId)
    }

    await updateUserCart(getAxiosAuth(session), session.user.id, newUserCart)
      .then((res) => {
        if (res.status === 200) setUserCart(res.data)
      })
      .catch((err) => {
        // TODO: do proper error handling
        console.log(err)
      })
  }

  if (loading) return <Loading />

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
