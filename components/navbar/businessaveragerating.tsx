"use client";
import React, { useState, useEffect } from "react";
import { getProductRating } from "@/lib/Business-server-action";
import { Square } from "lucide-react";

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
        <Square 
          key={i} 
          className={`w-5   h-5 ${i <= averageRating ? 'text-[#0E793C]   fill-[#0E793C]' : 'text-gray-300'}`} 
          fill={i <= averageRating ? 'currentColor' : 'none'}
          stroke={i <= averageRating ? 'none' : 'currentColor'}
        />
      );
    }
    return stars;
  };

  return (
    <div className="flex  items-center space-x-1">
      <div className="flex space-x-[0.5px]">
        {renderStars()}
      </div>
      <span className="text-sm text-[#0E793C] font-medium ">{averageRating.toFixed(1)}</span>
    </div>
  );
};




export default AverageRating;