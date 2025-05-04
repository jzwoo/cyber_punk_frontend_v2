import { SignOutButton } from "@/components/auth-components/auth-components"
import authOptions from "@/lib/auth/authOptions"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import React from "react"

const Cart: React.FC = async () => {
  const session = await getServerSession(authOptions)

  if (session === null) {
    return redirect("/login")
  }

  return (
    <div className="flex flex-col w-screen">
      <div className="w-full break-words whitespace-pre-wrap">
        {JSON.stringify(session)}
      </div>
      <div>
        <SignOutButton />
      </div>
    </div>
  )
}

export default Cart
