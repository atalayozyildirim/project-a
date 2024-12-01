import React from "react";
import Link from "next/link";

interface Props {
  href: string;
  name?: string;
  comp: React.ReactNode;
}

const NavbarButton = ({ href, comp }: Props) => {
  return (
    <>
      <div
        className={
          "w-10 h-10 rounded-full bg-[#171717] flex items-center justify-center shadow-lg"
        }
      >
        <Link
          href={href}
          className={"flex items-center justify-center w-full h-full"}
        >
          {comp}
        </Link>
      </div>
    </>
  );
};

export default NavbarButton;
