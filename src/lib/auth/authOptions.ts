import { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { cookies } from "next/headers"

const authOptions: NextAuthOptions = {
  secret: process.env.AUTH_SECRET,
  providers: [
    // CredentialsProvider({
    //   // The name to display on the sign-in form (e.g. "Sign in with...")
    //   name: "Credentials",
    //   // `credentials` is used to generate a form on the sign-in page.
    //   // You can specify which fields should be submitted, by adding keys to the `credentials` object.
    //   // e.g. domain, username, password, 2FA token, etc.
    //   // You can pass any HTML attribute to the <input> tag through the object.
    //   credentials: {},
    //   async authorize(credentials, req) {
    //     const { username, password } = credentials as any
    //
    //     const res = await axiosPublic.post(AUTH_API_ROUTES.LOGIN(), {
    //       username: username,
    //       password: password,
    //     })
    //
    //     const apiCookies = res.headers["set-cookie"]
    //     if (apiCookies && apiCookies.length > 0) {
    //       apiCookies.forEach((cookie) => {
    //         const parsedCookie = parse(cookie)
    //         const [cookieName, cookieValue] = Object.entries(parsedCookie)[0]
    //         const httpOnly = cookie.includes("HttpOnly;")
    //
    //         // this sets the client with the cookie from the server
    //         cookies().set(cookieName, cookieValue, {
    //           httpOnly: httpOnly,
    //           maxAge: parseInt(parsedCookie["Max-Age"]),
    //           path: parsedCookie.Path,
    //           sameSite: parsedCookie.SameSite as
    //             | boolean
    //             | "lax"
    //             | "strict"
    //             | "none"
    //             | undefined,
    //           secure: true,
    //         })
    //       })
    //     }
    //
    //     const user = res.data.user
    //     const accessToken = res.data.access_token
    //
    //     if (res.status === 200 && user && accessToken) {
    //       // this will be passed down to jwt callback as User
    //       return {
    //         id: user.uuid,
    //         uuid: user.uuid,
    //         username: user.username,
    //         access_token: accessToken,
    //         name: user.name,
    //         email: "",
    //         groups: [],
    //         expires_at: "",
    //       }
    //     } else {
    //       return null
    //     }
    //   },
    // }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      // Google requires "offline" access_type to provide a `refresh_token`
      authorization: { params: { access_type: "offline", prompt: "consent" } },
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
      if (account?.provider === "google") {
        return true
      }

      return false
    },
    async jwt({ token, user, account, trigger, session }) {
      // user is received from authorize
      // the token will be passed down to session callback as token

      if (account && user) {
        // account is received from the provider only on the first login
        // subsequent calls to get session will not have account
        token.provider = account.provider
        token.accessToken = account.id_token
        token.expiresAt = account.expires_at
        token.refreshToken = account.refresh_token

        token.user = user

        return token
      }

      if (token) {
        if (Date.now() < (token.expiresAt as number) * 1000) {
          // not expired
          return token
        } else {
          console.log("Refreshing token")
          // expired
          const response = await fetch("https://oauth2.googleapis.com/token", {
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({
              client_id: process.env.GOOGLE_CLIENT_ID as string,
              client_secret: process.env.GOOGLE_CLIENT_SECRET as string,
              grant_type: "refresh_token",
              refresh_token: token.refreshToken as string,
            }),
            method: "POST",
          })

          const responseTokens = await response.json()

          if (!response.ok) throw responseTokens

          return {
            ...token,
            accessToken: responseTokens.id_token,
            expiresAt: Math.floor(
              Date.now() / 1000 + (responseTokens.expires_in as number)
            ),
            // Fall back to old refresh token, but note that
            // many providers may only allow using a refresh token once.
            refreshToken: responseTokens.refresh_token ?? token.refresh_token,
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
        session.expiresAt = token.expiresAt as string
        session.provider = token.provider as string
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

export default authOptions
