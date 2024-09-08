import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse, type NextRequest } from "next/server";
import { Database } from "./lib/types/supabase";
import { checkUserDetails } from "./utils/functions/checkUserDetails";


export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient<Database>({ req, res });
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const url = new URL(req.nextUrl);
  if (!session) {
    if (
      url.pathname.startsWith("/admin") ||
      url.pathname.startsWith("/profile") ||
      url.pathname.startsWith("/admin") ||
      url.pathname.startsWith("/coordinator") ||
      url.pathname.startsWith("/entry")
    ) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }
  if (session) {
    const userDetails = await supabase
      .from("users")
      .select()
      .eq("id", session?.user.id);

    const userRoles = await supabase
      .from("roles")
      .select(
        "*",
      )
      .eq("id", session?.user.id);


    let superAdmin = false;
    let eventCoordinator = false;
    let volunteer = false;
    let convenor = false;
    let registrar = false;
    let security = false;
    let securityAdmin = false;
    if (userRoles && userRoles.data) {
      for (const obj of userRoles.data) {

        if (obj.role === "ADMIN") {
          superAdmin = true;
        } else if (obj.role === "COORDINATOR") {
   
            eventCoordinator = true;

        } else if (obj.role === "VOLUNTEER") {

            volunteer = true;

        }
      }
    }

    if (superAdmin && url.pathname.startsWith("/registrar")) {
      return NextResponse.next();
    }
    if (registrar && url.pathname.startsWith("/registrar")) {
      return NextResponse.next();
    }
    if (eventCoordinator && url.pathname.startsWith("/registrar")) {
      return NextResponse.next();
    }
    if (convenor && url.pathname.startsWith("/registrar")) {
      return NextResponse.next();
    }
    if (
      (security || superAdmin || securityAdmin) &&
      url.pathname.startsWith("/entry")
    ) {
      if (
        !superAdmin &&
        !securityAdmin &&
        url.pathname.startsWith("/entry/add")
      ) {
        return NextResponse.redirect(new URL("/entry", req.url));
      }
      return NextResponse.next();
    }

    if (
      (!security || !superAdmin || !securityAdmin) &&
      url.pathname.startsWith("/entry")
    ) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    if (
      (!superAdmin ||
        !registrar ||
        !convenor ||
        !eventCoordinator ||
        !volunteer) &&
      url.pathname.startsWith("/registrar")
    ) {
      return NextResponse.redirect(new URL("/", req.url));
    }
    if (
      checkUserDetails(userDetails?.data?.[0]!) === false &&
      url.pathname !== "/profile/edit"
    ) {
      return NextResponse.redirect(new URL("/profile/edit", req.url));
    }

    if (superAdmin && url.pathname.startsWith("/admin" || "/coordinator")) {
      return NextResponse.next();
    }

    if (
      !superAdmin &&
      url.pathname.startsWith(
        "/admin" || url.pathname.startsWith("/coordinator"),
      )
    ) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    if (eventCoordinator && url.pathname.startsWith("/coordinator")) {
      const eventId = url.pathname.split("/")[2];
      if (eventId != undefined) {
        if (userRoles.data?.find((role) => role.event_id === eventId)) {
          return NextResponse.next();
        } else {
          return NextResponse.redirect(new URL("/", req.url));
        }
      } else {
        return NextResponse.next();
      }
    }

    if (volunteer && url.pathname.startsWith("/coordinator")) {
      const eventId = url.pathname.split("/")[2];
      if (eventId != undefined) {
        if (userRoles.data?.find((role) => role.event_id === eventId)) {
          return NextResponse.next();
        } else {
          return NextResponse.redirect(new URL("/", req.url));
        }
      } else {
        return NextResponse.next();
      }
    }
    if (convenor && url.pathname.startsWith("/coordinator")) {
      return NextResponse.next();
    }
    if (superAdmin && url.pathname.startsWith("/coordinator")) {
      return NextResponse.next();
    }

    if (
      !eventCoordinator &&
      !volunteer &&
      url.pathname.startsWith("/coordinator")
    ) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|assets|favicon.ico|logo.png|sw.js).*)",
  ],
};
