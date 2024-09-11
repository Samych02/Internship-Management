// noinspection ES6UnusedImports
import NextAuth, {DefaultSession} from "next-auth"
import Credentials from "next-auth/providers/credentials"


export const {handlers, signIn, signOut, auth, unstable_update} = NextAuth({
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

        let response = await fetch(`${process.env.API_URL}/users/login`, {
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
        return response.body
      },
    }),
  ],
  callbacks: {
    jwt({token, user, trigger, session}) {
      if (user) {
        token.userRole = user.userRole
        token.id = user.id
      }
      if (trigger === 'update') {
        return {
          ...token,
          ...session.user
        };
      }
      return token
    },
    session({session, token}) {
      session.user.userRole = token.userRole
      session.user.id = token.id
      return session
    }
  }
})
