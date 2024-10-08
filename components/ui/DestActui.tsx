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
    <div className="h-[100vh]  sm:h-screen md:h-screen lg:h-[115vh] xl:h-[115vh]  w-full bg-cover bg-center mt-12">
    <div className="flex flex-col items-center h-full bg-cover bg-center">
      <div className="relative flex flex-col items-center w-full h-full bg-[#f5f3f3]">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full px-4 sm:px-8">
  <div className="flex flex-col mt-6">
    <div className="text-lg font-normal text-[#afafaf]">Businesses</div>
    <div className="w-24 h-px bg-[#afafaf] mt-1"></div>
    <p className="font-bold mt-4 text-black text-3xl md:text-4xl">
    Explore Best Businesses <br/>
    on Rehbar    </p>
  </div>
  <div className="text-sm  w-[80%]  mt-[2vh] sm:mt-[2vh] md:mt-[2vh] lg:mt-[12vh]   lg:mx-0">
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
