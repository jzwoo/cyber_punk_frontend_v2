import { SignInButton } from "@/components/auth-components/auth-components"
import authOptions from "@/lib/auth/authOptions"
import { getServerSession } from "next-auth/next"
import { getProviders } from "next-auth/react"
import { redirect } from "next/navigation"
import React from "react"

const SignIn: React.FC = async () => {
  const session = await getServerSession(authOptions)

  // If the user is already logged in, redirect.
  // Note: Make sure not to redirect to the same page
  // To avoid an infinite loop!
  if (session) {
    return redirect("/cart")
  }

  const providers = await getProviders()

  return (
    <div className="flex flex-col h-[calc(100vh-60px)] items-center gap-4">
      {providers &&
        Object.values(providers).map((provider) => (
          <div key={provider.name}>
            <SignInButton
              providerName={provider.name}
              providerId={provider.id}
            />
          </div>
        ))}
    </div>
  )
}

export default SignIn
