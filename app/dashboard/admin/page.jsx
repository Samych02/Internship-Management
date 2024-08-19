import {auth} from "@/auth";
import roles from "@/app/lib/ROLES";

export default async function Users() {
  const session = await auth()
  for (let rolesKey in roles) {
  }
  return (<>
        <h1>{session?.user.id}</h1>
        <h1>{session?.user.image}</h1>
        <h1>{session?.user.name}</h1>
        <h1>{session?.user.email}</h1>
        <h1>{session?.user.userRole}</h1>
      </>
  )
}
