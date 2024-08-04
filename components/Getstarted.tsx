"use client";

import { useState } from "react";
import AuthContent from "./navbar/auth-content";
import Link from "next/link";
import { upvoteProduct } from "@/lib/server-actions";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import Modal from "./ui/modals/authModal";
import ModalComment from "./ui/modals/CommentModalUI";
import { useRouter } from "next/router";
import AuthContentChoose from "./ChooseContent";
import ModalChoose from "./ui/modals/authModal";

interface ProductItemProps {
  product?: any;
  authenticatedUser?: any;
}   

const ProductItem: React.FC<ProductItemProps> = ({
  product,
  authenticatedUser,
}) => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showProductModal, setShowProductModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<any>(null);

  const [hasUpvoted, setHasUpvoted] = useState(
    product.upvoters?.includes(authenticatedUser?.user.id)
  );

  const [totalUpvotes, setTotalUpvotes] = useState(product.upvotes || 0);




  const handleProductItemClick = () => {
    if (!authenticatedUser) {
      setShowLoginModal(true);
    } else {
      setCurrentProduct(product);
      setShowProductModal(true);
    }
  };

  const handleCategoryClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.stopPropagation();
  };


  const handleUpvoteClick = async (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.stopPropagation();

    try {
      await upvoteProduct(product.id);
      setHasUpvoted(!hasUpvoted);
      setTotalUpvotes(hasUpvoted ? totalUpvotes - 1 : totalUpvotes + 1);
    } catch (error) {
      console.error(error);
    }
  }




  const variants = {
    initital : { scale: 1 },
    upvoted: { scale: [1, 1.2, 1], transition: { duration: 0.3 } },
  };



  return (
    <div
      className="
    py-4 w-full cursor-pointer p-2   
    rounded-md
     
    "
    >
      <div onClick={handleProductItemClick} className="">
   <Button className="Rounded-lg text-[#ffffff] bg-[#006837] hover:text-[#ffffff] hover:bg-[#0E793C]
    " >Add Listing</Button>
      </div>

      <ModalChoose visible={showProductModal} setVisible={setShowProductModal}>
        <AuthContentChoose />
      </ModalChoose>

      <Modal visible={showLoginModal} setVisible={setShowLoginModal}>
        <AuthContent />
      </Modal>
    </div>
  );
};

export default ProductItem;
