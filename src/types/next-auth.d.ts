import "next-auth"

declare module "next-auth" {
  interface User {
    id: string
    name: string
    username: string
    uuid: string
    access_token: string
    email: string
    groups: string[]
    expires_at: string
    image: string
  }

  interface Session {
    user: User
    accessToken: string
    expiresAt: string
    provider: string
  }
}
