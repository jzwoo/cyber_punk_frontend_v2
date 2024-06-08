"use client"

import { Button } from "@/components/ui/button"
import { SessionProvider, signIn, signOut } from "next-auth/react"
import React from "react"

interface SignInButtonProps {
  providerName: string
  providerId: string
}

export const SignInButton: React.FC<SignInButtonProps> = (props) => {
  const { providerName, providerId } = props

  return (
    <SessionProvider>
      <Button
        className="uppercase"
        variant="secondary"
        onClick={() => signIn(providerId)}
      >
        Sign In with {providerName}
      </Button>
    </SessionProvider>
  )
}

export const SignOutButton: React.FC = () => {
  return (
    <Button className="uppercase" variant="secondary" onClick={() => signOut()}>
      Sign Out
    </Button>
  )
}
