import React, { useState, useEffect } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

interface Item {
  item: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export default function Invoice() {
  const [currentDate, setCurrentDate] = useState<string>("");
  const [companyName, setCompanyName] = useState<string>("");
  const [companyAddress, setCompanyAddress] = useState<string>("");
  const [customerName, setCustomerName] = useState<string>("");
  const [customerAddress, setCustomerAddress] = useState<string>("");
  const [invoiceNumber, setInvoiceNumber] = useState<string>("INV-12345");
  const [items, setItems] = useState<Item[]>([]);
  const [kdv, setKdv] = useState<number>(18);
  const [totalAmount, setTotalAmount] = useState<number>(0);

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

  const generatePDF = () => {
    const input = document.getElementById("invoice") as HTMLElement;
    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = (pdfHeight - imgHeight * ratio) / 2;
      pdf.addImage(
        imgData,
        "PNG",
        imgX,
        imgY,
        imgWidth * ratio,
        imgHeight * ratio
      );
      pdf.save("invoice.pdf");
    });
  };

  return (
    <>
      <div className="wfull h-full">
        <div className="min-w-full min-h-screen  flex absolute z-50 justify-center items-center">
          <div
            className="w-2/3 h-full bg-white rounded-lg shadow-lg  p-5"
            id="invoice"
          >
            <div className="w-full flex justify-between items-center mb-8">
              <div>
                <h1 className="text-2xl font-bold">Invoice</h1>
              </div>
              <div className="text-right">
                <p className="text-gray-700">Invoice Number: {invoiceNumber}</p>
                <div className="mt-4">
                  <div className="w-24 h-24 bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-500">QR Code</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="mb-8">
              <label className="block text-gray-700 mb-1">Date</label>
              <input
                type="date"
                value={currentDate}
                placeholder="Date"
                onChange={(e) => setCurrentDate(e.target.value)}
                className="bg-transparent  text-black w-44 p-2  rounded-md  focus:outline-none  focus:border-transparent no-print"
              />
              <p className="print-only">{currentDate}</p>
            </div>
            <div className="mb-8">
              <label className="block text-gray-700 mb-1">Company Name</label>
              <input
                type="text"
                placeholder="Your Company Name"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="bg-transparent text-black w-80 p-2 rounded-md  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent no-print"
              />
              <p className="print-only">{companyName}</p>
            </div>
            <div className="mb-8">
              <label className="block text-gray-700 mb-1">
                Company Address
              </label>
              <textarea
                placeholder="Your Company Address"
                value={companyAddress}
                onChange={(e) => setCompanyAddress(e.target.value)}
                className="bg-tranparent w-80 resize-none text-black p-2 h-36 rounded-md  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent no-print"
              />
              <p className="print-only">{companyAddress}</p>
            </div>
            <div className="mb-8">
              <label className="block text-gray-700 mb-1">Customer Name</label>
              <input
                type="text"
                placeholder="Customer Name"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="bg-transparent w-80 p-2  text-black   rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent no-print"
              />
              <p className="print-only">{customerName}</p>
            </div>
            <div className="mb-8">
              <label className="block text-gray-700 mb-1">
                Customer Address
              </label>
              <textarea
                placeholder="Customer Address"
                value={customerAddress}
                onChange={(e) => setCustomerAddress(e.target.value)}
                className="w-80 p-2 resize-none  text-black  rounded-md  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent no-print"
              />
              <p className="print-only">{customerAddress}</p>
            </div>
            <table className="min-w-full bg-white text-black">
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
                        placeholder="Item"
                        value={item.item}
                        onChange={(e) =>
                          handleItemChange(index, "item", e.target.value)
                        }
                        className="bg-gray-100 w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent no-print"
                      />
                      <p className="print-only">{item.item}</p>
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
                        className="bg-gray-100 w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent no-print"
                      />
                      <p className="print-only">{item.quantity}</p>
                    </td>
                    <td className="py-2 px-4 border-b border-gray-300 text-left">
                      <input
                        type="number"
                        value={item.unitPrice}
                        placeholder="Unit Price"
                        onChange={(e) =>
                          handleItemChange(
                            index,
                            "unitPrice",
                            parseFloat(e.target.value)
                          )
                        }
                        className="bg-gray-100 w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent no-print"
                      />
                      <p className="print-only">
                        {formatCurrency(item.unitPrice)}
                      </p>
                    </td>
                    <td className="py-2 px-4 border-b border-gray-300 text-left">
                      {formatCurrency(item.total)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex gap-6 justify-end mt-8">
              <button
                onClick={handleAddItem}
                className="bg-green-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 no-print"
              >
                Add Item
              </button>
              <button
                onClick={generatePDF}
                className="bg-amber-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-amber-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 no-print"
              >
                Generate PDF
              </button>
            </div>
            <div className="flex justify-end mt-8">
              <div className="w-1/3">
                <label className="block text-gray-700 mb-1">KDV (%)</label>
                <input
                  type="number"
                  placeholder="KDV"
                  value={kdv}
                  className=" text-black w-full p-2 bg-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent no-print"
                />
                <p className="print-only">{kdv}%</p>
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <div className="w-1/3">
                <label className="block text-gray-700 mb-1">Total Amount</label>
                <input
                  type="text"
                  placeholder="Total Amount"
                  value={formatCurrency(totalAmount)}
                  readOnly
                  className="bg-tranparent  text-black w-full p-2   rounded-md  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <p className="print-only">{formatCurrency(totalAmount)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
