import React from "react";
import { Layout } from "@/app/Components/Layout/Layout";
import PaymentPage from "@/app/Components/MainComp/PaymentPage";
import "./../style/globals.css";
export default function payment() {
  return (
    <>
      <Layout>
        <PaymentPage />
      </Layout>
    </>
  );
}
