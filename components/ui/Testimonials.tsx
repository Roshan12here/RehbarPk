"use client";

import { useEffect, useState, useRef } from "react";
import { StarIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { getAllRatings } from "@/lib/server-actions";
import Image from "next/image";
import BusinessTetimonial from "./BusinessTetimonial";
import { Square } from "lucide-react";

export default function Component() {
  const [ratings, setRatings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const data = await getAllRatings();
        setRatings(data);
      } catch (error) {
        console.error("Error fetching ratings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRatings();
  }, []);

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
    clearAutoSlide();
  };

  const handleNext = () => {
    if (currentIndex < ratings.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
    clearAutoSlide();
  };

  const startAutoSlide = () => {
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => {
        if (prev < ratings.length - 1) {
          return prev + 1;
        } else {
          clearAutoSlide();
          return prev;
        }
      });
    }, 3000); // Adjust the interval time for slower or faster sliding
  };

  const clearAutoSlide = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    if (ratings.length > 0 && !isHovered) {
      startAutoSlide();
    } else {
      clearAutoSlide();
    }

    return () => clearAutoSlide();
  }, [isHovered, ratings.length]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="w-full bg-white text-gray-800 py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col mt-6 items-center justify-center">
          <div className="text-lg font-normal text-[#afafaf]">Hear What Others Said</div>
          <div className="w-[11rem] h-px bg-[#afafaf] mt-1"></div>
        </div>
        <div className="space-y-4 text-center mt-4 mb-8">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-2xl md:text-3xl">
            Hear from our Satisfied travellers about their amazing <br /> experience. Discover why Rehbar.pk is their top <br /> choice for exploring Pakistan
          </h2>
        </div>
        {/* Overflow hidden container with gradient masking */}
        <div className="overflow-x-auto relative">
          {/* Scrolling container */}
          <div className="flex space-x-6">
            {ratings.map((rating, index) => (
              <div key={index} className="flex-shrink-0 w-80 p-4">
                <div className="rounded-lg border bg-background p-6 shadow-sm transition-all duration-300 hover:shadow-lg flex flex-col h-full">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-primary"> {rating.product ? rating.product.name : 'Destinatio in Rehbar'}  </h3>
                    </div>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Square
                          key={i}
                          className={`w-5 h-5 ${
                            i < Math.floor(rating.score) ? 'text-[#006837] fill-[#006837]' : 'text-gray-300'
                          }`}
                        />
                      ))}
                      <span className="ml-2 text-sm text-muted-foreground">{rating.score}</span>
                    </div>
                  </div>
                  <div className="border-b my-3"></div>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground flex-grow">{rating.comment}</p>
                  <div className="flex  mt-4">
                    <Image
                      src={rating.user.image}
                      alt="profile"
                      width={60}
                      height={60}
                      className="rounded-full h-14 w-14"
                    />
                    <div className='flex flex-col'>
                      <span className="font-semibold ml-3">{rating.user?.name || 'Anonymous'}</span>
                      <p className="  ml-3  text-sm leading-relaxed text-muted-foreground flex-grow">Commented on {rating.product ? rating.product.name : 'Destinatio in Rehbar'} </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-4">
        <BusinessTetimonial />
      </div>
    </div>
  );
}