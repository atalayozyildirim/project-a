import React, { useState, createContext, ReactNode, useContext } from "react";
import axios from "axios";

interface Customers {
  name: string;
  surname: string;
  company: string;
  email: string;
  phoneNumber: string;
}

interface Employers {
  name: string;
  surname: string;
  role: string;
  phoneNumber: string;
  Salary: number;
  email: string;
  filed: string;
}
interface Task {
  taskId: string;
  description: string;
  assignedTo: string;
  dueDate: Date;
  priority: string;
  staus: string;
}
interface Emails {
  userId: string;
  host: string;
  port: number;
  user: string;
  password: string;
  tls: boolean;
}
interface ContextProps {
  onSubmitData: (
    data: Employers | Customers | Task | Emails,
    field: string
  ) => Promise<void>;
  dataForm: (Employers | Customers | Task | Emails)[];
  setDataForm: React.Dispatch<
    React.SetStateAction<(Employers | Customers | Task | Emails)[]>
  >;
}

const Context = createContext<ContextProps>({
  onSubmitData: async () => {},
  dataForm: [],
  setDataForm: () => {},
});

interface FormContextProps {
  children: ReactNode;
}

const FormContext: React.FC<FormContextProps> = ({ children }) => {
  const [dataForm, setDataForm] = useState<
    (Employers | Customers | Task | Emails)[]
  >([]);

  const postData = async (
    url: string,
    data: Employers | Customers | Task | Emails
  ) => {
    try {
      const res = await axios.post(url, data);
      if (res.status === 201) {
        setDataForm((prev) => [...prev, data]);
      } else {
        console.error("Error posting data");
      }
    } catch (error) {
      console.error("Error posting data", error);
    }
  };

  const onSubmitData = async (
    data: Employers | Customers | Task | Emails,
    field: string
  ) => {
    switch (field) {
      case "Employers":
        await postData("/api/emp/add", data);
        break;
      case "Customers":
        await postData("/api/customer/add", data);
        break;
      case "Tasks":
        await postData("/api/task/create", data);
        break;
      case "Emails":
        await postData("/api/email/config", data);
        break;
    }
  };

  return (
    <Context.Provider value={{ onSubmitData, dataForm, setDataForm }}>
      {children}
    </Context.Provider>
  );
};

export const useFormContext = () => useContext(Context);
export { FormContext, Context };
