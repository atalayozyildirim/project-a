import React from "react";

export const OrdersPage = () => {
  return (
    <>
      <div className="min-h-screen w-full p-10">
        <h1 className="text-2xl font-bold hover:underline">Detail</h1>
        <div className="mt-5">
          <table className="table-auto w-full rounded-md">
            <thead className="border border-[#27272a]  text-white">
              <tr>
                <th className="px-4 py-2 text-left">Order-Id</th>
                <th className="px-4 py-2 text-left w-1/3">User Id</th>
                <th className="px-4 py-2 text-left">Products Id</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">V</th>
              </tr>
            </thead>
            <tbody></tbody>
          </table>
        </div>
      </div>
    </>
  );
};
