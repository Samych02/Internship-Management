import {auth} from "@/auth"

export default auth(async (request) => {
  const {nextUrl} = request;
  const session = await auth()
  if (!session && (!"/login".includes(nextUrl.pathname) || nextUrl.pathname === "/")) {
    return Response.redirect(new URL("/login", nextUrl));
  }
  if (session && "/login".includes(nextUrl.pathname) && !"/dashboard".includes(nextUrl.pathname)) {
    return Response.redirect(new URL("/dashboard", nextUrl));
  }
})

export const config = {
  matcher: ["/((?!api|static|.*\\..*|_next|favicon.ico).*)"],
}
