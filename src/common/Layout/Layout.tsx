import React, { useCallback, useState } from "react";
import styles from "./Layout.module.css";
import { FaBars } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import clsx from "clsx";
import { IconContext } from "react-icons/lib";
import { sidebarData } from "./sideardata";
import { FiLogOut } from "react-icons/fi";
import { RiAdminLine } from "react-icons/ri";
import Image from "next/image";
import { useLogout } from "../../modules/Auth/hooks/useLogout";
import { LinkWrapper } from "../LinkWrapper/LinkWrapper";
import { useUser } from "src/utils/useUser";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const [sidebar, setSidebar] = useState(false);
  const logoutMutation = useLogout();
  const { data } = useUser();

  const toggleSidebar = useCallback(() => setSidebar(sidebar => !sidebar), []);
  const handleLogout = useCallback(
    () => logoutMutation.mutate(),
    [logoutMutation]
  );

  return (
    <>
      <IconContext.Provider value={{ color: "#fff", size: "2rem" }}>
        <div className={clsx(styles.navbar, styles.menuBars)}>
          <FaBars onClick={toggleSidebar} />
        </div>
        <nav
          className={clsx(styles.navMenu, {
            [styles.active]: sidebar
          })}
        >
          <ul className={styles.navMenuItems} onClick={toggleSidebar}>
            <li className={clsx(styles.navbarToggle, styles.menuBars)}>
              <AiOutlineClose />
              <Image
                src="/static/icons/Foodie-nav.svg"
                height={24}
                width={130}
                alt="Foodie"
              />
            </li>
            {sidebarData.map(({ title, path, icon }) => {
              return (
                <LinkWrapper key={title} link={path}>
                  <li className={styles.navText}>
                    {icon}
                    <span>{title}</span>
                  </li>
                </LinkWrapper>
              );
            })}
            {data?.usertype === "admin" ? (
              <LinkWrapper link="/admin-panel">
                <li className={styles.navText}>
                  <RiAdminLine />
                  <span>Admin panel</span>
                </li>
              </LinkWrapper>
            ) : null}
            <li className={styles.navText} onClick={handleLogout}>
              <FiLogOut />
              <span>Wyloguj się</span>
            </li>
          </ul>
        </nav>
      </IconContext.Provider>
      {children}
    </>
  );
};
