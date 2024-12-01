import CardTable from "../Card/CardTable";

export default function CustomerPage() {
  return (
    <>
      <div className="min-h-screen p-10">
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
