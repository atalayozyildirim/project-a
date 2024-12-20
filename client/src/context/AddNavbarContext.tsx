"use client";
import React from "react";
import { useAuth } from "./AuthContext";

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

  const { isAuth } = useAuth();

  const showAddI = () => {
    setShowAdd(!showAdd);
  };
  return (
    <Context.Provider value={{ showAddI, showAdd }}>
      {isAuth && children}
    </Context.Provider>
  );
};

const useADDNavbar = () => React.useContext(Context);

export { useADDNavbar, AddNavbarContext };
