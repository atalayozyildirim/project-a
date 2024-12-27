import { useADDNavbar } from "@/context/AddNavbarContext";
import CardTable from "../Card/CardTable";
import FormInput from "../TextArea/FormInput";

interface CustomersProps {
  data: {
    data: {
      name: string;
      surname: string;
      company: string;
      phoneNumber: string;
      email: string;
    }[];
  };
}

export default function CustomerPage({ data }: CustomersProps) {
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
          data={
            data.data &&
            data.data.map((item) => {
              return {
                tbody_one: item.name + " " + item.surname,
                tbody_two: item.email,
                tbody_three: item.phoneNumber,
                tbody_four: item.company,
              };
            })
          }
        />
      </div>
    </>
  );
}
