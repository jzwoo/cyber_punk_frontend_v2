import { BASE_URL } from "@/api/api"
import { CART_API_ROUTES } from "@/api/carts/routes"
import authOptions from "@/lib/auth/authOptions"
import { getServerSession } from "next-auth"

const updateUserCart = async (updates: any) => {
  const session = await getServerSession(authOptions)

  if (!session) {
    return null
  }

  const res = await fetch(
    `${BASE_URL}${CART_API_ROUTES.UPDATE_CART(session.user.id)}`,
    {
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.accessToken}`,
        "X-Provider": session.provider,
      },
      method: "PUT",
      body: JSON.stringify(updates),
    }
  )

  if (!res.ok) {
    throw new Error("Failed to fetch user's cart")
  }

  return res.json()
}

export default updateUserCart
