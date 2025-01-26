import { useADDNavbar } from "@/context/AddNavbarContext";
import React from "react";
import FormInput from "../TextArea/FormInput";
import CardTable from "../Card/CardTable";

interface Products {
  id: string;
  name: string;
  price: string;
  description: string;
  v: string;
}
interface Props {
  data: Products[];
}
export default function ProductsPage({ data }: Props) {
  const { showAddI, showAdd } = useADDNavbar();
  return (
    <>
      {showAdd && (
        <FormInput
          fields="Products"
          close={showAddI}
          textOne="Name"
          textTwo="Description"
          textThree="Price"
        />
      )}
      <div className="p-10 w-full min-h-screen">
        <h1 className="text-2xl font-bold hover:underline">{"Products"}</h1>
        <CardTable
          thead_one="Products Name"
          thead_two="Description"
          thead_three="Price"
          thead_four="Version"
          data={data.map((item: Products) => {
            return {
              tbody_id: item.id,
              tbody_one: item.name,
              tbody_two: item.description,
              tbody_three: item.price,
              tbody_four: item.v,
            };
          })}
        />
      </div>
    </>
  );
}
