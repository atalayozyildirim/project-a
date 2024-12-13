import { useRouter } from "next/router";
import React from "react";
import Image from "next/image";
import EditNavbar from "./EditNavbar";
import Download from "./Download";
import Search from "./Search";
import AddNavbarButtons from "./AddNavbarButtons";
import AddInput from "../TextArea/AddInput";
import Invoice from "../TextArea/Invoice";
import { useADDNavbar } from "@/context/AddNavbarContext";

export const NavbarTopButton = () => {
  const router = useRouter();
  const { showAddI } = useADDNavbar();
  const [showAdd, setShowAdd] = React.useState(false);
  const [showInvoice, setShowInvoice] = React.useState(false);

  const showAddInput = () => {
    setShowAdd(!showAdd);
  };

  const showInvoiceInput = () => {
    setShowInvoice(!showInvoice);
  };

  return (
    <>
      {showAdd ? <AddInput close={showAddInput} /> : null}
      {router.pathname === "/invoice" && showInvoice ? (
        <Invoice InvoiceID={"123"} closeInvoice={showInvoiceInput} />
      ) : null}
      <div className="fixed top-0 left-1/2 transform -translate-x-1/2 w-1/2 z-10 bg-[#141517] shadow-lg h-14 p-1 mt-2 rounded-3xl flex justify-between items-center">
        <div className="flex items-center gap-20 mx-auto">
          {router.pathname != "/home" &&
          router.pathname != "/profil" &&
          router.pathname != "/chart" ? (
            <>
              <EditNavbar />
              <AddNavbarButtons
                AutoADDForm={showAddI}
                onClick={showAddI}
                close={
                  router.pathname === "/invoice" ? showInvoiceInput : showAddI
                }
              />
              <Download />
              <Search onClick={showAddInput} />
            </>
          ) : (
            <></>
          )}
        </div>
        <div
          id="profil"
          className="flex w-12 h-12  ml-8 p-2 bg-[#313538] rounded-full"
        >
          <Image
            src="next.svg"
            alt="profil"
            width={40}
            height={40}
            className="cursor-pointer"
            onClick={() => router.push("/profil")}
          />
        </div>
      </div>
    </>
  );
};
