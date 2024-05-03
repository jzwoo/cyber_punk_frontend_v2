import Link from "next/link"
import React from "react"

const Navbar: React.FC = () => {
  return (
    <div className="flex justify-between h-[60px] px-[40px] py-[20px]">
      <Link href="/">HOME</Link>
      <Link href="/store" prefetch={true}>
        STORE
      </Link>
      <Link href="/login" prefetch={true}>
        LOGIN
      </Link>
    </div>
  )
}

export default Navbar
