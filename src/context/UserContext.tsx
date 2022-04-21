import React, { createContext, useContext, useEffect, useState } from "react";
import { getFromStorage, setToStorage } from "src/common/utils/localStorage";

interface UserContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  user: { userId: string; email: string };
  setUser: ({ userId, email }: { userId: string; email: string }) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState({ userId: "", email: "" });
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (!isLoggedIn && user.userId === "" && user.email === "") {
      const userId = getFromStorage<string>("userid") ?? "";
      const email = getFromStorage<string>("email") ?? "";
      setUser({ userId, email });
      if (userId && email) {
        setIsLoggedIn(true);
      }
    }
    setToStorage("userid", user.userId);
    setToStorage("email", user.email);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn]);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        isLoggedIn,
        setIsLoggedIn
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const ctx = useContext(UserContext);

  if (!ctx) {
    throw new Error("Missing userContext, it's not wrapped in UserProvider");
  }
  return ctx;
};
