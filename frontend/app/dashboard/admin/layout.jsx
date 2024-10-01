import {auth} from "@/auth";
import {redirect} from "next/navigation";

export default async function Layout({children}) {
  const session = await auth()
  if (session?.user.userRole !== "ADMIN") return redirect("/")
  return (
      <>
        {children}
      </>
  )
}
