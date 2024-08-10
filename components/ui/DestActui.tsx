import React from "react";
import { getCategories } from "@/lib/Business-server-action";
import Categories from "./CtegoryBusinessesui";
import ActiveProducts from "../active-Business";
import { getActiveBusiness } from "@/lib/Business-server-action";
import { Button } from "./button";


interface Props { 
  ActivEPr : any;
}

const Box : React.FC<Props> = async ({ ActivEPr}) =>  {
  return (
    <div className="h-screen w-full bg-cover bg-center mt-12">
    <div className="flex flex-col items-center h-full bg-cover bg-center">
      <div className="relative flex flex-col items-center w-full h-full bg-[#f5f3f3]">
        <div className="flex flex-row justify-between w-full px-4 sm:px-8"> 
          <div className="flex flex-col mt-6 ">
            <div className="text-lg font-normal text-[#afafaf]">Businesses</div>
            <div className="w-24 h-px bg-[#afafaf] my-1"></div>
            <p className="font-bold mt-4 text-black text-xl md:text-3xl">
              Explore Best Businesses <br /> on Rehbar
            </p>
          </div>
          <div className="text-sm mt-[14vh] w-[80%] sm:w-[60%] mx-auto">
            <p className="text-[#898989]">
              Finding a reliable business is hard. Rehbar makes it simple. Search any business in Pakistan, see reviews, and decide confidently. Also, add your business to attract more customers.
            </p>
          </div>
        </div>
        <Categories />
        <ActiveProducts activeProducts={ActivEPr} />
      
      </div>
    </div>
  </div>  );
};

export default Box;
