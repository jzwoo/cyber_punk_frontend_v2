import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import React from "react"

const Cart: React.FC = async () => {
  const session = await getServerSession(authOptions)

  if (!session) {
    return redirect("api/auth/signin")
  }

  return <div>This is the cart page</div>
}

export default Cart
