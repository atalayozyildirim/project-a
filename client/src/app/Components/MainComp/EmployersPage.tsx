import React from "react";
import CardTable from "../Card/CardTable";

const EmployersPage = () => {
  return (
    <div className="p-10  min-h-screen">
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
