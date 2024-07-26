"use client";

import { useState, useEffect } from "react";
import { getCategories, getAllCities } from "@/lib/server-actions";
import Link from "next/link";
import { getProductsByCity } from "@/lib/server-actions";

const Categories = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [loadingCities, setLoadingCities] = useState(true); // Add loading state for cities

  
  useEffect(() => {
    const fetchCategories = async () => {
      const result = await getCategories();
      setCategories(result);
    };

    const fetchCities = async () => {
      try {
        const result = await getAllCities();
        console.log(result);  // Log the result to verify cities
        setCities(result);
      } catch (error) {
        console.error("Failed to fetch cities:", error);  // Error handling
      } finally {
        setLoadingCities(false); // Set loading to false after fetching cities
      }
    };

    fetchCategories();
    fetchCities();
  }, []);

  return (
    <div className="xl:w-3/5 w-4/5 pt-6 md:py-10 mx-auto px-6 md:px-0">
      <div className="bg-gray-100 rounded-md w-full p-10 shadow-md mb-10">
        <h1 className="text-4xl font-semibold">Categories</h1>
        <p className="text-gray-500 pt-2">
          Discover new products in different categories and find what you need
          to make your life easier.
        </p>

        <div className="mt-6">
          <h2 className="text-2xl font-semibold">Cities</h2>
          {loadingCities ? (
            <p>Loading cities...</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-4">
              {cities.length > 0 ? (
                cities.map((city, index) => (
                  <Link
                    href={`/city/${city.toLowerCase()}`}
                    key={index}
                    className="p-3 bg-green-200 rounded-md text-center shadow hover:bg-green-300 transition duration-300"
                  >
                    {city}
                  </Link>
                ))
              ) : (
                <p>No cities available</p>
              )}
            </div>
          )}
        </div>
      </div>

      <div>
        <div className="pt-6 grid grid-cols-2 gap-6">
          {categories.map((category: any) => (
            <Link
              href={`/category/${category.name.toLowerCase()}`}
              key={category.id}
              className="space-x-10 p-5 rounded-xl shadow-md bg-orange-100 hover:scale-105 hover:cursor-pointer transition-transform duration-300 ease-in-out"
            >
              <div className="md:flex justify-between items-center">
                <h2 className="md:text-2xl font-semibold">{category.name}</h2>
                <p className="hover:underline cursor-pointer text-sm text-gray-700">
                  View all products
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;
