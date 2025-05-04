import { BASE_URL } from "@/api/api"
import { NextAuthOptions } from "next-auth"
import Github from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"

const authOptions: NextAuthOptions = {
  secret: process.env.AUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      // Google requires "offline" access_type to provide a `refresh_token`
      authorization: { params: { access_type: "offline", prompt: "consent" } },
    }),
    Github({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      if (!account) return false

      const provider = account.provider

      let token = null

      if (provider === "google") {
        token = account.id_token
      } else if (provider === "github") {
        token = account.access_token
      } else {
        return false
      }

      if (!token) return false

      const response = await fetch(
        `${BASE_URL}/api/v1/auth/${provider}-login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        }
      )

      if (response.ok) {
        const {
          access_token,
          refresh_token,
          user: curr_user,
        } = await response.json()
        const [, payload] = access_token.split(".")
        const decodedPayload = JSON.parse(atob(payload))

        account.access_token = access_token
        account.refresh_token = refresh_token
        account.expires_at = decodedPayload.exp

        user.id = curr_user.id
        user.name = curr_user.name
        user.email = curr_user.email

        return true
      } else {
        console.log("Failed to log in or register user in backend")
        return false
      }
    },
    async jwt({ token, user, account, session }) {
      // user is received from authorize
      // the token will be passed down to session callback as token

      if (account && user) {
        // account is received from the provider only on the first login
        // subsequent calls to get session will not have account
        token.provider = account.provider
        token.accessToken = account.access_token
        token.refreshToken = account.refresh_token
        token.expiresAt = account.expires_at
        token.user = user

        return token
      }

      if (token) {
        if (Date.now() < (token.expiresAt as number) * 1000) {
          return token
        } else {
          console.log(
            `[${new Date().toLocaleTimeString()}] Access token expired. Refreshing token...`
          )

          const response = await fetch(`${BASE_URL}/api/v1/auth/refresh`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ refresh_token: token.refreshToken }),
          })

          if (response.ok) {
            const {
              access_token,
              refresh_token,
              user: curr_user,
            } = await response.json()
            const [, payload] = access_token.split(".")
            const decodedPayload = JSON.parse(atob(payload))

            token.accessToken = access_token
            token.refreshToken = refresh_token
            token.expiresAt = decodedPayload.exp
            token.user = curr_user

            return token
          } else {
            throw new Error("Error when refreshing token")
          }
        }
      }

      // the trigger is update when the refresh endpoint is called and the new session token is received
      // if (trigger === "update" && session.user) {
      //   token.user = session.user
      // }

      return token
    },
    async session({ session, token }) {
      // token is received from jwt callback

      if (token) {
        session.user = token.user as any
        session.accessToken = token.accessToken as string
        session.provider = token.provider as string
      }

      return session
    },
  },
  events: {
    signOut: async (message) => {
      await fetch(`${BASE_URL}/api/v1/auth/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${message.token.accessToken}`,
        },
      })
    },
  },
}

export default authOptions
