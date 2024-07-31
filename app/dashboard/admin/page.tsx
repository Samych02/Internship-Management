import {auth} from "@/auth";
import roles from "@/app/lib/roles";

export default async function Users() {
  const session = await auth()
  for (let rolesKey in roles) {
  }
  return (<h1>h1</h1>)
}
