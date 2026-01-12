import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
    function middleware(req) {
        const token = req.nextauth.token;
        const path = req.nextUrl.pathname;

        if (path === "/") {
            if (token?.role === "admin") return NextResponse.redirect(new URL("/dashboard", req.url));
            return NextResponse.redirect(new URL("/library", req.url));
        }

        if (path.startsWith("/admin") && token?.role !== "admin") {
            return NextResponse.redirect(new URL("/library", req.url));
        }
    },
    {
        callbacks: {
            authorized: ({ token }) => !!token,
        },
    }
);

// We are changing the matcher to be MUCH simpler to avoid the Regex error
export const config = {
    matcher: [
        "/dashboard/:path*",
        "/library/:path*",
        "/manage-books/:path*",
        "/browse/:path*",
        "/",
    ],
};