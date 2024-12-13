import { useRouter } from "next/router";
import React from "react";

interface AddNavbarButtonsProps {
  onClick: () => void;
  AutoADDForm: () => void;
  close: () => void;
}
export default function AddNavbarButtons({
  onClick,
  close,
  AutoADDForm,
}: AddNavbarButtonsProps) {
  const router = useRouter();

  return (
    <>
      <div className="" onClick={close}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="white"
          onClick={router.pathname === "/invoice" ? onClick : AutoADDForm}
          className="size-10 p-2 cursor-pointer rounded-full hover:bg-[#313538] transition-colors duration-200"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
      </div>
    </>
  );
}
