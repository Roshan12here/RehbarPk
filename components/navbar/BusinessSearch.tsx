"use client";

import { searchProductsBusiness } from "@/lib/server-actions";
import { searchProducts } from "@/lib/Business-server-action";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { PiMagnifyingGlass } from "react-icons/pi";

interface Product {
  id: string;
  name: string;
  slug: string;
  headline: string;
  description: string;
  logo: string;
  website: string;
  twitter: string;
  discord: string | null;  
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  status: string;
}

const Searchs = () => {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [searchResultsb, setSearchResultsb] = useState<Product[]>([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [isDropdownVisibleb, setIsDropdownVisibleb] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const router = useRouter();

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setQuery(inputValue);
    if (inputValue.trim() !== "") {
      const products: Product[] = await searchProductsBusiness(inputValue);
      const businesses: Product[] = await searchProducts(inputValue);
      const activeProducts = products.filter(
        (product) => product.status === "ACTIVE"
      );
      const activeBusinesses = businesses.filter(
        (product) => product.status === "ACTIVE"
      );
      setSearchResults(activeProducts);
      setSearchResultsb(activeBusinesses);
      setIsDropdownVisible(true);
      setIsDropdownVisibleb(true);
    } else {
      setSearchResults([]);
      setSearchResultsb([]);
      setIsDropdownVisible(false);
      setIsDropdownVisibleb(false);
    }
  };

  const groupedResults = searchResults.reduce((acc, product) => {
    if (!acc[product.twitter]) {
      acc[product.twitter] = [];
    }
    acc[product.twitter].push(product);
    return acc;
  }, {} as Record<string, Product[]>);

  const groupedResultsBusinesses = searchResultsb.reduce((acc, product) => {
    if (!acc[product.twitter]) {
      acc[product.twitter] = [];
    }
    acc[product.twitter].push(product);
    return acc;
  }, {} as Record<string, Product[]>);

  const handleItemClick = (slug: string, productName: string) => {
    setQuery(productName);
    setIsDropdownVisible(false);
    router.push(`/Destination/${slug}`);
  };

  const handleItemClickBusiness = (slug: string, productName: string) => {
    setQuery(productName);
    setIsDropdownVisibleb(false);
    router.push(`/Business/${slug}`);
  };
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchInputRef.current &&
        !searchInputRef.current.contains(event.target as Node)
      ) {
        setIsDropdownVisible(false);
        setIsDropdownVisibleb(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-full">
      <div className="w-full max-w-3xl mx-auto">
      <div className="relative w-[75%] max-w-3xl mx-auto">
  <div className="relative flex items-center">
    <input
      type="text"
      placeholder="Search Destinations or Businesses"
      className="w-full text-black py-3 px-6 pr-12 text-base bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-300 transition duration-300"
      value={query}
      onChange={handleSearch}
      ref={searchInputRef}
    />
    <button 
      className="absolute right-0 top-0 h-full px-4 bg-[#006837] text-white rounded-r-lg hover:bg-[#006837] transition duration-300"
      onClick={() => {/* Add search function here */}}
    >
      Search
    </button>
  </div>
</div>

        {(isDropdownVisible && searchResults.length > 0) || (isDropdownVisibleb && searchResultsb.length > 0) ? (
          <div className="absolute mt-2 flex gap-4 w-full">
            {isDropdownVisible && searchResults.length > 0 && (
              <div className="flex-1 bg-white rounded-lg shadow-xl border border-gray-200 max-h-80 overflow-y-auto w-1/2">
                <h1 className="text-xl font-semibold text-green-800 p-2 text-center">Destinations</h1>
                <ul>
                  {Object.entries(groupedResults).map(([city, products]) => (
                    <div key={city} className="p-4 border-b border-gray-100 last:border-b-0">
                      <li
                        className="p-2 hover:bg-gray-50 cursor-pointer text-base font-semibold flex items-center gap-x-2 text-green-600"
                        onClick={() => handleItemClick(city, city)}
                      >
                        <h2>{city}</h2>
                      </li>
                      {products.map((product) => (
                        <li
                          key={product.id}
                          className="ml-4 p-2 hover:bg-gray-50 cursor-pointer text-sm flex items-center gap-x-3 transition duration-200"
                          onClick={() => handleItemClick(product.slug, product.name)}
                        >
                          <Image
                            src={product.logo}
                            alt={product.name}
                            width={40}
                            height={40}
                            className="rounded-full h-10 w-10 object-cover"
                          />
                          <span className="text-black font-medium">{product.name}</span>
                        </li>
                      ))}
                    </div>
                  ))}
                </ul>
              </div>
            )}

            {isDropdownVisibleb && searchResultsb.length > 0 && (
              <div className="flex-1 bg-white rounded-lg shadow-xl border border-gray-200 max-h-80 overflow-y-auto w-1/2">
                <h1 className="text-xl font-semibold text-[#0E793C] p-2 text-center">Businesses</h1>
                <ul>
                  {Object.entries(groupedResultsBusinesses).map(([city, products]) => (
                    <div key={city} className="p-4 border-b border-gray-100 last:border-b-0">
                      <li
                        className="p-2 hover:bg-gray-50 cursor-pointer text-base font-semibold flex items-center gap-x-2 text-green-600"
                        onClick={() => handleItemClickBusiness(city, city)}
                      >
                        <h2>{city}</h2>
                      </li>
                      {products.map((product) => (
                        <li
                          key={product.id}
                          className="ml-4 p-2 hover:bg-gray-50 cursor-pointer text-sm flex items-center gap-x-3 transition duration-200"
                          onClick={() => handleItemClickBusiness(product.slug, product.name)}
                        >
                          <Image
                            src={product.logo}
                            alt={product.name}
                            width={40}
                            height={40}
                            className="rounded-full h-10 w-10 object-cover"
                          />
                          <span className="text-[#0E793C] font-medium ">{product.name}</span>
                        </li>
                      ))}
                    </div>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Searchs;
