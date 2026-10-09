"use client";

import { usePathname } from "next/navigation";
import { BellIcon, SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { SidebarTrigger } from "../ui/sidebar";

type PageRoutes = "/" | "/products" | "/stock" | "/reports" | "/settings";

const pageTitles: Record<PageRoutes, { title: string; description: string }> = {
  "/": {
    title: "Dashboard",
    description: "Overview of your inventory",
  },
  "/products": {
    title: "Products",
    description: "Manage your product catalog",
  },
  "/stock": {
    title: "Stock Movement",
    description: "Track stock in and out",
  },
  "/reports": {
    title: "Reports",
    description: "Generate inventory reports",
  },
  "/settings": {
    title: "Settings",
    description: "Configure your account and preferences",
  },
};

export const Header = () => {
  const pathname = usePathname();
  const base = ("/" + pathname.split("/")[1]) as PageRoutes;
  const page = pageTitles[base] ?? { title: "InvenTrack", description: "" };

  return (
    <header className="h-16 border-b bg-white flex items-center justify-between px-6 sticky">
      <div>
        <h1 className="font-semibold text-slate-800">{page.title}</h1>
        <p className="text-xs text-slate-500">{page.description}</p>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative hidden md:block">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
          <Input
            placeholder="Search..."
            className="pl-9 w-64 h-9 bg-slate-50"
          />
        </div>
        <Button variant="ghost" size="icon" className="relative">
          <BellIcon className="size-4" />
          <span className="absolute top-1.5 right-1.5 size-2 bg-red-500 rounded-full" />
        </Button>
        <SidebarTrigger />
      </div>
    </header>
  );
};
