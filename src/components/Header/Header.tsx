import { FC } from "react";
import Image from "next/image";
import { headerMenuItems } from "@/constants/headerMenuItems";
import HeaderMenu from "./HeaderMenu/HeaderMenu";
import AccountSection from "./AccountSection/AccountSection";

const Header: FC = () => {
  return (
    <header className="text-white bg-gray-950 px-4 py-3 flex justify-between items-center">
      <Image
        src="https://sagerdrone.com/frontend/img/sager_log.svg"
        alt="logo"
        width={"100"}
        height={"30"}
      />

      <div className="flex gap-5 items-center">
        <HeaderMenu items={headerMenuItems} />
        <AccountSection name={"Mohammed Omar"} role={"Technical Support"} />
      </div>
    </header>
  );
};

export default Header;
