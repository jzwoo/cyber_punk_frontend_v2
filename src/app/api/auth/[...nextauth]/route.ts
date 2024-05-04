import { axiosPublic } from "@/api/api"
import { login } from "@/api/auth/authAPI"
import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions: NextAuthOptions = {
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
        const user = res.data.user as any
        const accessToken = res.data.access_token

        console.log(accessToken)
        console.log(user)

        if (res.status === 200 && user) {
          return user
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
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
