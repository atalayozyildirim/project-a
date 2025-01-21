import React, { useEffect } from "react";
import EmailCard from "../Card/EmailCard";
import EmailDetailCard from "../Card/EmailDetailCard";
import FormInput from "../TextArea/FormInput";
import { useADDNavbar } from "@/context/AddNavbarContext";
import baseClient from "@/api/BaseClient";
import { useAuth } from "@/context/AuthContext";

export default function MailComp() {
  const { showAdd, showAddI } = useADDNavbar();
  const { user } = useAuth();
  const [data, setData] = React.useState<string[]>([]);

  const fecthDataEmail = async () => {
    const res = await baseClient("ayna").post("api/email/get/config", {
      userId: user?.userId,
    });
    const { host, port, auth, tls, secure } = res.data;

    const getAllEmail = await baseClient("ayna").post("api/email/inbox", {
      userId: user?.userId,
      user: auth.user,
      password: auth.password,
      host: host,
      port: port,
      tls: tls,
      secure: secure,
    });

    setData(getAllEmail.data);
  };

  useEffect(() => {
    fecthDataEmail();
  }, []);

  console.log(data);
  return (
    <>
      {showAdd && (
        <FormInput
          close={showAddI}
          fields="Emails"
          textOne="Host"
          textTwo="Port"
          textThree="Auth user"
          textFour="Password"
        />
      )}
      <div className="p-10 w-full  min-h-screen">
        <div className="w-full h-screen flex ">
          <div className="suç ortagım paket sorguda dedim kekeme w-2/3 rounded-xl border p-5  border-[#27272a] rounded-tr-none rounded-br-none -ml-16 -mt-2 min-h-screen overflow-y-auto">
            <div className="">
              <input
                type="text"
                placeholder="Search"
                className="w-full h-10 border border-[#27272a] bg-transparent rounded-md p-2"
              />
            </div>
            <div className="mt-5">
              <EmailCard data={[]} />
            </div>
          </div>
          <div className="w-full min-h-screen border border-[#27272a] rounded-tl-none  -mt-2 rounded-bl-none rounded-xl p-5">
            <EmailDetailCard data={[]} />
          </div>
        </div>
      </div>
    </>
  );
}
