import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;
    const token = req.nextauth.token;

    if (token && (pathname.startsWith("/auth/signin") || pathname.startsWith("/auth/signup"))) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    return NextResponse.next();
  },
  {
    pages: {
      signIn: "/auth/signin",
    },
  }
);

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/upload-agreement",
  ],
};
