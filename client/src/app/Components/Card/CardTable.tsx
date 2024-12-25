/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from "react";
import { useRouter } from "next/router";

interface CardTableProps {
  thead_one: string;
  thead_two: string;
  thead_three: string;
  thead_four: string;
  thead_five?: string;
  thead_six?: string;
  thead_eight?: string;
  data: {
    data: {
      tbody_one: string;
      tbody_two: string;
      tbody_three: string;
      tbody_four: string;
      tbody_five?: string;
      tbody_six?: string;
      tbody_eight?: string;
    }[];
  };
  children?: React.ReactNode;
}

export default function CardTable({
  thead_one,
  thead_two,
  thead_three,
  thead_four,
  thead_five,
  thead_six,
  thead_eight,
  data,
}: CardTableProps) {
  const router = useRouter();

  const d = () => {
    data.data.map((item) => {
      console.log(item.tbody_one);
    });
  };

  d();
  return (
    <>
      <div className="w-full ml-1- mt-5 bg-transparent min-h-screen justify-center items-center">
        <div className="overflow-x-auto">
          <table className="min-w-full text-white rounded-xl">
            <thead className="bg-[#141517]">
              <tr>
                <th className="py-2 px-4 text-left">{thead_one}</th>
                <th className="py-2 px-4 text-left">{thead_two}</th>
                <th className="py-2 px-4 text-left">{thead_three}</th>
                <th className="py-2 px-4 text-left">{thead_four}</th>
                {router.pathname === "/invoice" && (
                  <>
                    <th className="py-2 px-4 text-left">{thead_five}</th>
                    <th className="py-2 px-4 text-left">{thead_six}</th>
                    <th className="py-2 px-4 text-left">{thead_eight}</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody className="atalay">
              {data.data &&
                data?.data.map((item, index) => (
                  <tr key={index} className="hover:bg-[#141517]">
                    <td className="py-2 px-4">{item.tbody_one}</td>
                    <td className="py-2 px-4">{item.tbody_two}</td>
                    <td className="py-2 px-4">{item.tbody_three}</td>
                    <td className="py-2 px-4">{item.tbody_four}</td>
                    {router.pathname === "/invoice" && (
                      <>
                        <td className="py-2 px-4">{item.tbody_five}</td>
                        <td className="py-2 px-4">{item.tbody_six}</td>
                        <td className="py-2 px-4">{item.tbody_eight}</td>
                      </>
                    )}
                    {router.pathname === "/customers" && (
                      <td className="py-2 px-4">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="size-6 cursor-pointer"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </td>
                    )}
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
