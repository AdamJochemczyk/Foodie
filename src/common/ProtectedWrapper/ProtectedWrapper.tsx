import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useUser } from "../../utils/useUser";

export const ProtectedWrapper = ({
  children,
  adminRestrictions = false
}: {
  children: React.ReactNode;
  adminRestrictions?: boolean;
}) => {
  const router = useRouter();
  const { data, isLoading, isError } = useUser();
  useEffect(() => {
    if (isError) {
      router.push("/auth/sign-in");
    }
    if (!isLoading && adminRestrictions && data?.usertype !== "admin") {
      router.push("/auth/sign-in");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  if (isLoading) {
    return <div>loading...</div>;
  }
  return <div>{children}</div>;
};
