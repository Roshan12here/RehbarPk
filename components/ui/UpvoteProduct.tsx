"use client"

import React from 'react'
import { useState } from 'react'
import { upvoteProduct } from '@/lib/server-actions'
import {
    PiArrowBendDoubleUpRight,
    PiCaretUpFill,
    PiChatCircle,
  } from "react-icons/pi";
  import { motion } from "framer-motion";

interface UpvoteProductProps {
    product : any
    authenticatedUser : any
}



export const UpvoteProduct : React.FC<UpvoteProductProps> = ({product , authenticatedUser}) => {
  
    const handleArrowClick = (
        e: React.MouseEvent<HTMLDivElement, MouseEvent>
      ) => {
        // Prevent the click event from propagating to the product item container
        e.stopPropagation();
        // Open the link in a new tab
        window.open(`${product.website}`, "_blank");
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


    const [totalUpvotes, setTotalUpvotes] = useState(product.upvotes || 0);
    const [hasUpvoted, setHasUpvoted] = useState(
        product.upvoters?.includes(authenticatedUser?.user.id)
      );
  

      const variants = {
        initital : { scale: 1 },
        upvoted: { scale: [1, 1.2, 1], transition: { duration: 0.3 } },
      };
    

    return (
    <div>
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
  )
}
