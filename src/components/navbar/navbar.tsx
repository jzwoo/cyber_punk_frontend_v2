import Link from "next/link"
import React from "react"

const Navbar: React.FC = () => {
  return (
    <div className="flex justify-between h-[60px] px-[40px] py-[20px]">
      <Link className="text-sm" href="/">
        HOME
      </Link>
      <Link className="text-sm" href="/store" prefetch={true}>
        STORE
      </Link>
      <Link className="text-sm" href="/cart" prefetch={true}>
        CART
      </Link>
    </div>
  )
}

export default Navbar
