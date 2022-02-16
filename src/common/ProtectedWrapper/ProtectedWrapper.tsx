import { useRouter } from "next/router";
import React from "react";
import { useUser } from "../../utils/useUser";

export const ProtectedWrapper = ({
  children
}: {
  children: React.ReactNode;
}) => {
  const router = useRouter();
  const { isLoading, isError } = useUser();
  if (isLoading) {
    <div>loading...</div>;
  }
  if (isError) {
    router.push("/auth/sign-in");
  }
  return <div>{children}</div>;
};
