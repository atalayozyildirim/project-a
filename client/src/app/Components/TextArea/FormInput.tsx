import React from "react";

interface FormInputProps {
  close: () => void;
  fields: string;
  textOne: string;
  textTwo: string;
  textThree: string;
  textFour: string;
}

export default function FormInput({
  close,
  textOne,
  textThree,
  textTwo,
  textFour,
}: FormInputProps) {
  return (
    <div className="flex fixed z-50 min-w-full justify-center items-center min-h-screen ">
      <div className="bg-[#171c1e] p-8 rounded-lg shadow-lg w-full max-w-md">
        <div onClick={close} className="w-8 h-8 mb-4 cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="white"
            className="size-8"
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
            id="input3"
            name="input3"
            placeholder={textFour}
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
            placeholder={textThree}
            className="mt-1 block w-full px-3 py-2 border text-white bg-[#141517] border-[#494d55] rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div className="w-full max-w-xs mx-auto mt-6">
          <button
            type="button"
            className="w-full px-4 py-2 bg-blue-500  text-white rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
