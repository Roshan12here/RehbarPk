import React from "react";
import { getCategories } from "@/lib/Business-server-action";
import Categories from "../ActivedesCategories";
import ActiveProducts from "../active-products";
import { getActiveProducts } from "@/lib/server-actions";
import { Button } from "./button";

interface Props {
  activeProducts : any;
}

const Box : React.FC<Props> = async ({ activeProducts}) => {
  return (
    <div className="h-screen w-full bg-cover bg-center mt-12">
      <div className="flex flex-col items-center h-full bg-cover bg-center">
        <div className="relative flex flex-col items-center w-full h-full bg-[#ffffff]">
          <div className="flex flex-row justify-between w-full px-4 sm:px-8"> 
            <div className="flex flex-col mt-6 ">
              <div className="text-lg font-normal text-[#afafaf]">Destinations</div>
              <div className="w-24 h-px bg-[#afafaf] mt-1"></div>
              <p className="font-bold mt-4 text-black text-xl md:text-3xl">
              Explore Top Places <br /> on Rehbar
              </p>
            </div>
            <div className="text-sm mt-[14vh] w-[80%] sm:w-[60%] mx-auto">
              <p className="text-[#898989]">
              If you want to visit a place but don’t know if it worth
                traveling, we have listed all the best traveling spots in
                Pakistan. You can look at what others are saying and plan
                accordingly.
                              </p>
            </div>
          </div>
          <Categories />
          <ActiveProducts activeProducts={activeProducts} />
  
        </div>
      </div>
    </div>
  );
};
export default Box;
