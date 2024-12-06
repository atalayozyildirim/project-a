import React, { createContext, useState, useContext } from "react";

interface ChartContextType {
  selectedChart: (value: string) => void;
  value: string | null;
}

const ChartContext = createContext<ChartContextType | undefined>(undefined);

const ChartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [value, setValue] = useState<string | null>(null);

  const selectedChart = (value: string) => {
    setValue(value);
  };

  return (
    <ChartContext.Provider value={{ selectedChart, value }}>
      {children}
    </ChartContext.Provider>
  );
};

const useChartContext = () => {
  const context = useContext(ChartContext);
  if (!context) {
    throw new Error("useChartContext must be used within a ChartProvider");
  }
  return context;
};

export { ChartProvider, useChartContext };
