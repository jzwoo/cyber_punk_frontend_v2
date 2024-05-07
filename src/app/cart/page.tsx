"use client"

import { logout } from "@/api/auth/authAPI"
import { getUser } from "@/api/users/usersAPI"
import { Button } from "@/components/ui/button"
import useAxiosAuth from "@/lib/hooks/useAxiosAuth"
import { signOut, useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import React, { useState } from "react"

const Cart: React.FC = () => {
  const { data: session, status } = useSession()
  const axiosAuth = useAxiosAuth()

  const [user, setUser] = useState<APIv1.User | null>(null)

  if (status === "loading") {
    return <div>Loading...</div>
  }

  if (!session) {
    return redirect("api/auth/signin")
  }

  const getUserDetails = async () => {
    getUser(axiosAuth, session.user.username)
      .then((res) => {
        if (res.status === 200) {
          setUser(res.data)
        }
      })
      .catch(async (err) => {
        if (err.response.status === 401) {
          await signOut()
        } else {
          console.log("There was an error retrieving user details")
        }
      })
  }

  const handleSignOut = async () => {
    logout(axiosAuth).finally(() => {
      signOut()
    })
  }

  return (
    <div className="flex flex-col gap-2">
      <div>This is the cart page</div>

      <div className="flex gap-2">
        <Button className="w-fit" variant="secondary" onClick={getUserDetails}>
          GET USER DETAILS
        </Button>

        <Button
          className="w-fit"
          variant="secondary"
          onClick={() => setUser(null)}
        >
          CLEAR
        </Button>
      </div>

      <div>{user ? JSON.stringify(user) : "No user details"}</div>

      <Button className="w-fit" variant="secondary" onClick={handleSignOut}>
        LOGOUT
      </Button>
    </div>
  )
}

export default Cart
