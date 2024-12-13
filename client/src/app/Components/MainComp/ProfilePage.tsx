import React from "react";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Props {
  avatarName: string;
  avatarImage: string;
  event: string;
}

export default function ProfilePage({ avatarName, avatarImage, event }: Props) {
  return (
    <>
      <div className="p-10 w-full  min-h-screen">
        <div className="w-full h-screen relative -top-20">
          <div
            className=" bg-gray-400  bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 
 w-full h-56 rounded-xl relative mt-20  ml-5 mr-5"
          ></div>
          <div className="rounded-full flex justify-center shadow-md   items-center  object-fill s-10 -mt-16 ml-9 w-24 h-24 bg-[#313538] relative z-10">
            <Image
              src={avatarImage || "next.svg"}
              alt="Profile"
              width={200}
              height={200}
              className="rounded-full"
            />
          </div>
          <div className="text-2xl mt-5 ml-5 font-bold  text-white">
            {avatarName || "Atalay Özyıldırım"}
          </div>
          <div className="ml-5">
            <Tabs className="mt-10 w-56">
              <TabsList className="flex space-x-4 bg-[#27272a]">
                <TabsTrigger
                  value="tab1"
                  className="px-4 py-2 focus:bg-black rounded-lg"
                >
                  About
                </TabsTrigger>
                <TabsTrigger
                  value="tab2"
                  className="px-4 py-2 focus:bg-black rounded-lg"
                >
                  Event
                </TabsTrigger>
              </TabsList>
              <TabsContent
                value="tab1"
                className="p-4 bg-transparent h-auto  rounded-lg shadow-md mt-4"
              >
                {"About"}
              </TabsContent>
              <TabsContent
                value="tab2"
                className="p-4 bg-transparent h-auto rounded-lg shadow-md mt-4"
              >
                {event || "Event"}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
}
