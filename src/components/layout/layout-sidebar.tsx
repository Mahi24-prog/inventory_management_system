"use client";

import { cn } from "@/lib/utils";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  LayoutDashboardIcon,
  PackageIcon,
  ArrowLeftRightIcon,
  BarChart3Icon,
  SettingsIcon,
  Boxes,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboardIcon, href: "/" },
  { label: "Products", icon: PackageIcon, href: "/products" },
  {
    label: "Stock Movement",
    icon: ArrowLeftRightIcon,
    href: "/stock",
  },
  {
    label: "Reports",
    icon: BarChart3Icon,
    href: "/reports",
  },
  { label: "Settings", icon: SettingsIcon, href: "/settings" },
];

export const LayoutSidebar = () => {
  const pathname = usePathname();
  return (
    <Sidebar className="bg-slate-900">
      <SidebarHeader className="p-4 border-b border-slate-500/50">
        <div className="flex items-center gap-3">
          <div className="bg-indigo-500 p-2 rounded-lg">
            <Boxes className="text-white size-5" />
          </div>
          <div>
            <p className="font-bold text-sm">InvenTrack</p>
            <p className="text-xs text-slate-400">Inventory System</p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <SidebarMenuItem key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 text-sm transition-colors",
                    isActive
                      ? "bg-indigo-600 text-white"
                      : "text-slate-400 hover:bg-slate-800 hover:text-white",
                  )}
                >
                  <Icon className="size-4" />
                  {item.label}
                </Link>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-4 border-t border-slate-700">
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="size-8 rounded-full bg-indigo-500 flex items-center justify-center text-xs font-bold">
            MP
          </div>
          <div>
            <p className="text-sm font-medium">Mahendra Pawar</p>
            <p className="text-xs text-slate-400">Admin</p>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};
