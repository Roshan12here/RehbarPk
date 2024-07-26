"use client"

import React from 'react'
import { getAllCities } from '@/lib/Business-server-action'
import { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import { FcIdea } from 'react-icons/fc';
import Link from 'next/link';

// src/hooks/useCities.js

export const useCities = () => {
  const [cities, setCities] = useState<string[]>([]);

  useEffect(() => {
    const fetchCities = async () => {
      const citiesData: string[] = await getAllCities();
      setCities(citiesData);
    };

    fetchCities();
  }, []);

  return cities;
};


export const Allcities =  () => {
const citiess =  useCities();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [products, setProducts] = useState<any[]>([]);

  
  const handleCategoryToggle = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories((prevCategories) =>
        prevCategories.filter((prevCategory) => prevCategory !== category)
      );
    } else if (selectedCategories.length < 3) {
      setSelectedCategories((prevCategories) => [...prevCategories, category]);
    }
  };
    return (
      <motion.div
      initial={{ opacity: 0, x: "100%" }} // Slide in from the right
      animate={{ opacity: 1, x: 0 }} // Slide to the center
      exit={{ opacity: 0, x: "-100%" }} // Slide out to the left
      transition={{ duration: 0.3 }}
      className="space-y-10 p-6 max-w-7xl mx-auto"
    >
      <h1 className="text-4xl font-semibold text-center">
        📊 From Which City Are you Searching For Business
      </h1>
      <p className="text-xl font-light mt-4 leading-8 text-center">
        
You can Pick a City where you Looking For a Busimess
      </p>

      <div className="mt-10">
        <h2 className="font-medium text-center">Select Cities</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-4">
          {citiess.map((category, index) => (
            <motion.div
              key={index}
              className="flex border rounded-full p-2 cursor-pointer"
              onClick={() => handleCategoryToggle(category)}
              whileTap={{ scale: 0.9 }}
            >
              <Link href={`/Businesses/${category.toLowerCase()}`}>
              <div
                className={`text-xs md:text-sm w-full text-center font-semibold transition-colors duration-300 ${
                  selectedCategories.includes(category)
                  ? "bg-green-600 text-white rounded-full"
                  : "bg-gray-200 text-black"
                }`}
                >
                {category}
              </div>
                </Link>
            </motion.div>
          ))}
        </div>
        <div className="w-full rounded-md p-3 bg-[#0E793C] mt-4 flex items-center gap-x-4">
          <FcIdea className="text-5xl text-[#ffffff] mb-4 md:mb-0" />
          <div className="text-white">
            Note: Select Cities that are relevant to your Business.
          </div>
        </div>
      </div>

      {products.length > 0 && (
        <div className="mt-10">
          <h2 className="font-medium text-center">Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
            {products.map((product, index) => (
              <div key={index} className="p-4 border rounded shadow-lg">
                <h3 className="font-semibold">{product.name}</h3>
                <p className="mt-2">{product.headline}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.div>

  )
}
