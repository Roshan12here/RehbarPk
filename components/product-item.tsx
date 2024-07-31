"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  PiArrowBendDoubleUpRight,
  PiCaretUpFill,
  PiChatCircle,
} from "react-icons/pi";
import ProductModal from "./ui/modals/product-modal";
import ProductModalContent from "./product-modal-content";
import AuthContent from "./navbar/auth-content";
import Link from "next/link";
import { upvoteProduct, updateProductAverageRating } from "@/lib/server-actions";
import { motion } from "framer-motion";
import Modal from "./ui/modals/authModal";


interface ProductItemProps {
  product: any;
  authenticatedUser: any;
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

  


  const handleArrowClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    // Prevent the click event from propagating to the product item container
    e.stopPropagation();
    // Open the link in a new tab
    window.open(`${product.website}`, "_blank");
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
    <Link href={`/Destination/${product.slug}`}>
    <div
      className="
    py-4 w-full cursor-pointer p-2   
    rounded-md
     hover:bg-gradient-to-bl
    from-[#16a34a]
    via-[#86efac]
    to-[#16a34a]
    "
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Image
            src={product.logo}
            alt="logo"
            width={1000}
            height={1000}
            className="h-12 w-12 rounded-md"
          />

          <div className="ml-4">
            <div className="md:flex items-center gap-x-2">
              <h1 className="text-sm font-semibold">{product.name}</h1>

              <p className="hidden md:flex text-xs">-</p>
              <p className="text-gray-600 font-extrabold text-xs md:text-sm pr-2">
                {product.headline}
              </p>
              <div
                onClick={handleArrowClick}
                className="hidden md:flex cursor-pointer"
              >
                <PiArrowBendDoubleUpRight />
              </div>
            </div>
            <div className="hidden md:flex gap-x-2 items-center">
              <div className="text-xs text-gray-600 font-extrabold flex gap-x-1 items-center">
                {product.commentsLength}
                <PiChatCircle />
              </div>

              {product.categories.map((category: string) => (
                <div key={category} className="text-xs text-gray-600 font-extrabold">
                  <div className="flex gap-x-1 items-center">
                    <div className="mr-1">•</div>
                      {category}
                  </div>
                </div>
              ))}

              <div className="text-xs text-gray-600 font-extrabold">
              </div>
            </div>
          </div>
        </div>

        <div className="text-sm">
          <div className="flex gap-x-2 items-center">
<h2>{product.rating}</h2>
          </div>
          <motion.div
          onClick={handleUpvoteClick}
          variants={variants}
          animate={hasUpvoted ? "upvoted" : "initital"}
          >
            {hasUpvoted ? (
              <div
                className="border px-2 rounded-md flex flex-col 
              items-center bg-gradient-to-bl 
              from-[#ff6154] to-[#ff4582] border-[#ff6154]
              text-white"
              >
                <PiCaretUpFill className="text-xl" />
                {totalUpvotes}
              </div>
            ) : (
              <div className="border px-2 rounded-md flex flex-col items-center">
                <PiCaretUpFill className="text-xl" />
                {totalUpvotes}
              </div>
            )}
          </motion.div>
        </div>
      </div>

      <ProductModal visible={showProductModal} setVisible={setShowProductModal}>
        <ProductModalContent
          currentProduct={currentProduct}
          authenticatedUser={authenticatedUser}
          setTotalUpvotes={setTotalUpvotes}
          totalUpvotes={totalUpvotes}
          hasUpvoted={hasUpvoted}
          setHasUpvoted={setHasUpvoted}
          />
      </ProductModal>

      <Modal visible={showLoginModal} setVisible={setShowLoginModal}>
        <AuthContent />
      </Modal>
    </div>
          </Link>
  );
};

export default ProductItem;
