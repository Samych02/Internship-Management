import {auth} from "@/auth";

export default async function getCurrentUserID(){
  const session = await auth()
  return parseInt(session?.user.id)

}
