import { Navbar } from "@/app/Components/Navbar";
import { NavbarTopButton } from "../Button/NavbarTopButton";
import "@radix-ui/themes/styles.css";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <NavbarTopButton />
      <div className="flex flex-row gap-0">
        <Navbar />
        <div className="w-11/12 pt-12 relative left-28 h-screen">
          <div className="w-full flex justify-center items-center">
            {children}
          </div>
        </div>
      </div>
    </>
  );
};
