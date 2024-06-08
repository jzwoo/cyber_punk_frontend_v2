import authOptions from "@/lib/auth/authOptions"
import { getServerSession } from "next-auth"
import Link from "next/link"
import React from "react"

const Navbar: React.FC = async () => {
  const session = await getServerSession(authOptions)

  return (
    <div className="sticky top-0 bg-black flex justify-between h-[60px] px-[40px] py-[20px] z-40">
      <Link className="text-sm" href="/">
        HOME
      </Link>
      <Link className="text-sm" href="/store" prefetch={true}>
        STORE
      </Link>
      {session ? (
        <Link className="text-sm" href="/cart" prefetch={true}>
          CART
        </Link>
      ) : (
        <Link className="text-sm" href="/login" prefetch={true}>
          SIGN IN
        </Link>
      )}
    </div>
  )
}

export default Navbar
