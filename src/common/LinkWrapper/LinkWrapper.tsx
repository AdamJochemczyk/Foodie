import React from "react";
import Link from "next/link";

export const LinkWrapper = ({
  link,
  children
}: {
  link: string;
  children: React.ReactNode;
}) => (
  <Link href={link} passHref>
    <a>{children}</a>
  </Link>
);
