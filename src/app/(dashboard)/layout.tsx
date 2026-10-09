import { Header } from "@/components/layout/header";
import { LayoutSidebar } from "@/components/layout/layout-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

interface Props {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: Props) {
  return (
    <SidebarProvider className="flex h-screen">
      <LayoutSidebar />
      <div className="flex-1 flex flex-col overflow-hidden bg-slate-50">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </SidebarProvider>
  );
}
