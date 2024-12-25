import React from "react";
import CardTable from "../Card/CardTable";
import { useADDNavbar } from "@/context/AddNavbarContext";
import FormInput from "../TextArea/FormInput";

interface EmployersProps {
  data: {
    data: {
      tbody_one: string;
      tbody_two: string;
      tbody_three: string;
      tbody_four: string;
      tbody_five?: string;
      tbody_six?: string;
      tbody_eight?: string;
    }[];
  };
}

const EmployersPage = ({ data }: EmployersProps) => {
  const { showAddI, showAdd } = useADDNavbar();

  return (
    <>
      {showAdd && (
        <FormInput
          fields="Employers"
          textOne="Name"
          textTwo="Role"
          textThree="Phone/Email"
          textFour="Salary"
          close={showAddI}
        />
      )}
      <div className="p-10 w-full min-h-screen">
        <h1 className="text-2xl font-bold hover:underline">{"Employers"}</h1>
        <CardTable
          thead_one="Name"
          thead_two="Phone Number"
          thead_three="Salary"
          thead_four="Email"
          data={{
            data: data.data.map((item) => ({
              tbody_one: item.tbody_one,
              tbody_two: item.tbody_two,
              tbody_three: item.tbody_three,
              tbody_four: item.tbody_four,
            })),
          }}
        />
      </div>
    </>
  );
};

export default EmployersPage;
