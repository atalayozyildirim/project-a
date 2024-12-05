import React from "react";
import CardTable from "../Card/CardTable";

export default function InvoicePages() {
  return (
    <>
      <div className="min-h-screen w-full p-10">
        <h1 className="text-2xl font-bold hover:underline">Invoices</h1>
        <CardTable
          thead_one="Id"
          thead_two="Customer"
          thead_three="Created On"
          thead_four="Issue Date"
          thead_five="Status"
          thead_six="Amount"
          thead_eight="Due Date"
        />
      </div>
    </>
  );
}
