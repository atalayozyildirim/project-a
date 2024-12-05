import React from "react";
import CardTable from "../Card/CardTable";

const EmployersPage = () => {
  return (
    <div className="p-10 w-full  min-h-screen">
      <h1 className="text-2xl  font-bold hover:underline">Employers</h1>

      <CardTable
        thead_one="Name"
        thead_two="Role"
        thead_three="Phone/Email"
        thead_four="Salary"
      />
    </div>
  );
};

export default EmployersPage;
