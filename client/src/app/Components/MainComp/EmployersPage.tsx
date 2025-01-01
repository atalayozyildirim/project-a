import React from "react";
import { useADDNavbar } from "@/context/AddNavbarContext";
import FormInput from "../TextArea/FormInput";
import CardTable from "../Card/CardTable";
import { useFormContext } from "@/context/FormContext";

interface EmployersProps {
  data: {
    data: {
      _id?: string;
      name: string;
      surname: string;
      role: string;
      phoneNumber: string;
      Salary: string;
      email: string;
    }[];
  };
}

const EmployersPage = ({ data }: EmployersProps) => {
  const { showAddI, showAdd } = useADDNavbar();

  const { dataForm } = useFormContext();

  console.log(dataForm)
  return (
    <>
      {showAdd && (
        <FormInput
          fields="Employers"
          textOne="Name"
          textTwo="Surname"
          textThree="Role"
          textFour="Phone Number"
          textFive="Salary"
          textSix="Email"
          close={showAddI}
        />
      )}
      <div className="p-10 w-full min-h-screen">
        <h1 className="text-2xl font-bold hover:underline">{"Employers"}</h1>
        <CardTable
          thead_one="Name"
          thead_two="Role"
          thead_three="Phone/Email"
          thead_four="Salary"
          data={
            data &&
            data.data.map((item) => {
              return {
                tbody_id: item._id || "",
                tbody_one: item.name + " " + item.surname,
                tbody_two: item.role,
                tbody_three: `${item.phoneNumber} / ${item.email}`,
                tbody_four: item.Salary,
              };
            })
          }
        />
      </div>
    </>
  );
};

export default EmployersPage;
