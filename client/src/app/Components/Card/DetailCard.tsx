import React from "react";

interface DetailCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
}

export const DetailCard = ({ icon, title, value }: DetailCardProps) => {
  return (
    <>
      <div className="w-52 min-h-24 flex flex-col gap-2 p-4 bg-[#141517] rounded-xl shadow-md">
        <div className="flex flex-row justify-start items-center gap-2">
          {title}
        </div>
        <div>
          <div className="flex flex-row justify-start items-center gap-2">
            {icon}
            <div className="dark:text-white">{value}</div>
          </div>
        </div>
      </div>
    </>
  );
};
