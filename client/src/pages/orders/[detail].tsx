import { Layout } from "@/app/Components/Layout/Layout";
import { useRouter } from "next/router";
import React from "react";
import "./../style/globals.css";

export const OrdersDetail = () => {
  const router = useRouter();
  const { detail } = router.query;
  return (
    <>
      <Layout>
        <div className="min-h-screen w-full p-10">
          <div className="flex flex-row gap-2 w-full h-auto">
            <div className="border-2 border-[#25272c] shadow-xl w-1/3 h-auto">
              <h1>Orders Detail - {detail}</h1>
            </div>
            <div className="border-2 border-[#25272c] w-10/12 h-1/2 shadow-xl">
              {/* <OrdersDetail /> */}
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};
