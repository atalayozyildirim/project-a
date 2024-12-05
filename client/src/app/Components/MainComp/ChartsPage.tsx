import React from "react";
import { SelectButton } from "../Button/SelectButton";
import Charts from "../Chart/Chart";

export default function ChartsPage() {
  return (
    <>
      <div className="min-h-screen  w-full p-10">
        <h1 className="text-3xl font-bold text-left hover:underline">Charts</h1>
        <div className="min-w-screen flex justify-end">
          <SelectButton />
        </div>
        <div className="Adana merkez patlıyor herkes">
          <Charts />
        </div>
      </div>
    </>
  );
}
