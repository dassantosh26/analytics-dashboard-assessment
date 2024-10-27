/** @format */
import { Link, Outlet, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "./ui/sidebar";
import { ChartNoAxesCombined, Home } from "lucide-react";
import Header from "./Header";

const AppSidebar = () => {
  const location = useLocation();
  const items = [
    { title: "Dashboard", url: "/", icon: Home },
    { title: "Datasets", url: "/datasets", icon: ChartNoAxesCombined },
  ];

  return (
    <Sidebar variant="floating" collapsible="icon" className="mt-16 ">
      <SidebarContent className="text-white bg-green-700 rounded-lg dark:bg-green-700 dark:text-white">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={location.pathname === item.url}
                  >
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default function Layout() {
  return (
    <SidebarProvider>
      <Header />
      <AppSidebar />
      <main>
        <Outlet />
      </main>
    </SidebarProvider>
  );
}
