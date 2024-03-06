import { HeaderMenuItem } from "@/interfaces/menus";
import languageIcon from "@/public/language-svgrepo-com.svg";
import notificationsIcon from "@/public/bell.svg";
import captureIcon from "@/public/capture-svgrepo-com.svg";

export const headerMenuItems: HeaderMenuItem[] = [
  {
    id: "capture",
    icon: captureIcon,
  },
  {
    id: "lang",
    icon: languageIcon,
  },
  {
    id: "notifications",
    icon: notificationsIcon,
  },
];
