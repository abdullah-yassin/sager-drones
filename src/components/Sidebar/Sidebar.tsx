import { FC } from "react";
import SidebarMenu from "./SidebarMenu/SidebarMenu";
import { sibarMenuItems } from "@/constants/sidebarMenuItems";

const Sidebar: FC = () => {
  return (
    <div className="py-8 bg-zinc-900 text-white z-20">
      <SidebarMenu items={sibarMenuItems} />
    </div>
  );
};

export default Sidebar;
