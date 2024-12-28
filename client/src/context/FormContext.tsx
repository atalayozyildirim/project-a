"use client";
import React from "react";
import axios from "axios";

interface Customers {
  company: string;
  email: string;
  phoneNumber: string;
}

interface Employers {
  name: string;
  surname: string;
  role: string;
  phoneNumber: string;
  salary: number;
  email: string;
  field: string;
}

interface Task {
  description: string;
}

interface ContextProps {
  onSubmitData: (
    data: Employers[] | Customers[] | Task[],
    field: string
  ) => Promise<void>;
  data: Employers | Customers | Task;
}

const Context = React.createContext<ContextProps>({
  onSubmitData: async () => {},
  data: {} as Employers | Customers | Task,
});

interface FormContextProps {
  children: React.ReactNode;
}

const FormContext: React.FC<FormContextProps> = ({ children }) => {
  const [data, setData] = React.useState<Employers[] | Customers[] | Task[]>(
    []
  );

  const postData = async (
    url: string,
    data: Employers[] | Customers[] | Task[]
  ) => {
    try {
      const res = await axios.post(url, { data });
      if (res.status === 200) {
        setData(data);
      } else {
        console.error("Error posting data");
      }
    } catch (error) {
      console.error("Error posting data", error);
    }
  };

  const onSubmitData = async (
    data: Employers[] | Customers[] | Task[],
    field: string
  ) => {
    switch (field) {
      case "Employers":
        await postData("/api/emp/add", data);
        break;
      case "Customers":
        await postData("/api/customer/add", data);
        break;
      default:
        await postData("/api/task/create", data);
        break;
    }
  };

  return (
    <Context.Provider value={{ onSubmitData, data: data[0] }}>
      {children}
    </Context.Provider>
  );
};

export const useFormContext = () => React.useContext(Context);
export { FormContext, Context };
