"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "../ui/button";
import NotificationIcon from "./notification-icon";
import { SearchIcon, MenuIcon } from "lucide-react";
import Modal from "../ui/modals/authModal";
import AuthContent from "./auth-content";
import ProductItem from "../Getstarted";
import { Sheet, SheetTrigger, SheetContent } from "../ui/sheet";
import Modalsearch from "../ui/modals/Modalofserach";
import Searchmodal from "../ui/Searchmodal";

interface NavbarProps {
  authenticatedUser?: any;
  notifications?: any;
  products?: any;
}

const Navbar: React.FC<NavbarProps> = ({
  authenticatedUser,
  notifications,
  products,
}) => {
  const [authModalVisible, setAuthModalVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const handleButtonClick = () => {
    setAuthModalVisible(true);
  };

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`${
        scrolled
          ? "fixed top-0 left-0 right-0 z-50 bg-white shadow   "
          : "bg-white shadow"
      } flex py-[6vh]  items-center mx-[3vw] justify-between h-16 px-4 md:px-6`}
    >
      <div className="flex items-center gap-2">
        <Link href="/" prefetch={false}>
          <Image
            alt="Logo"
            src="/rehbar-logo@2x.png"
            loading="lazy"
            width={100}
            height={100}
          />
        </Link>
        <Button
          onClick={() => setOpen(true)}
          className="ml-8 bg-white px-4 text-[#0E793C] hover:bg-[#0E793C] hover:text-[#ffffff]"
        >
          <SearchIcon className="h-6 w-6" />
          <span className="mx-2">Search</span>
        </Button>
      </div>
      <nav className="flex-1 hidden md:flex items-center justify-center gap-12">
        <Link href="#" className="text-black font-bold hover:text-gray-800" prefetch={false}>
          Home
        </Link>
        <Link href="#" className="text-black font-bold hover:text-gray-800" prefetch={false}>
          About
        </Link>
        <Link href="#" className="text-black font-bold hover:text-gray-800" prefetch={false}>
          Services
        </Link>
        <Link href="#" className="text-black font-bold hover:text-gray-800" prefetch={false}>
          Contact
        </Link>
      </nav>
      <div className="flex items-center gap-4">
        {authenticatedUser ? (
          <>
            {/* Add authenticated user content here */}
          </>
        ) : (
          <Button
            onClick={handleButtonClick}
            className="bg-[#ffffff] border-2 text-[#000000] hover:bg-[#ffffff] hover:text-[#0E793C]"
          >
            Sign In
          </Button>
        )}
        <ProductItem authenticatedUser={authenticatedUser} product={products} />
      </div>
      <div className="flex items-center sm:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="sm:hidden">
              <MenuIcon className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] bg-white shadow-lg">
            <nav className="flex flex-col text-[#000000] items-start gap-4 px-6 py-8">
              <Link href="#" className="relative font-bold text-[#000000] inline-block min-w-[48px]" prefetch={false}>
                Home
              </Link>
              <Link href="#" className="relative font-bold text-[#000000] inline-block min-w-[48px]" prefetch={false}>
                About
              </Link>
              <Link href="#" className="relative font-bold text-[#000000] inline-block min-w-[48px]" prefetch={false}>
                Services
              </Link>
              <Link href="#" className="relative font-bold text-[#000000] inline-block min-w-[48px]" prefetch={false}>
                Contact
              </Link>
              <NotificationIcon notifications={notifications} />
                            <ProductItem authenticatedUser={authenticatedUser} product={products} />
            </nav>
          </SheetContent>
        </Sheet>
      </div>
      <Modal visible={authModalVisible} setVisible={setAuthModalVisible}>
        <AuthContent />
      </Modal>
      <Modalsearch visible={open} setVisible={setOpen}>
        <Searchmodal />
      </Modalsearch>
    </header>
  );
};

export default Navbar;
