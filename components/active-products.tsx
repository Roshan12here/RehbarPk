"use client"

import { auth } from "@/auth";
import { useState, useRef, useEffect } from "react";
import ProductItem from "./product-item";
import { Button } from "./ui/button";

interface ActiveProductsProps {
  activeProducts: any;
}

const ActiveProducts: React.FC<ActiveProductsProps> = ({ activeProducts }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [formattedActiveProducts, setFormattedActiveProducts] = useState<any[]>([]);

  useEffect(() => {
    const formatProducts = () => {
      const formatted = activeProducts?.map((product: any) => {
        const {
          id,
          name,
          slug,
          headline,
          description,
          logo,
          releaseDate,
          website,
          twitter,
          discord,
          createdAt,
          updatedAt,
          userId,
          status,
          images,
          categories,
          comments,
          upvotes
        } = product;

        const imageUrls = images.map((image: any) => image.url);
        const categoryNames = categories.map((category: any) => category.name);
        const commentsCount = comments ? comments.length : 0;

        const commentText = comments ? comments.map((comment: any) => ({
          id: comment.id,
          profile: comment.profilePicture,
          body: comment.body,
          user: comment.user.name,
          timestamp: comment.createdAt,
          userId: comment.user.id,
          name: comment.user.name.toLowerCase().replace(/\s/g, '_'),
        })) : [];

        const upvotesCount = upvotes ? upvotes.length : 0;
        const upvotesData = upvotes.map((upvote: any) => upvote.user.id);

        return {
          id,
          name,
          slug,
          headline,
          description,
          logo,
          releaseDate,
          website,
          twitter,
          discord,
          createdAt,
          updatedAt,
          userId,
          status,
          images: imageUrls,
          categories: categoryNames,
          commentsLength: commentsCount,
          commentData: commentText,
          upvoters: upvotesData,
          upvotes: upvotesCount,
        };
      });

      setFormattedActiveProducts(formatted);
    };

    formatProducts();
  }, [activeProducts]);

  const handlePrevClick = () => {
    if (scrollContainerRef.current) {
      const newPosition = Math.max(scrollPosition - scrollContainerRef.current.clientWidth, 0);
      scrollContainerRef.current.scrollTo({
        left: newPosition,
        behavior: 'smooth',
      });
      setScrollPosition(newPosition);
    }
  };

  const handleNextClick = () => {
    if (scrollContainerRef.current) {
      const newPosition = Math.min(
        scrollPosition + scrollContainerRef.current.clientWidth,
        scrollContainerRef.current.scrollWidth - scrollContainerRef.current.clientWidth
      );
      scrollContainerRef.current.scrollTo({
        left: newPosition,
        behavior: 'smooth',
      });
      setScrollPosition(newPosition);
    }
  };

  return (
    <div className="w-full h-[110vh] ml-12 flex flex-col relative">
    {/* Content */}
    <div className="relative flex items-center">
      <div ref={scrollContainerRef} className="flex overflow-x-auto snap-x gap-8 snap-mandatory">
        {formattedActiveProducts?.map((product: any) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
    </div>
    <div className="mt-6 flex justify-between pr-8 space-x-4 items-center w-[60%]  ml-auto">
        <div className="flex flex-row gap-4">
          <Button className="flex items-center justify-center bg-[#006837] rounded-md cursor-pointer text-[#ffffff]">
            Find a Place
          </Button>
          <Button className="flex items-center justify-center bg-white border border-solid border-gray-200 text-gray-600 rounded-md">
            List your Place
          </Button>
        </div>
        <div className="flex gap-2">
          <button onClick={handlePrevClick} className="p-2 bg-gray-300 rounded-full">
            <ChevronLeftIcon className="w-6 h-6" />
          </button>
          <button onClick={handleNextClick} className="p-2 bg-[#000000] text-[#ffffff] rounded-full">
            <ChevronRightIcon className="w-6 h-6" />
          </button>
        </div>
      </div>
  </div>
  )
};

function ChevronLeftIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

function ChevronRightIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

export default ActiveProducts;
