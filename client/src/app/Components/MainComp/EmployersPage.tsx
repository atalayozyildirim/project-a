import React from "react";
import { useADDNavbar } from "@/context/AddNavbarContext";
import FormInput from "../TextArea/FormInput";
import CardTable from "../Card/CardTable";
import { useFormContext } from "@/context/FormContext";

interface Employers {
  _id?: string;
  name: string;
  surname: string;
  role: string;
  phoneNumber: string;
  Salary: number;
  email: string;
  filed: string;
}

interface EmployersProps {
  data: {
    data: Employers[];
  };
}
const EmployersPage = ({ data }: EmployersProps) => {
  const { showAddI, showAdd } = useADDNavbar();

  const { dataForm } = useFormContext();

  const filterData = dataForm.filter(
    (item): item is Employers =>
      "name" in item &&
      "surname" in item &&
      "role" in item &&
      "phoneNumber" in item &&
      "Salary" in item &&
      "email" in item &&
      "filed" in item
  );

  const newData = [...data.data, ...filterData];
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
            newData.map((item) => {
              return {
                tbody_id: item._id || "",
                tbody_one: item.name + " " + item.surname,
                tbody_two: item.role,
                tbody_three: `${item.phoneNumber} / ${item.email}`,
                tbody_four: item.Salary.toString(),
              };
            })
          }
        />
      </div>
    </>
  );
};

export default EmployersPage;
