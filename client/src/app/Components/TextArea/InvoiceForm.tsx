import React, { useState, useEffect } from "react";

interface InvoiceFormProps {
  close: () => void;
}

interface Item {
  item: string;
  quantity: number;
  unitPrice: number;
  total: number;
}
export default function InvoiceForm({ close }: InvoiceFormProps) {
  const [data, setData] = useState({});
  const [currentDate, setCurrentDate] = useState<string>("");
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [kdv, setKdv] = useState<number>(18);
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0];
    setCurrentDate(formattedDate);
  }, []);

  const handleAddItem = () => {
    setItems([...items, { item: "", quantity: 0, unitPrice: 0, total: 0 }]);
  };

  const handleItemChange = (
    index: number,
    field: string,
    value: string | number
  ) => {
    const newItems = [...items];

    newItems[index] = { ...newItems[index], [field]: value };

    if (field === "quantity" || field === "unitPrice") {
      newItems[index].total =
        newItems[index].quantity * newItems[index].unitPrice;
    }
    setItems(newItems);
    calculateTotalAmount(newItems);
  };

  const calculateTotalAmount = (items: Item[]) => {
    const total = items.reduce((acc, item) => acc + item.total, 0);
    setTotalAmount(total + (total * kdv) / 100);
  };
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  return (
    <>
      <div className="min-w-full h-screen flex fixed  -ml-36 -mt-36 z-50 justify-center items-center bg-transparent bg-opacity-50 backdrop-blur">
        <div
          className="denem w-2/3 h-4/5 bg-[#171c1e] z-50 rounded-lg overflow-y-auto"
          id="invoice"
        >
          <div className="w-full p-5 flex justify-end items-end">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6 cursor-pointer"
              onClick={close}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          <div className="w-full p-5 h-full">
            <div className="flex items-center gap-5 justify-center">
              <div>
                <label htmlFor="">Customer</label>
                <input
                  type="text"
                  placeholder="Customer"
                  onChange={(e) =>
                    setData({ ...data, customer: e.target.value })
                  }
                  className="bg-[#141517] w-full max-w-md p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label>TC</label>
                <input
                  type="number"
                  max={"11"}
                  placeholder="tc"
                  onChange={(e) => setData({ ...data, tc: e.target.value })}
                  className="bg-[#141517] w-full max-w-md p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label htmlFor="">Number # {"(Auto )"}</label>
                <input
                  type="number"
                  placeholder="Number"
                  disabled={true}
                  onChange={(e) => setData({ ...data, number: e.target.value })}
                  className="bg-[#141517] w-full max-w-md p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label>Address</label>
                <input
                  type="text"
                  placeholder="Address"
                  onChange={(e) =>
                    setData({ ...data, address: e.target.value })
                  }
                  className="bg-[#141517] w-full max-w-md p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label>Status</label>
                <input
                  type="text"
                  placeholder="status"
                  onChange={(e) => setData({ ...data, status: e.target.value })}
                  className="bg-[#141517] w-full max-w-md p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex p-2 gap-5 mt-8 justify-center">
              <div>
                <label htmlFor="Note"> Note </label>
                <input
                  type="text"
                  placeholder="Note"
                  className="bg-[#141517] w-full max-w-md p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label htmlFor="Date"> Date </label>
                <input
                  type="date"
                  value={currentDate}
                  onChange={(e) => setCurrentDate(e.target.value)}
                  placeholder="Date"
                  className="bg-[#141517] w-full max-w-md p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <br />
            <div className="w-full gap-5 flex flex-row justify-end p-10 items-center">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z"
                  />
                </svg>
              </div>
              <div className="cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                  />
                </svg>
              </div>
              <div className="hover:underline cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  onClick={handleAddItem}
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
              </div>
            </div>
            <table className="min-w-full bg-[#171c1e] text-white">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b border-gray-300 text-left">
                    Item
                  </th>
                  <th className="py-2 px-4 border-b border-gray-300 text-left">
                    Quantity
                  </th>
                  <th className="py-2 px-4 border-b border-gray-300 text-left">
                    Unit Price
                  </th>
                  <th className="py-2 px-4 border-b border-gray-300 text-left">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <tr key={index}>
                    <td className="py-2 px-4 border-b border-gray-300 text-left">
                      <input
                        type="text"
                        value={item.item}
                        placeholder="Item"
                        onChange={(e) =>
                          handleItemChange(index, "item", e.target.value)
                        }
                        className="bg-[#141517] w-full p-2  rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </td>
                    <td className="py-2 px-4 border-b border-gray-300 text-left">
                      <input
                        type="number"
                        value={item.quantity}
                        placeholder="Quantity"
                        onChange={(e) =>
                          handleItemChange(
                            index,
                            "quantity",
                            parseInt(e.target.value)
                          )
                        }
                        className="bg-[#141517] w-full p-2  rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 outline-none focus:border-transparent"
                      />
                    </td>
                    <td className="py-2 px-2 border-b border-gray-300 text-left">
                      <input
                        type="number"
                        placeholder="Unit Price"
                        value={item.unitPrice}
                        onChange={(e) =>
                          handleItemChange(
                            index,
                            "unitPrice",
                            parseFloat(e.target.value)
                          )
                        }
                        className="bg-[#141517] w-full p-2  rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 outline-none focus:border-transparent"
                      />
                    </td>
                    <td className="py-2 px-4 border-b  text-left">
                      {item.total}
                    </td>
                    <td className="py-2 px-4 border-b border-gray-300 text-left">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6 cursor-pointer"
                        onClick={() => {
                          const newItems = items.filter((_, i) => i !== index);
                          setItems(newItems);
                          calculateTotalAmount(newItems);
                        }}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex flex-wrap flex-col  gap-5 mt-10 justify-end items-end">
              <div className="w-36 max-w-md">
                <label className="block text-gray-300 mb-1">KDV (%)</label>
                <input
                  type="number"
                  value={kdv}
                  onChange={(e) => setKdv(parseInt(e.target.value))}
                  placeholder="KDV"
                  className="bg-[#141517] w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="w-36 max-w-md">
                <label className="block text-gray-300 mb-1">Total Amount</label>
                <input
                  type="text"
                  value={formatCurrency(totalAmount)}
                  placeholder="Total Amount"
                  readOnly
                  className="bg-[#141517] w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="w-full flex justify-center">
                <button className="bg-amber-400 hover:bg-amber-200 text-white font-bold py-2 px-4 rounded">
                  Save
                </button>
              </div>
              <div className="h-16"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
