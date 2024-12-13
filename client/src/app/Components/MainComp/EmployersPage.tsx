import React, { useEffect } from "react";
import CardTable from "../Card/CardTable";
import { useADDNavbar } from "@/context/AddNavbarContext";
import FormInput from "../TextArea/FormInput";

const EmployersPage = () => {
  const { showAddI, showAdd } = useADDNavbar();

  useEffect(() => {
    console.log("EmployersPage", showAdd);
  }, [showAdd]);
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
      <div className="p-10 w-full  min-h-screen">
        <h1 className="text-2xl  font-bold hover:underline">{"Employers "}</h1>

        <CardTable
          thead_one="Name"
          thead_two="Role"
          thead_three="Phone/Email"
          thead_four="Salary"
        />
      </div>
    </>
  );
};

export default EmployersPage;
