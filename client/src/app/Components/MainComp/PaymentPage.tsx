import React from "react";
import PaymentCard from "../Card/PaymentCard";

export default function PaymentPage() {
  return (
    <>
      <div className="p-10 w-full  min-h-screen">
        <h1 className="text-2xl  font-bold hover:underline">Payment System</h1>
        <div>
          <PaymentCard />
        </div>
      </div>
    </>
  );
}
