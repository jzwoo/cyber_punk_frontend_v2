import { axiosPublic } from "@/api/api"
import { login } from "@/api/auth/authAPI"
import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions: NextAuthOptions = {
  secret: process.env.AUTH_SECRET,
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {},
      async authorize(credentials, req) {
        const { username, password } = credentials as any

        const res = await login(axiosPublic, {
          username: username,
          password: password,
        })

        const user = res.data.user
        const accessToken = res.data.access_token
        const refreshToken = res.data.refresh_token

        if (res.status === 200 && user && accessToken) {
          // this will be passed down to jwt callback as User
          return {
            id: user.uuid,
            name: user.name,
            uuid: user.uuid,
            access_token: accessToken,
            refresh_token: refreshToken,
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
    async jwt({ token, user }) {
      // user is received from authorize

      if (user) {
        token.user = user
      }

      // the token will be passed down to session callback as token
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
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
