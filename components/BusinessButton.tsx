"use client";

import { useState } from "react";
import AuthContent from "./navbar/auth-content";
import Link from "next/link";
import { motion } from "framer-motion";
import ProductModalContent from "./BusinessCommentModal";
import { Button } from "./ui/button";
import Modal from "./ui/modals/authModal";
import ModalComment from "./ui/modals/CommentModalUI";

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
   <Button className="Rounded-lg text-[#ffffff] bg-[#0E793C] hover:bg-gradient-to-bl
    from-[#0E793C]
    via-[#86efac]
    to-[#0E793C] " >Commment On this Business</Button>
      </div>

      <ModalComment visible={showProductModal} setVisible={setShowProductModal}>
        <ProductModalContent
          currentProduct={currentProduct}
          authenticatedUser={authenticatedUser}
          setTotalUpvotes={setTotalUpvotes}
          totalUpvotes={totalUpvotes}
          hasUpvoted={hasUpvoted}
          setHasUpvoted={setHasUpvoted}
          />
      </ModalComment>

      <Modal visible={showLoginModal} setVisible={setShowLoginModal}>
        <AuthContent />
      </Modal>
    </div>
  );
};

export default ProductItem;
