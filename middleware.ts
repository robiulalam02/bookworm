import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
    function middleware(req) {
        const token = req.nextauth.token;
        const path = req.nextUrl.pathname;

        // 1. Root Redirect Logic
        if (path === "/") {
            if (token?.role === "admin") return NextResponse.redirect(new URL("/dashboard", req.url));
            return NextResponse.redirect(new URL("/library", req.url));
        }

        // 2. Admin Protection Logic
        // We check for the actual folder names you are using for Admin tasks
        const isAdminPage = path.startsWith("/dashboard") ||
            path.startsWith("/manage-books") ||
            path.startsWith("/genres") ||
            path.startsWith("/users");

        if (isAdminPage && token?.role !== "admin") {
            return NextResponse.redirect(new URL("/library", req.url));
        }
    },
    {
        callbacks: {
            authorized: ({ token }) => !!token,
        },
    }
);

export const config = {
    matcher: [
        "/",
        "/dashboard/:path*",
        "/library/:path*",
        "/manage-books/:path*",
        "/genres/:path*",
        "/users/:path*",
        "/browse/:path*",
    ],
};