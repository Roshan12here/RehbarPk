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
    <div className="border-b py-2 md:py-0 px-4 md:px-6 bg-[#0E793C] ">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Logo  />
        </div>


        <div className="flex items-center text-sm space-x-6 cursor-pointer">
         <ProductItem authenticatedUser={authenticatedUser} product={products} />
          {authenticatedUser ? (
            <>
              <NotificationIcon  notifications={notifications} />
              <Avatar authenticatedUser={authenticatedUser} />
            </>
          ) : (
            <div
              onClick={handleButtonClick}
              className="flex items-center space-x-6 cursor-pointer text-sm"
            >
              <Button className="bg-[#D1F4E0] text-[#0E793C] hover:bg-[#0E793C] hover:text-[#D1F4E0] ">Sign In To Get Started</Button>
            </div>
          )}
        </div>

        <Modal visible={authModalVisible} setVisible={setAuthModalVisible}>
          <AuthContent />
        </Modal>
      </div>
    </div>
  );
};

export default Navbar;
