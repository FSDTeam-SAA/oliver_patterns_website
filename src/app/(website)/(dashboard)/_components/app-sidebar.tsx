"use client";
import { Heart, LogOut, Settings } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

// Menu items.
const items = [
  {
    title: "My Wishlist",
    url: "/dashboard",
    icon: Heart,
  },
  {
    title: "Settings",
    url: "/dashboard/settings",
    icon: Settings,
  },
];

export function AppSidebar() {
  const pathName = usePathname();

  const handleLogout = () => {
    signOut({
      callbackUrl: "/login",
    });
  };

  return (
    <Sidebar className="border-r border-gray-200">
      <SidebarContent className="scrollbar-hide">
        <SidebarGroup className="p-0 text-black bg-[#eff7ff]">
          <div className="flex flex-col justify-between min-h-screen pb-5">
            <div className="w-[250px] mt-10 px-2">
              <SidebarGroupContent>
                <SidebarMenu className="space-y-2">
                  {items.map((item) => {
                    const isActive =
                      item.url === "/dashboard"
                        ? pathName === "/dashboard"
                        : pathName === item.url ||
                          pathName.startsWith(`${item.url}/`);

                    return (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton
                          className={`text-lg hover:bg-[#d6eaff] hover:text-black h-[45px] ${
                            isActive && "bg-[#d6eaff]"
                          }`}
                          asChild
                        >
                          <Link href={item.url}>
                            <item.icon />
                            <span>{item.title}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </div>

            <div>
              <SidebarFooter className="border-t border-gray-300">
                <button
                  onClick={handleLogout}
                  className="font-medium text-red-500 flex items-center gap-2 pl-2 mt-5"
                >
                  <LogOut className="h-4 w-4" /> Log out
                </button>
              </SidebarFooter>
            </div>
          </div>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
