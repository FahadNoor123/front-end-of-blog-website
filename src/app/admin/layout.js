import AdminSidebar from "@/components/AdminPanel/Sidebar/SideBar.jsx";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";

async function getUserRole() {
  const token = cookies().get("myAccessToken")?.value;
  if (!token) return "guest"; // Default role if no token

  try {
    const secret = new TextEncoder().encode(process.env.ACCESS_TOKEN_SECRET);
    const { payload } = await jwtVerify(token, secret);
    return payload.role || "guest"; // Ensure a default value
  } catch (error) {
    console.error("JWT Verification Failed:", error);
    return "guest"; // Default role on error
  }
}

export default async function AdminLayout({ children }) {
  // ✅ Extract role from JWT payload
  const role = await getUserRole();

  return (
    <div className="flex">
      {/* ✅ Pass role to the Client Component */}
      <AdminSidebar role={role} />
      <main className="flex-grow">{children}</main>
    </div>
  );
}
