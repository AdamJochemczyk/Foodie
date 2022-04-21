import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useUser } from "../../utils/useUser";
import { SplashScreen } from "../SplashScreen/SplashScreen";

export const ProtectedWrapper = ({
  children,
  adminRestrictions = false
}: {
  children: React.ReactNode;
  adminRestrictions?: boolean;
}) => {
  const router = useRouter();
  const { data, isLoading, isError, setIsLoggedIn } = useUser();
  useEffect(() => {
    if ((!isLoading && !data) || isError) {
      router.push("/");
    }
    if (!isLoading && adminRestrictions && data?.usertype !== "admin") {
      setIsLoggedIn(false);
      router.push("/auth/sign-in");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);
  if (isLoading) {
    return <SplashScreen />;
  }
  return <div>{children}</div>;
};
