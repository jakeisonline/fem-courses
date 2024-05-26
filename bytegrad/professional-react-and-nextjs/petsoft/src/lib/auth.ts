import NextAuth, { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import { getUserByEmail } from "@/lib/serverUtils"
import { authSchema } from "@/lib/validations"

const config = {
  pages: {
    signIn: "/login",
  },
  session: {
    maxAge: 30 * 24 * 60 * 60, // 30 days
    strategy: "jwt",
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        // Validation
        const validatedCredentials = authSchema.safeParse(credentials)

        if (!validatedCredentials.success) {
          throw new Error("Auth data failed validation")
        }

        // Runs on every login
        const { email, password } = validatedCredentials.data

        if (!email) throw new Error("Email is was not found")

        const user = await getUserByEmail(email)

        if (!user) {
          console.log("User not found")
          return null
        }

        const passwordsMatch = await bcrypt.compare(password, user.password)

        if (!passwordsMatch) {
          console.log("Bad credentials")
          return null
        }

        return user
      },
    }),
  ],
  callbacks: {
    authorized: ({ auth, request }) => {
      const isLoggedIn = Boolean(auth?.user)
      const requestedPath = request.nextUrl.pathname
      const isAccessingApp = requestedPath.includes("/app")
      const isAuthing =
        requestedPath.includes("/login") || requestedPath.includes("/signup")

      // Redirect to login if not logged in, and trying to access app
      if (isAccessingApp && !isLoggedIn) return false

      // Redirect to app if logged in, and trying to access login
      if (isAuthing && isLoggedIn) {
        return Response.redirect(new URL("/app/dashboard/", request.nextUrl))
      }

      return true
    },
    jwt: ({ token, user }) => {
      if (user) token.userId = user.id
      return token
    },
    session: ({ session, token }) => {
      if (session.user) {
        session.user.id = token.userId
      }
      return session
    },
  },
} satisfies NextAuthConfig

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(config)
