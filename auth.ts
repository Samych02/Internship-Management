import NextAuth, {DefaultSession} from "next-auth"
import Credentials from "next-auth/providers/credentials"

declare module "next-auth" {
  interface User {
    userRole?: string | undefined
  }

  interface Session {
    user: {
      userRole?: string | undefined
    } & DefaultSession["user"]
  }
}
declare module "next-auth/jwt" {
  interface JWT {
    id?: string | undefined
    userRole?: string | undefined
  }
}

export const {handlers, signIn, signOut, auth} = NextAuth({
  pages: {
    signIn: '/login',
  },
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const {email, password} = credentials

        let response = await fetch('http://localhost:8081/users/login', {
          method: "POST",
          body: JSON.stringify({
            email: email,
            password: password,
          }),
          headers: {
            'Content-type': 'application/json'
          }
        })

        if (response.status !== 200) {
          return null
        }
        response = await response.json()
        return response.body as any
      },
    }),
  ],
  callbacks: {
    jwt({token, user}) {
      if (user) {
        token.userRole = user.userRole
        token.id = user.id
      }
      return token
    },
    session({session, token}) {
      session.user.userRole = token.userRole
      // @ts-ignore
      session.user.id = token.id
      return session
    }
  }
})
