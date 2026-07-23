import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AdminShell } from "@/components/admin/admin-shell";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/session";

export default async function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  const token = cookies().get(SESSION_COOKIE)?.value;
  const session = await verifySessionToken(token);
  if (!session) redirect("/admin/login");

  return <AdminShell>{children}</AdminShell>;
}
