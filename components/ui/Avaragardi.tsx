"use client";

import Image from "next/image";
import Link from "next/link";
import { MdFavorite, MdFamilyRestroom, MdBusiness } from "react-icons/md";
import { motion } from "framer-motion";
import { useState } from "react";

export default function Component() {
  // State to manage cursor style
  const [cursorStyle, setCursorStyle] = useState('');

  // Define cursor styles for different sections
  const cursorStyles = {
    honeymoon: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M12 21C12 21 20 13 20 8.5C20 6 18 4 15.5 4C13.5 4 12 6 12 6C12 6 10.5 4 8.5 4C6 4 4 6 4 8.5C4 13 12 21 12 21Z'%3E%3C/path%3E%3C/svg%3E") 12 12, auto`,
    family: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Ccircle cx='9' cy='7' r='3'%3E%3C/circle%3E%3Ccircle cx='15' cy='7' r='3'%3E%3C/circle%3E%3Ccircle cx='12' cy='14' r='3'%3E%3C/circle%3E%3Cpath d='M12 14v7'%3E%3C/path%3E%3Cpath d='M7 21v-4a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v4'%3E%3C/path%3E%3Cpath d='M5 21v-7a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v7'%3E%3C/path%3E%3C/svg%3E") 12 12, auto`,
    corporate: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Crect x='3' y='3' width='18' height='18' rx='2' ry='2'%3E%3C/rect%3E%3Cpath d='M9 3v18'%3E%3C/path%3E%3Cpath d='M15 3v18'%3E%3C/path%3E%3Cpath d='M3 9h18'%3E%3C/path%3E%3Cpath d='M3 15h18'%3E%3C/path%3E%3C/svg%3E") 12 12, auto`,
  };

  // Define hover styles for different sections
  const hoverStyles = {
    honeymoon: {
      backgroundColor: "#FFD700", // Change background to yellow on hover
      color: "#000000", // Change text color to black on hover
    },
    family: {
      backgroundColor: "#FF8C00", // Change background to orange on hover
      color: "#000000", // Change text color to black on hover
    },
    corporate: {
      backgroundColor: "#20B2AA", // Change background to light sea green on hover
      color: "#000000", // Change text color to black on hover
    },
  };

  return (
    <header
      className="h-screen relative w-full py-8 md:py-12 lg:py-16"
      style={{
        backgroundImage: "url('/Awara.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        cursor: cursorStyle,
      }}
    >
      <div className="absolute inset-0 bg-black opacity-70"></div>
      <div className="relative grid grid-cols-1 md:grid-cols-2 justify-between items-start gap-4 px-4 md:px-6">
        <div className="space-y-4 lg:space-y-6 xl:space-y-8 lg:max-w-[600px]">
          <div className="flex mb-6 lg:mb-8 xl:mb-10">
            <Link href="#" className="inline-flex items-center" prefetch={false}>
              <Image
                src={"/awa.png"}
                width={150}
                height={150}
                alt="image"
                className="h-24 w-24 lg:h-32 lg:w-32 xl:h-40 xl:w-40 text-yellow-500"
              />
            </Link>
            <span className="text-sm lg:text-lg xl:text-xl text-yellow-500 mt-20 ml-[-2vw] lg:mt-24 xl:mt-28 lg:ml-[-1.5vw] xl:ml-[-1vw]">
              By Rehbar.pk
            </span>
          </div>

          <div className="space-y-2 lg:space-y-4 xl:space-y-6">
            <h1 className="text-2xl font-bold tracking-tighter text-white sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
              Your dream itinerary, crafted with you
            </h1>
            <p className="text-sm font-inter text-gray-400 md:text-base lg:text-lg xl:text-xl">
              Awaragardi by Rehbar offers customized packages for honeymoon, family, and corporate trips anywhere in Pakistan.
            </p>
            <p className="text-sm mt-4 font-inter text-gray-400 md:text-base lg:text-lg xl:text-xl">
              If you need help planning your unforgettable tour, Awaragardi will craft a custom itinerary based on your requirements.
            </p>
          </div>
          <Link
            href="#"
            className="inline-flex h-10 items-center justify-center rounded-md bg-[#ffffff] px-6 text-sm font-medium text-gray-900 shadow-sm transition-colors hover:bg-yellow-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 focus-visible:ring-offset-2 lg:h-14 lg:px-10 xl:h-16 xl:px-12"
            prefetch={false}
          >
            Book Now
          </Link>
        </div>
        <div className="flex flex-col sm:flex-col md:flex-col gap-2 lg:gap-4 xl:gap-6 mt-4 lg:mt-0">
          {/* Honeymoon Card */}
          <motion.div
            className="flex items-start gap-2 lg:gap-4 xl:gap-6 rounded-lg bg-gray-900/50 p-4 lg:p-8 xl:p-10 transition-transform duration-300 ease-in-out"
            style={{ cursor: cursorStyles.honeymoon }}
            onMouseEnter={() => setCursorStyle(cursorStyles.honeymoon)}
            onMouseLeave={() => setCursorStyle('')}
            whileHover={{ scale: 1.05, backgroundColor: hoverStyles.honeymoon.backgroundColor, color: hoverStyles.honeymoon.color }}

          >
            <div className="flex h-10 w-10 lg:h-12 lg:w-12 xl:h-14 xl:w-14 items-center justify-center rounded-md bg-yellow-500">
              <MdFavorite className="h-6 w-6 lg:h-8 lg:w-8 xl:h-10 xl:w-10 text-gray-900" />
            </div>
            <div>
              <h3 className="text-base lg:text-lg xl:text-xl font-semibold text-white">Honeymoon Trips</h3>
              <p className="text-sm lg:text-base xl:text-lg font-inter text-[#ffffff]">Romantic getaways for two, tailored to your preferences.</p>
            </div>
          </motion.div>

          {/* Family Card */}
          <motion.div
  className="flex items-start gap-2 lg:gap-4 xl:gap-6 rounded-lg bg-gray-900/50 p-4 lg:p-8 xl:p-10 transition-transform duration-300 ease-in-out"
  style={{ cursor: cursorStyles.family }}
  onMouseEnter={() => setCursorStyle(cursorStyles.family)}
  onMouseLeave={() => setCursorStyle('')}
  whileHover={{ scale: 1.05, backgroundColor: hoverStyles.family.backgroundColor, color: hoverStyles.family.color }}
>
            <div className="flex h-10 w-10 lg:h-12 lg:w-12 xl:h-14 xl:w-14 items-center justify-center rounded-md bg-[#FF8C00]">
              <MdFamilyRestroom className="h-6 w-6 lg:h-8 lg:w-8 xl:h-10 xl:w-10 text-gray-900" />
            </div>
            <div>
              <h3 className="text-base lg:text-lg xl:text-xl font-semibold text-white">Family Vacations</h3>
              <p className="text-sm lg:text-base xl:text-lg font-inter text-[#ffffff]">Create lasting memories with family-friendly trips.</p>
            </div>
          </motion.div>

          {/* Corporate Card */}
          <motion.div
            className="flex items-start gap-2 lg:gap-4 xl:gap-6 rounded-lg bg-gray-900/50 p-4 lg:p-8 xl:p-10 transition-transform duration-300 ease-in-out"
            style={{ cursor: cursorStyles.corporate }}
            onMouseEnter={() => setCursorStyle(cursorStyles.corporate)}
            onMouseLeave={() => setCursorStyle('')}
            whileHover={{ scale: 1.05, backgroundColor: hoverStyles.corporate.backgroundColor, color: hoverStyles.family.color }}

          >
            <div className="flex h-10 w-10 lg:h-12 lg:w-12 xl:h-14 xl:w-14 items-center justify-center rounded-md bg-[#20B2AA]">
              <MdBusiness className="h-6 w-6 lg:h-8 lg:w-8 xl:h-10 xl:w-10 text-gray-900" />
            </div>
            <div>
              <h3 className="text-base lg:text-lg xl:text-xl font-semibold text-white">Corporate Travel</h3>
              <p className="text-sm lg:text-base xl:text-lg font-inter text-[#ffffff]">Professional travel arrangements for your business.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </header>
  );
}
