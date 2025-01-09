import { useADDNavbar } from "@/context/AddNavbarContext";
import React from "react";
import FormInput from "../TextArea/FormInput";
import CardTable from "../Card/CardTable";

export default function ProductsPage() {
  const { showAddI, showAdd } = useADDNavbar();
  return (
    <>
      {showAdd && (
        <FormInput
          fields="Products"
          close={showAddI}
          textOne="Name"
          textTwo="Price"
          textThree="Description"
        />
      )}
      <div className="p-10 w-full min-h-screen">
        <h1 className="text-2xl font-bold hover:underline">{"Products"}</h1>
        <CardTable
          thead_one="Products Name"
          thead_two="Price"
          thead_three="Description"
          thead_four="Version"
          data={[]}
        />
      </div>
    </>
  );
}
