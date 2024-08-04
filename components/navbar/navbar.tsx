"use client";

import { useState } from "react";
import Logo from "./logo";
import AuthContent from "./auth-content";
import Avatar from "./avatar";
import NotificationIcon from "./notification-icon";
import Submit from "./submit";
import Modal from "../ui/modals/authModal";
import { Button } from "../ui/button";
import ProductItem from "../Getstarted";
import Link from "next/link";
import Image from "next/image";
import { Sheet, SheetTrigger, SheetContent } from "../ui/sheet"; // Import Sheet components
import { MenuIcon } from "lucide-react";

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

  const handleButtonClick = () => {
    setAuthModalVisible(true);
  };

  return (
    <header className="flex items-center mx-[3vw] justify-between h-16 px-4 md:px-6 bg-white shadow">
      <div className="flex items-center gap-2">
        <Link href="/" prefetch={false}>
          <Image
            alt=""
            src="/rehbar-logo@2x.png"
            loading="lazy"
            width={100}
            height={100}
          />
        </Link>
      </div>
      <nav className="flex-1 hidden md:flex items-center justify-center gap-6">
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
            <Avatar authenticatedUser={authenticatedUser} />
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
    </header>
  );
};

export default Navbar;
