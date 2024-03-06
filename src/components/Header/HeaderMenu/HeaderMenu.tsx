import { FC } from "react";
import { HeaderMenuItem } from "@/interfaces/menus";
import Image from "next/image";

interface IProps {
  items: HeaderMenuItem[];
}

const HeaderMenu: FC<IProps> = ({ items }) => {
  return (
    <div className="flex gap-6">
      {items.map((item) => (
        <button key={item.id}>
          <Image src={item.icon} alt={item.id} />
        </button>
      ))}
    </div>
  );
};

export default HeaderMenu;
