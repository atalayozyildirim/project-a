import { useRouter } from "next/router";
import Image from "next/image";
import EditNavbar from "./EditNavbar";
import Download from "./Download";
import Search from "./Search";
import AddNavbarButtons from "./AddNavbarButtons";

export const NavbarTopButton = () => {
  const router = useRouter();
  return (
    <div className="fixed top-0 left-1/2 transform -translate-x-1/2 w-1/2 z-10 bg-[#141517] shadow-lg h-14 p-1 mt-2 rounded-3xl flex justify-between items-center">
      {/* Sol tarafa hizalanmış diğer içerik */}
      <div className="flex items-center gap-20 mx-auto">
        {router.pathname != "/home" &&
        router.pathname != "/profil" &&
        router.pathname != "/chart" ? (
          <>
            <EditNavbar />
            <AddNavbarButtons />
            <Download />
            <Search />
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
  );
};
