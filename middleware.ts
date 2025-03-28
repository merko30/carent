import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};

const AUTH_PAGES = ["/login", "/register"];
const PROTECTED_PAGES = ["/dashboard", "/profile"]; // Add pages that require authentication

async function authMiddleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const sessionCookie = (await cookies()).get("session");

  // auth pages case
  if (AUTH_PAGES.includes(pathname)) {
    if (sessionCookie?.value) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
  }

  // protected pages case
  if (PROTECTED_PAGES.includes(pathname)) {
    if (!sessionCookie?.value) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}

export async function middleware(req: NextRequest) {
  return authMiddleware(req);
}
//    // matches /vehicles/:id/edit
//    if (pathname.match(/\/vehicles\/\d+\/edit/)) {
//     return authorizationMiddleware(req);
//   }

// }
