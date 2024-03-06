"use client";

import { FC } from "react";
import { SidebarMenuItem } from "@/interfaces/menus";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";

interface IProps {
  items: SidebarMenuItem[];
}

const SidebarMenu: FC<IProps> = ({ items }) => {
  const pathname = usePathname();

  return (
    <div className="flex flex-col">
      {items.map((item) => (
        <Link
          href={item.path}
          key={item.id}
          className={`flex flex-col items-center p-4 hover:bg-zinc-700 uppercase ${
            pathname === item.path ? "bg-zinc-700" : "bg-transparent"
          }`}
        >
          <Image src={item.icon} alt={item.id} />
          <span className="mt-2 text-gray-400">{item.title}</span>
        </Link>
      ))}
    </div>
  );
};

export default SidebarMenu;
