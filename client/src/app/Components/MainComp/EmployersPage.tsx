import React from "react";
import CardTable from "../Card/CardTable";
import { useADDNavbar } from "@/context/AddNavbarContext";
import FormInput from "../TextArea/FormInput";

interface EmployersData {
  name: string;
  role: string;
  email: string;
  Salary: string;
  filed: string;
}

interface EmployersProps {
  data: EmployersData[];
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
          data={data.map((item) => ({
            tbody_one: item.name,
            tbody_two: item.role,
            tbody_three: item.Salary.toString(),
            tbody_four: item.email,
            tbody_five: item.filed,
          }))}
        />
      </div>
    </>
  );
};

export default EmployersPage;
