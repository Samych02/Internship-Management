import {auth} from "@/auth";
import {redirect} from "next/navigation";
import {ReactNode} from "react";

export default async function Layout({children}: { children: ReactNode }) {
  const session = await auth()
  if (session?.user.userRole != "SUPERVISOR") return redirect("/")
  return <>{children}</>
}
