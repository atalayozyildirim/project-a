import { useADDNavbar } from "@/context/AddNavbarContext";
import CardTable from "../Card/CardTable";
import FormInput from "../TextArea/FormInput";

export default function CustomerPage() {
  const { showAddI, showAdd } = useADDNavbar();
  return (
    <>
      {showAdd && (
        <FormInput
          fields="Customers"
          textOne="Name"
          textTwo="Email"
          textThree="Phone"
          textFour="Company"
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
          data={[
            {
              thead_one: "John Doe",
              thead_two: "asfas",
              thead_three: "123456789",
              thead_four: "Company A",
            },
            {
              thead_one: "Jane Doe",
              thead_two: "asfas",
              thead_three: "123456789",
              thead_four: "Company B",
            },
            {
              thead_one: "John Doe",
              thead_two: "asfas",
              thead_three: "123456789",
              thead_four: "Company A",
            },
            {
              thead_one: "Jane Doe",
              thead_two: "asfas",
              thead_three: "123456789",
              thead_four: "Company B",
            },
            {
              thead_one: "John Doe",
              thead_two: "asfas",
              thead_three: "123456789",
              thead_four: "Company A",
            },
            {
              thead_one: "Jane Doe",
              thead_two: "asfas",
              thead_three: "123456789",
              thead_four: "Company B",
            },
          ]}
        />
      </div>
    </>
  );
}
