import {auth, signOut} from "@/auth";

export default async function Home() {
  const session = await auth()
  console.log(session?.user)

  return (
      <>
        <p>{session?.user?.id}</p>
        <p>{session?.user?.userRole}</p>
        <p>{session?.user?.email}</p>
        <form
            action={async () => {
              "use server"
              await signOut({redirectTo: "/login"})
            }}
        >
          <button type="submit">Sign Out</button>
        </form>
      </>

  )
}
