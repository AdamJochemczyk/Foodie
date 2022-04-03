import { BiBookHeart } from "react-icons/bi";
import { RiFridgeLine } from "react-icons/ri";
import { FaCarrot } from "react-icons/fa";
import { AiOutlineUser } from "react-icons/ai";
import { FiShoppingBag, FiList } from "react-icons/fi";

export const sidebarData = [
  {
    title: "Recipes",
    path: "/recipes",
    icon: <BiBookHeart />
  },
  {
    title: "Diet",
    path: "/diet",
    icon: <FaCarrot />
  },
  {
    title: "Fridge",
    path: "/fridge",
    icon: <RiFridgeLine />
  },
  {
    title: "Shopping",
    path: "/shopping",
    icon: <FiShoppingBag />
  },
  {
    title: "Products",
    path: "/products",
    icon: <FiList />
  },
  { title: "Account", path: "/account", icon: <AiOutlineUser /> }
];
