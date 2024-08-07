"use client";

import { useState, useEffect } from "react";
import { getCategories } from "@/lib/server-actions";
import Link from "next/link";

const Categories = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const result = await getCategories();
        // Map the result to extract category names as strings
        const categoryNames = result.map((category) => category.name);
        setCategories(categoryNames);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
        setError("Failed to fetch categories.");
      } finally {
        setLoading(false); // Set loading to false after fetching categories
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return <div>Loading categories...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="flex flex-wrap justify-center gap-2 my-8">
      {categories.map((category, index) => (
        <Link
          key={index}
          href={`/category/${category}`}
          className="flex items-center justify-center bg-white rounded-full shadow-md px-4 py-2 text-[#878787] text-sm md:text-lg"
        >
          {category}
        </Link>
      ))}
    </div>
  );
};

export default Categories;
