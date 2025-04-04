import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

import { AUTH_PAGES, PROTECTED_PAGES } from "./lib/middleware";

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

export const redirectToDashboard = (req: Request) =>
  NextResponse.redirect(new URL("/dashboard", req.url));

export const redirectToLogin = (req: Request, from: string) =>
  NextResponse.redirect(new URL(`/login${from ? `?to=${from}` : ""}`, req.url));

async function authMiddleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Check for session token
  const session = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  // auth pages case
  if (AUTH_PAGES.includes(pathname)) {
    if (session) {
      return redirectToDashboard(req);
    }
  }

  // protected pages case
  if (PROTECTED_PAGES.includes(pathname)) {
    if (!session) {
      return redirectToLogin(req, pathname);
    }
  }

  return NextResponse.next();
}

// async function authorizationMiddleware(req: NextRequest) {
//   const { pathname } = req.nextUrl;

//   const session = await getServerSession(authOptions);

//   if (!session) {
//     return redirectToLogin(req, pathname);
//   }

//   // Check each route pattern and apply corresponding rules
//   // for (const [, rule] of Object.entries(ROUTE_RULES)) {
//   //   const matches = pathname.match(rule.pattern);
//   //   if (matches) {
//   //     const isAuthorized = await rule.check(session, matches);
//   //     if (!isAuthorized) {
//   //       return redirectToDashboard(req);
//   //     }
//   //     break;
//   //   }
//   // }

//   return NextResponse.next();
// }

export async function middleware(req: NextRequest) {
  // const { pathname } = req.nextUrl;

  // Check if path matches any protected route patterns
  // const isProtectedRoute = Object.values(ROUTE_RULES).some((rule) =>
  //   pathname.match(rule.pattern)
  // );

  // if (isProtectedRoute) {
  //   return authorizationMiddleware(req);
  // }

  return authMiddleware(req);
}
