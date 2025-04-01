import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";

export async function middleware(req) {
  console.log("Middleware is running...");
  
  const adminRoutes = ["/admin", "/admin/payment-verification" ];
  const cookieStore = cookies(); // ✅ Removed `await`
  const token = await cookieStore.get("myAccessToken")?.value; // Await cookies() before using its value
  console.log("Middleware is running...", token);
  if (!token) {
    console.log("No token found, redirecting to /login");
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    const secret = new TextEncoder().encode(process.env.ACCESS_TOKEN_SECRET);
    const { payload } = await jwtVerify(token, secret);

    console.log("Decoded token:", payload);
    console.log("User role:", payload.role);
    console.log("Current path:", req.nextUrl.pathname);

    if (adminRoutes.includes(req.nextUrl.pathname) && !["superadmin", "admin"].includes(payload.role)) {
      console.log("Unauthorized access attempt, redirecting to /not-found...");
      return NextResponse.redirect(new URL("/not-found", req.url));
    }

    // ✅ Redirect superadmin or admin to /admin
    // if (["superadmin", "admin"].includes(payload.role) && req.nextUrl.pathname !== "/admin") {
    //   console.log("Redirecting admin to /admin...");
    //   return NextResponse.redirect(new URL("/admin", req.url));
    // }
  } catch (error) {
    console.error("JWT Verification Failed:", error);
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
