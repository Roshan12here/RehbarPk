import React from 'react';
import Searchs from './navbar/BusinessSearch';
import DestinationsTitle from "@/components/ui/DestActui";
import Box from "@/components/ui/DestinationSection";

const HeroSection = () => {
  return (
    <>
    <div className="relative w-full rounded-3xl lg:w-[90%] mt-2 xl:w-[90%] 2xl:w-[90%] h-[78vh] bg-cover bg-center mx-auto" style={{ backgroundImage: "url('/fa.jpg')" }}>
      <div className="absolute inset-0 bg-black opacity-50 rounded-3xl"></div> {/* Dark shadow overlay */}
      <div className="relative pt-12 z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center items-center text-white text-center">
        <h1 className="text-xl sm:text-xl md:text-2xl lg:text-3xl font-poppins  mb-3 leading-tight">
          We Help People Discover Best <span className="font-extrabold">Places</span>
          <br  />  and <span className="font-extrabold">Businesses</span> in Pakistan
        </h1>
        <p className="text-base sm:text-lg md:text-xl font-inter lg:text-2xl mb-6 max-w-2xl">
          Search any spot or business and see what others say about us
        </p>
        <div className="w-full max-w-2xl flex flex-col sm:flex-row">
         <Searchs/> 
        </div>
        <div className="flex justify-center space-x-8 sm:space-x-16 md:mt-24 lg:mt-28 xl:mt-36 mt-14 sm:mt-16">
          <div>
            <p className="text-lg sm:text-xl md:text-2xl font-bold">15k+</p>
            <p className="text-xs sm:text-sm">Businesses</p>
          </div>
          <div>
            <p className="text-lg sm:text-xl md:text-2xl font-bold">10k+</p>
            <p className="text-xs sm:text-sm">Destinations</p>
          </div>
          <div>
            <p className="text-lg sm:text-xl md:text-2xl font-bold">1m+</p>
            <p className="text-xs sm:text-sm">Reviews</p>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default HeroSection;
