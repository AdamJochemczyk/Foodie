import { BiBookHeart } from "react-icons/bi";
import { RiFridgeLine } from "react-icons/ri";
import { FaCarrot } from "react-icons/fa";
import { AiOutlineUser } from "react-icons/ai";
import { FiShoppingBag, FiList } from "react-icons/fi";

export const sidebarData = [
  {
    title: "Przepisy",
    path: "/recipes",
    icon: <BiBookHeart />
  },
  {
    title: "Dieta",
    path: "/diet",
    icon: <FaCarrot />
  },
  {
    title: "Lodówka",
    path: "/fridge",
    icon: <RiFridgeLine />
  },
  {
    title: "Zakupy",
    path: "/shoping",
    icon: <FiShoppingBag />
  },
  {
    title: "Produkty",
    path: "/products",
    icon: <FiList />
  },
  { title: "Konto", path: "/account", icon: <AiOutlineUser /> }
];
