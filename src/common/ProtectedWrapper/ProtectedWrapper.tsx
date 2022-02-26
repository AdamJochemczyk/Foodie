import { useRouter } from "next/router";
import React from "react";
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
  if (isLoading) {
    <div>loading...</div>;
  }
  if (isError) {
    router.push("/auth/sign-in");
  }
  if (!isLoading && adminRestrictions && data?.usertype !== "admin") {
    router.push("/auth/sign-in");
  }
  return <div>{children}</div>;
};
