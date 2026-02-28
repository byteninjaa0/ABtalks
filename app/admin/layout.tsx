import { redirect } from "next/navigation";
import { Sidebar } from "@/components/sidebar";
import { AdminFab } from "@/components/admin-fab";
import { UserProvider } from "@/lib/user-context";
import { getCurrentUser } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();
  if (!user || user.role !== "ADMIN") {
    redirect("/dashboard");
  }
  const serializedUser = {
    id: user.id,
    name: user.name,
    email: user.email,
    selectedDomain: user.selectedDomain,
    currentDay: user.currentDay,
    currentStreak: user.currentStreak,
    longestStreak: user.longestStreak,
    joinedAt: user.joinedAt.toISOString(),
    role: user.role,
  };

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
