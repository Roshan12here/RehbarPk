"use client";

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
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  status: string;
}

const Search = () => {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [displayedCities, setDisplayedCities] = useState(new Set<string>());

  const router = useRouter();

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setQuery(inputValue);
    if (inputValue.trim() !== "") {
      const products: Product[] = await searchProducts(inputValue);
      //filter out the only active products
      const activeProducts = products.filter(
        (product) => product.status === "ACTIVE"
      );
      setSearchResults(activeProducts);
      setIsDropdownVisible(true);
    } else {
      setSearchResults([]);
      setIsDropdownVisible(false);
    }
  };

  const groupedResults = searchResults.reduce((acc, product) => {
    if (!acc[product.twitter]) {
      acc[product.twitter] = [];
    }
    acc[product.twitter].push(product);
    return acc;
  }, {} as Record<string, Product[]>);


  const handleItemClick = (slug: string, productName: string) => {
    setQuery(productName);
    setIsDropdownVisible(false); 
    router.push(`/product/${slug}`);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchInputRef.current &&
        !searchInputRef.current.contains(event.target as Node)
      ) {
        setIsDropdownVisible(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleItemClickCity = (twitter : string) => {
    setQuery(twitter);
    setIsDropdownVisible(false);
    router.push(`/Destinations/${twitter}`);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchInputRef.current &&
        !searchInputRef.current.contains(event.target as Node)
      ) {
        setIsDropdownVisible(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className=" max-w-3xl mx-auto">
      <div className="relative">
        <input
          type="text"
          placeholder="Search destinations, experiences, or local businesses..."
          className="w-[80%] py-4 px-6 pr-12 text-lg bg-white border-2 border-green-500 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-green-300 transition duration-300"
          value={query}
          onChange={handleSearch}
          ref={searchInputRef}
        />
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
          <PiMagnifyingGlass className="text-2xl text-green-500" />
        </div>
      </div>

      {isDropdownVisible && searchResults.length > 0 && (
        <ul className="mt-2 bg-white rounded-lg shadow-xl border border-gray-200 max-h-96 overflow-y-auto">
          {Object.entries(groupedResults).map(([city, products]) => (
            <div key={city} className="p-4 border-b border-gray-100 last:border-b-0">
              <li
                className="p-2 hover:bg-gray-50 cursor-pointer text-base font-semibold flex items-center gap-x-2 text-green-600"
                onClick={() => handleItemClickCity(city)}
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
                  <span className="font-medium">{product.name}</span>
                </li>
              ))}
            </div>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Search;
