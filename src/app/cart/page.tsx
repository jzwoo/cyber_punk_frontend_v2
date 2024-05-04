"use client"

import { Button } from "@/components/ui/button"
import { signOut, useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import React from "react"

const Cart: React.FC = () => {
  const { data: session, status } = useSession()

  console.log(session?.user)

  if (status === "loading") {
    return <div>Loading...</div>
  }

  if (!session) {
    return redirect("api/auth/signin")
  }

  return (
    <div>
      <div>This is the cart page</div>

      <Button variant="secondary" onClick={() => signOut()}>
        LOGOUT
      </Button>
    </div>
  )
}

export default Cart
