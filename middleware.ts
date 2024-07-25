import {auth} from "@/auth"

export default auth(async (request) => {
  const {nextUrl} = request;
  const session = await auth()
  if (!session && (!"/login".includes(nextUrl.pathname) || nextUrl.pathname == "/")) {
    return Response.redirect(new URL("/login", nextUrl));
  }
  if (session && "/login".includes(nextUrl.pathname) && !"/".includes(nextUrl.pathname)) {
    console.log(3)
    return Response.redirect(new URL("/", nextUrl));
  }
})

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
