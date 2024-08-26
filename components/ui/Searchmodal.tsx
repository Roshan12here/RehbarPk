import React from 'react';
import Searchs from '../navbar/BusinessSearch';

const Searchmodal = () => {
  return (
    <div className="flex flex-col items-center bg-transparent p-5">
      <h1 className="text-xl sm:text-2xl lg:text-3xl font-medium py-2 text-[#ffffff] text-center">
        Search for the Top Businesses and Destinations in Pakistan
      </h1>

      <div className="w-full mt-4 max-w-lg sm:max-w-xl lg:max-w-2xl flex flex-col sm:flex-row">
        <Searchs />
      </div>
    </div>
  );
};

export default Searchmodal;
