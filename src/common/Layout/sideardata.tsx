import { BiBookHeart } from "react-icons/bi";
import { RiFridgeLine } from "react-icons/ri";
import { FaCarrot } from "react-icons/fa";
import { AiOutlineUser } from "react-icons/ai";
import { FiShoppingBag, FiAlertOctagon, FiList } from "react-icons/fi";

export const sidebarData = [
  {
    title: "Przepisy",
    path: "/recipes",
    icon: <BiBookHeart />
  },
  {
    title: "Dieta",
    path: "/",
    icon: <FaCarrot />
  },
  {
    title: "Lodówka",
    path: "/",
    icon: <RiFridgeLine />
  },
  {
    title: "Zakupy",
    path: "/",
    icon: <FiShoppingBag />
  },
  {
    title: "Raporty",
    path: "/reports",
    icon: <FiAlertOctagon />
  },
  {
    title: "Produkty",
    path: "/products",
    icon: <FiList />
  },
  { title: "Konto", path: "/account", icon: <AiOutlineUser /> }
];
