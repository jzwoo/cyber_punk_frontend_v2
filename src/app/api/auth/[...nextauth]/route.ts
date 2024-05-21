import { axiosPublic } from "@/api/api"
import { AUTH_API_ROUTES } from "@/api/auth/routes"
import { parse } from "cookie"
import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { cookies } from "next/headers"

const authOptions: NextAuthOptions = {
  secret: process.env.AUTH_SECRET,
  providers: [
    CredentialsProvider({
      // The name to display on the sign-in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign-in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {},
      async authorize(credentials, req) {
        const { username, password } = credentials as any

        const res = await axiosPublic.post(AUTH_API_ROUTES.LOGIN(), {
          username: username,
          password: password,
        })

        const apiCookies = res.headers["set-cookie"]
        if (apiCookies && apiCookies.length > 0) {
          apiCookies.forEach((cookie) => {
            const parsedCookie = parse(cookie)
            const [cookieName, cookieValue] = Object.entries(parsedCookie)[0]
            const httpOnly = cookie.includes("HttpOnly;")

            // this sets the client with the cookie from the server
            cookies().set(cookieName, cookieValue, {
              httpOnly: httpOnly,
              maxAge: parseInt(parsedCookie["Max-Age"]),
              path: parsedCookie.Path,
              sameSite: parsedCookie.SameSite as
                | boolean
                | "lax"
                | "strict"
                | "none"
                | undefined,
              secure: true,
            })
          })
        }

        const user = res.data.user
        const accessToken = res.data.access_token

        if (res.status === 200 && user && accessToken) {
          // this will be passed down to jwt callback as User
          return {
            id: user.uuid,
            uuid: user.uuid,
            username: user.username,
            access_token: accessToken,
            name: user.name,
            email: "",
            groups: [],
            expires_at: "",
          }
        } else {
          return null
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user, account, trigger, session }) {
      // user is received from authorize
      // the token will be passed down to session callback as token

      if (user) {
        token.user = user
      }

      // the trigger is update when the refresh endpoint is called and the new session token is received
      if (trigger === "update" && session.user) {
        token.user = session.user
      }

      return token
    },
    async session({ session, token }) {
      // token is received from jwt callback

      if (token) {
        session.user = token.user as any
      }

      return session
    },
  },
  events: {
    signOut: async (message) => {
      // the name of the cookie should match that of cookieName in authorize
      cookies().delete("jwt")
    },
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
