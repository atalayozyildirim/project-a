import React from "react";

interface AddNavbarButtonsProps {
  setShow: () => void;
}

export default function AddNavbarButtons({ setShow }: AddNavbarButtonsProps) {
  return (
    <>
      <div className="">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="white"
          onClick={setShow}
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
