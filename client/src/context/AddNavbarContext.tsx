"use client";
import React from "react";

interface ContextProps {
  showAddI: () => void;
  showAdd: boolean;
}

const Context = React.createContext<ContextProps>({
  showAddI: () => {},
  showAdd: false,
});

interface AddNavbarContextProps {
  children: React.ReactNode;
}

const AddNavbarContext: React.FC<AddNavbarContextProps> = ({ children }) => {
  const [showAdd, setShowAdd] = React.useState(false);

  const showAddI = () => {
    console.log("Ali kırca gibi");
    setShowAdd(!showAdd);
  };
  return (
    <Context.Provider value={{ showAddI, showAdd }}>
      {children}
    </Context.Provider>
  );
};

const useADDNavbar = () => React.useContext(Context);

export { useADDNavbar, AddNavbarContext };
