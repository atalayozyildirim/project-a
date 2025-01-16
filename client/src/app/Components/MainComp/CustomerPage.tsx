import React from "react";
import { useFormContext } from "@/context/FormContext";
import CardTable from "../Card/CardTable";
import FormInput from "../TextArea/FormInput";
import { useADDNavbar } from "@/context/AddNavbarContext";

interface Customer {
  _id?: string;
  name: string;
  surname: string;
  company: string;
  phoneNumber: string;
  email: string;
}

interface CustomersProps {
  data: Customer[];
}

export default function CustomerPage({ data }: CustomersProps) {
  const { showAddI, showAdd } = useADDNavbar();
  const { dataForm } = useFormContext();

  const filteredDataForm = dataForm.filter(
    (item): item is Customer =>
      "name" in item &&
      "surname" in item &&
      "company" in item &&
      "phoneNumber" in item &&
      "email" in item
  );

  const transformData = [...data, ...filteredDataForm];

  return (
    <>
      {showAdd && (
        <FormInput
          fields="Customers"
          textOne="Name"
          textTwo="Surname"
          textThree="Company"
          textFour="Email"
          textFive="Phone Number"
          close={showAddI}
        />
      )}
      <div className="min-h-screen  w-full p-10">
        <h1 className="text-2xl font-bold hover:underline">Customers</h1>
        <CardTable
          thead_one="Name"
          thead_two="Email"
          thead_three="Phone"
          thead_four="Company"
          data={transformData.map((item) => {
            return {
              tbody_id: item._id || "",
              tbody_one: item.name + " " + item.surname,
              tbody_two: item.email,
              tbody_three: item.phoneNumber,
              tbody_four: item.company,
            };
          })}
        />
      </div>
    </>
  );
}
