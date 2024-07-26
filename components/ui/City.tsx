import React from 'react'
import { motion } from "framer-motion";
import { useState } from 'react';
import { FcIdea } from 'react-icons/fc';
const City = () => {

    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

    const handleCategoryToggle = (category: string) => {
        if (selectedCategories.includes(category)) {
          setSelectedCategories((prevCategories) =>
            prevCategories.filter((prevCategory) => prevCategory !== category)
          );
        } else if (selectedCategories.length < 3) {
          setSelectedCategories((prevCategories) => [...prevCategories, category]);
        }
      };

    const cities = [
        "Islamabad", "Karachi", "Lahore", "Rawalpindi", "Peshawar", "Quetta",
        "Multan", "Faisalabad", "Gujranwala", "Gujrat", "Sialkot", "Bahawalpur",
        "Okara", "Jhelum", "Chakwal", "Sargodha", "Rahim Yar Khan", "Jhang",
        "Hyderabad", "Sukkur", "Khairpur", "Nawabshah", "Mardan", "Nowshera",
        "Mansehra", "Abbottabad", "Swabi", "Charsadda", "Kohat", "Gwadar",
        "Khuzdar", "Pakpattan"
      ];

  return (
    <motion.div
    initial={{ opacity: 0, x: "100%" }} // Slide in from the right
    animate={{ opacity: 1, x: 0 }} // Slide to the center
    exit={{ opacity: 0, x: "-100%" }} // Slide out to the left
    transition={{ duration: 0.3 }}
    
    className="space-y-10">
      <h1 className="text-4xl font-semibold">
        {" "}
        📊 What category does your Destination belong to ?{" "}
      </h1>
      <p className="text-xl font-light mt-4 leading-8">
        Choose a category that best fits your Destination. This
        will people discover your Destination
      </p>

      <div className="mt-10">
        <h2 className="font-medium">Select Categories</h2>
        <div className="grid grid-cols-4 gap-2 pt-4 items-center justify-center">
          {cities.map((category, index) => (
            <motion.div
              key={index}
              className="flex border rounded-full"
              onClick={() => handleCategoryToggle(category)}
              whileTap={{ scale: 0.9 }}
            >
              <div
                className={`text-xs md:text-sm p-2 cursor-pointer w-full text-center
               ${
                 selectedCategories.includes(category)
                   ? "bg-green-600 text-white rounded-full"
                   : "text-black"
               }`}
              >
                {category}
              </div>
            </motion.div>
          ))}
        </div>
                <div className="w-full rounded-md p-3 bg-[#0E793C] mt-4 md:flex items-center gap-x-4">
  <FcIdea className="text-5xl text-[#ffffff] mb-4 md:mb-0" />
  <div className="text-[#ffffffff]">
    Note: Select Cities  that are relevant to your Destination
  </div>
</div>
      </div>
    </motion.div>
)
}

export default City