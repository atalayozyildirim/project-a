import { useFormContext } from "@/context/FormContext";
import React from "react";

interface FormInputProps {
  close: () => void;
  fields: string;
  textOne: string;
  textTwo?: string;
  textThree?: string;
  textFour?: string;
  textFive?: string;
  textSix?: string;
}

export default function FormInput({
  close,
  textOne,
  textThree,
  textTwo,
  textFour,
  textFive,
  textSix,
  fields,
}: FormInputProps) {
  const [clicked, setClicked] = React.useState<boolean>(false);
  const [data, setData] = React.useState({
    input_one: "",
    input_two: "",
    input_three: "",
    input_four: "",
    input_five: "",
    input_six: "",
  });
  const { onSubmitData } = useFormContext();

  const handleSubmit = () => {
    let submitData;
    switch (fields) {
      case "Employers":
        submitData = {
          name: data.input_one,
          surname: data.input_two,
          role: data.input_three,
          phoneNumber: data.input_four,
          Salary: parseFloat(data.input_five),
          email: data.input_six,
          filed: "Employers",
        };
        break;
      case "Customers":
        submitData = {
          name: data.input_one,
          surname: data.input_two,
          company: data.input_three,
          email: data.input_four,
          phoneNumber: data.input_five,
        };
        break;
      case "Task":
        submitData = {
          description: data.input_one,
        };

        break;
      default:
        console.error("Unknown field type");
        return;
    }
    onSubmitData(submitData, fields);
    setClicked(!clicked);
  };

  return (
    <div className="flex fixed top-0 left-0 w-full h-full z-49 justify-center items-center bg-black bg-opacity-50">
      <div className="bg-[#171c1e] p-8 rounded-lg z-50 relative shadow-lg w-full max-w-md">
        <div onClick={close} className="w-8 h-8 mb-4 cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="white"
            className="size-6"
            onClick={close}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </div>
        <div className="w-full max-w-xs mx-auto">
          <label
            htmlFor="input1"
            className="block text-sm font-medium text-gray-700"
          >
            {textOne}
          </label>
          <input
            type="text"
            id="input1"
            name="input1"
            placeholder={textOne}
            onChange={(e) => setData({ ...data, input_one: e.target.value })}
            className="mt-1 block w-full px-3 py-2 border text-white bg-[#141517] border-[#494d55] rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div className="w-full max-w-xs mx-auto mt-4">
          <label
            htmlFor="input2"
            className="block text-sm font-medium text-gray-700"
          >
            {textTwo}
          </label>
          <input
            type="text"
            id="input2"
            name="input2"
            onChange={(e) => setData({ ...data, input_two: e.target.value })}
            placeholder={textTwo}
            className="mt-1 block w-full px-3 py-2 border text-white bg-[#141517] border-[#494d55] rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div className="w-full max-w-xs mx-auto mt-4">
          <label
            htmlFor="input3"
            className="block text-sm font-medium text-gray-700"
          >
            {textThree}
          </label>
          <input
            type="text"
            id="input3"
            name="input3"
            onChange={(e) => setData({ ...data, input_three: e.target.value })}
            placeholder={textThree}
            className="mt-1 block w-full px-3 py-2 border  text-white bg-[#141517] border-[#494d55] rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div className="w-full max-w-xs mx-auto mt-4">
          <label
            htmlFor="input3"
            className="block text-sm font-medium text-gray-700"
          >
            {textFour}
          </label>
          <input
            type="text"
            id="input4"
            name="input4"
            onChange={(e) => setData({ ...data, input_four: e.target.value })}
            placeholder={textFour}
            className="mt-1 block w-full px-3 py-2 border text-white bg-[#141517] border-[#494d55] rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div className="w-full max-w-xs mx-auto mt-4">
          <label
            htmlFor="input3"
            className="block text-sm font-medium text-gray-700"
          >
            {textFive}
          </label>
          <input
            type="text"
            id="input5"
            name="input5"
            onChange={(e) => setData({ ...data, input_five: e.target.value })}
            placeholder={textFive}
            className="mt-1 block w-full px-3 py-2 border text-white bg-[#141517] border-[#494d55] rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        {textSix && (
          <div className="w-full max-w-xs mx-auto mt-4">
            <label
              htmlFor="input3"
              className="block text-sm font-medium text-gray-700"
            >
              {textSix}
            </label>
            <input
              type="text"
              id="input6"
              name="input6"
              onChange={(e) => setData({ ...data, input_six: e.target.value })}
              placeholder={textSix}
              className="mt-1 block w-full px-3 py-2 border text-white bg-[#141517] border-[#494d55] rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
        )}
        <div className="w-full max-w-xs mx-auto mt-6">
          <button
            type="button"
            onClick={handleSubmit}
            className="w-full px-4 py-2 bg-blue-500  text-white rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
