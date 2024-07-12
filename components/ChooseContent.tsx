"use client"

import { useState } from 'react';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { useRouter } from 'next/navigation';

const AuthContent = () => {
  const [selectedOption, setSelectedOption] = useState('default');
  const router = useRouter();

  const handleNextClick = () => {
    if (selectedOption === 'default') {
      router.push('/new-product');
    } else if (selectedOption === 'comfortable') {
      router.push('/new-business');
    }
  };

  return (
    <div className="flex items-center justify-center bg-gray-100">
      <div className="flex items-center justify-center flex-col p-6 bg-white rounded-lg shadow-md w-100">
        <div className="flex flex-col items-center justify-center text-center font-bold text-2xl">
          What Do You Want To Post
        </div>

        <div className="flex flex-col gap-4 mt-6 w-full">
          <RadioGroup
            defaultValue={selectedOption}
            className="flex w-full justify-between"
            onValueChange={setSelectedOption}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="default"
                id="r1"
                className="hover:scale-105 transition-transform duration-300"
              />
              <Label
                className="text-[1.2rem] cursor-pointer hover:text-[#0E793C] transition-colors duration-300"
                htmlFor="r1"
              >
                Destination
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="comfortable"
                id="r2"
                className="hover:scale-105 transition-transform duration-300"
              />
              <Label
                className="text-[1.2rem] cursor-pointer hover:text-[#0E793C] transition-colors duration-300"
                htmlFor="r2"
              >
                Businesses
              </Label>
            </div>
          </RadioGroup>
          <button
            className="text-white mt-6 bg-[#0E793C] h-[6vh] w-full text-lg rounded-lg transition-all duration-300 ease-in-out transform hover:bg-[#ffffff] hover:text-[#0E793C] hover:border-green-900 hover:scale-105"
            onClick={handleNextClick}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthContent;
