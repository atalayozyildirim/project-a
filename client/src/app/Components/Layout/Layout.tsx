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
        <div className="w-11/12 pl-28 pt-8 pr-20 h-screen">{children}</div>
      </div>
    </>
  );
};
