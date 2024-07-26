import {auth} from "@/auth";
import {redirect} from "next/navigation";

export default async function Home() {
  const session = await auth()
  const link = session?.user.userRole?.toLowerCase()
  return (
      redirect(`/dashboard/${link}`)
  );
}
