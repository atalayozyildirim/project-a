import { useRouter } from "next/router";
interface CardTableProps {
  thead_one: string;
  thead_two: string;
  thead_three: string;
  thead_four: string;
  thead_five?: string;
  data?: {
    thead_one: string;
    thead_two: string;
    thead_three: string;
    thead_four: string;
    thead_five?: string;
  }[];
  children?: React.ReactNode;
}

export default function CardTable({
  thead_one,
  thead_two,
  thead_three,
  thead_four,
  thead_five,
  data,
}: CardTableProps) {
  const router = useRouter();

  return (
    <>
      <div className="w-full ml-1 mt-5 bg-transparent min-h-screen justify-center items-center">
        <div className="overflow-x-auto">
          <table className="min-w-full text-white rounded-xl ">
            <thead className="">
              <tr>
                <th className="py-2 px-4 text-left w-1/5">{thead_one}</th>
                <th className="py-2 px-4 text-left w-1/5">{thead_two}</th>
                <th className="py-2 px-4 text-left w-1/5">{thead_three}</th>
                <th className="py-2 px-4 text-left w-1/5">{thead_four}</th>
                {router.pathname === "/invoice" ? (
                  <th className="py-2 px-4 text-left w-1/5">{thead_five}</th>
                ) : null}
              </tr>
            </thead>
            <tbody className="">
              {data?.map((item, index) => (
                <tr key={index} className="hover:bg-gray-800">
                  <td className="py-2 px-4">{item.thead_one}</td>
                  <td className="py-2 px-4">{item.thead_two}</td>
                  <td className="py-2 px-4">{item.thead_three}</td>
                  <td className="py-2 px-4">{item.thead_four}</td>
                  {router.pathname === "/invoice" ? (
                    <td className="py-2 px-4">
                      {thead_five && item.thead_five}
                    </td>
                  ) : null}
                  {router.pathname === "/customer" ? (
                    <td className="py-2 px-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                        />
                      </svg>
                    </td>
                  ) : null}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
