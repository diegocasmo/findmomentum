import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@/lib/auth";

export async function middleware(request: NextRequest) {
  const session = await auth();
  const { pathname } = request.nextUrl;

  // Public routes
  if (pathname === "/") {
    return NextResponse.next();
  }

  // Routes that require authentication
  if (pathname.startsWith("/dashboard") || pathname === "/auth/sign-out") {
    if (!session) {
      return NextResponse.redirect(new URL("/auth/sign-in", request.url));
    }
    return NextResponse.next();
  }

  // Routes for unauthenticated users
  if (
    ["/auth/sign-in", "/auth/error", "/auth/verify-request"].includes(
      pathname
    ) &&
    session
  ) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // For any other routes, allow the request to proceed
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
