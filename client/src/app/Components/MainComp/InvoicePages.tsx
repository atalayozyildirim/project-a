import React from "react";
import CardTable from "../Card/CardTable";

interface Products {
  name: string;
  quantity: number;
  price: number;
}
interface InvoicePagesProps {
  data: {
    data: {
      _id: string;
      invoiceNumber: string;
      customerName: string;
      customerEmail: string;
      invoiceDate: string;
      dueDate: string;
      products: Products[];
      totalAmount: string;
      status: "paid" | "unpaid" | "overdue";
    }[];
  };
}
export default function InvoicePages({ data }: InvoicePagesProps) {
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
          data={
            data.data &&
            data.data.map((item) => {
              return {
                tbody_id: item._id,
                tbody_one: item.invoiceNumber,
                tbody_two: item.customerName,
                tbody_three: item.invoiceDate,
                tbody_four: item.dueDate,
                tbody_five: item.status,
                tbody_six: item.totalAmount,
                tbody_eight: item.dueDate,
              };
            })
          }
        />
      </div>
    </>
  );
}
