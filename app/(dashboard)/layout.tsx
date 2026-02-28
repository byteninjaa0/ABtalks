import { Sidebar } from "@/components/sidebar";
import { AdminFab } from "@/components/admin-fab";
import { UserProvider } from "@/lib/user-context";
import { getCurrentUser } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();
  const serializedUser = user
    ? {
        id: user.id,
        name: user.name,
        email: user.email,
        selectedDomain: user.selectedDomain,
        joinedAt: user.joinedAt.toISOString(),
        role: user.role,
      }
    : null;

  return (
    <UserProvider user={serializedUser}>
      <div className="flex min-h-screen">
        <Sidebar />
        <main className="flex-1 pl-56">{children}</main>
        <AdminFab />
      </div>
    </UserProvider>
  );
}
