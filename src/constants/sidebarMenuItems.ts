import { SidebarMenuItem } from "@/interfaces/menus";
import dashboardIcon from "@/public/dashboard-svgrepo-com-2.svg";
import mapIcon from "@/public/location-svgrepo-com-2.svg";

export const sibarMenuItems: SidebarMenuItem[] = [
  {
    id: "dashboard",
    path: "/dashboard",
    title: "Dashboard",
    icon: dashboardIcon,
  },
  {
    id: "map",
    path: "/map",
    title: "Map",
    icon: mapIcon,
  },
];
