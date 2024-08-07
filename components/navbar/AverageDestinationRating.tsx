"use client";
import React, { useState, useEffect } from "react";
import { getProductRating } from "@/lib/server-actions";

interface AverageRatingProps {
  productId: string;
}

const AverageRating: React.FC<AverageRatingProps> = ({ productId }) => {
  const [averageRating, setAverageRating] = useState<number>(0);
  const [ratingsCount, setRatingsCount] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProductRating = async () => {
      try {
        const { averageRating, ratingsCount } = await getProductRating(productId);
        setAverageRating(averageRating);
        setRatingsCount(ratingsCount);
      } catch (error) {
        console.error("Error fetching product rating:", error);
        setError("Failed to fetch product rating. Please try again.");
      }
    };
    fetchProductRating();
  }, [productId]);

  if (error) {
    return <p className="text-red-500 text-xs">{error}</p>;
  }

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <StarIcon 
          key={i} 
          className={`w-5   h-5 ${i <= averageRating ? 'text-[#0E793C]' : 'text-gray-300'}`} 
          fill={i <= averageRating ? 'currentColor' : 'none'}
          stroke={i <= averageRating ? 'none' : 'currentColor'}
        />
      );
    }
    return stars;
  };

  return (
    <div className="flex  items-center space-x-1">
      <div className="flex space-x-[1px]">
        {renderStars()}
      </div>
      <span className="text-sm text-[#0E793C] font-medium ">{averageRating.toFixed(1)}</span>
    </div>
  );
};

const StarIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      {...props}
    >
      <path d="M12 17.27L18.18 21 16.54 13.97 22 9.24 14.81 8.63 12 2 9.19 8.63 2 9.24 7.46 13.97 5.82 21z" />
    </svg>
  );
};

export default AverageRating;