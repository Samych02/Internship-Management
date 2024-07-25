import {auth, signOut} from "@/auth";
import {Button} from "@mantine/core";

export default async function Home() {
  const session = await auth()
  // const [opened, { toggle }] = useDisclosure();

  return (
      <>
        <h1>{session?.user.email}</h1>
        {/*<BasicAppShell/>*/}
        <form action={async () => {
          "use server"
          await signOut()
        }}>
          <Button type="submit">logout</Button>
        </form>
      </>
  );
}
