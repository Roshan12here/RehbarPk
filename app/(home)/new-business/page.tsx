"use client";

import { ImagesUploader } from "@/components/images-uploader";
import { LogoUploader } from "@/components/logo-uploader";
import Image from "next/image";
import React, { useCallback, useState } from "react";
import { FcIdea } from "react-icons/fc";

import {
  PiPlanet,
  PiTwitterLogoFill,
  PiXCircleFill,
} from "react-icons/pi";
import { Separator } from "@/components/ui/separator";
import { createProduct } from "@/lib/Business-server-action";
import { motion } from "framer-motion";
import { toast } from "sonner";

const categories = [
  "Shopping-Malls",
  "Car-Showroom",
  "Bike-Showroom",
  "Swimming-Pools",
  "Rent-a-Car",
  "Marquee/Banquet-Hall",
  "Catering-Services",
  "Waterfalls",
  "Event-Management",
  "Tour-Operators",
  "Travel-Agents",
  "Art-galleries",
  "Hajj&Umrah-Travels",
  "Advertising-Agencies",
  "Digital-Marketing",
  "Photographers",
  "Health",
  "Pharmacies",
  "Surgical-Stores",
  "Jewellers",
  "Education ",
  "Goods-Transportation",
  "Bus-Service",
  "Real-Estate-Agents",
  "Petrol-Pumps",
  "NGOs",
  "E-commerce",
  "Matrimonial",
  "Departmental-Stores",
  "Grocery-Shops",
  "Mobile-Shops",
  "Pet-Stops",
  "Flower-Shops",
  "Herbal-Shops",
  "Handicraft / Gift Shops",
  "Watch-Shop",
  "Bakeries",
  "Milk-Shops",
  "Book-Shop",
  "Dry-Cleaners",
  "Bike-Mechanics",
  "Car-Mechanics",
  "Massage-Center",
  "Beauty-Salon",
  "Barbar-Shop",
  "Tyre-Shops",
  "Tailors",
  "Electrical-Store",
  "PetrolSenetary-Store",
  "Hardware-Store",
  "Chemical-Store",
  "Gym",
  "Telecommunication",
  "Hostels",
  "Garment-Shops",
  "Shoes-Stores",
  "Cattle-Farms",
  "Factories",
  "Restaurents",
  "Hotels",
  "Home-Services",];


const NewProduct = () => {
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [headline, setHeadline] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [website, setWebsite] = useState("");
  const [twitter, setTwitter] = useState("");


  const [uploadedLogoUrl, setUploadedLogoUrl] = useState<string>("");

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [uploadedProductImages, setUploadedProductImages] = useState<string[]>(
    []
  );

  const handleHeadlineChange = (e: any) => {
    const headlineText = e.target.value.slice(0, 70);
    setHeadline(headlineText);
  };

  const handleWebsiteChange = (e: any) => {
    setWebsite(e.target.value);
  };

  const handleTwitterChange = (e: any) => {
    setTwitter(e.target.value);
  };


  const handleShortDescriptionChange = (e: any) => {
    setShortDescription(e.target.value.slice(0, 1000));
  };

  const handleNameChange = (e: any) => {
    const productName = e.target.value;
    const truncatedName = productName.slice(0, 30);
    setName(truncatedName);

    //create slug from product name

    const slugValue = truncatedName
      .toLowerCase()
      .replace(/\s+/g, "-") // Replace spaces with hyphens
      .replace(/\./g, "-"); // Replace periods with hyphens in the slug
    setSlug(slugValue);
  };

  const handleCategoryToggle = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories((prevCategories) =>
        prevCategories.filter((prevCategory) => prevCategory !== category)
      );
    } else if (selectedCategories.length < 3) {
      setSelectedCategories((prevCategories) => [...prevCategories, category]);
    }
  };

  const handleLogoUpload = useCallback((url: any) => {
    setUploadedLogoUrl(url);
  }, []);

  const handleProductImagesUpload = useCallback((urls: string[]) => {
    setUploadedProductImages(urls);
  }, []);

  const nextStep = useCallback(() => {
    if (step === 1 && name.length < 4) {
      toast(
        <>
          <div className="flex items-center gap-4  mx-auto">
            <PiXCircleFill className="text-red-500 text-3xl" />
            <div className="text-md font-semibold">
              Please enter at least 4 characters for the product name.
            </div>
          </div>
        </>,
        {
          position: "top-center",
        }
      );

      return;
    }

    

    if (step === 3 && headline.length < 10) {
      toast(
        <>
          <div className="flex items-center gap-4  mx-auto">
            <PiXCircleFill className="text-red-500 text-3xl" />
            <div className="text-md font-semibold">
              Please enter at least 10 characters for the headline.
            </div>
          </div>
        </>,
        {
          position: "top-center",
        }
      );
      return;
    }
    if (step === 3 && shortDescription.length < 20) {
      toast(
        <>
          <div className="flex items-center gap-4  mx-auto">
            <PiXCircleFill className="text-red-500 text-3xl" />
            <div className="text-md font-semibold">
              Please enter at least 20 characters for the short description.
            </div>
          </div>
        </>,
        {
          position: "top-center",
        }
      );
      return;
    }

    if (step === 4 && !uploadedLogoUrl) {
      toast(
        <>
          <div className="flex items-center gap-4  mx-auto">
            <PiXCircleFill className="text-red-500 text-3xl" />
            <div className="text-md font-semibold">
              Please upload a logo for the product.
            </div>
          </div>
        </>,
        {
          position: "top-center",
        }
      );
      return;
    }

    if (step === 4 && uploadedProductImages.length < 1) {
      toast(
        <>
          <div className="flex items-center gap-4  mx-auto">
            <PiXCircleFill className="text-red-500 text-3xl" />
            <div className="text-md font-semibold">
              Upload at least 3 images for the product.
            </div>
          </div>
        </>,
        {
          position: "top-center",
        }
      );
      return;
    }

   
    if (step == 5 && !website && !twitter ) {
      toast(
        <>
          <div className="flex items-center gap-4  mx-auto">
            <PiXCircleFill className="text-red-500 text-3xl" />
            <div className="text-md font-semibold">
              Please enter correct Address
            </div>
          </div>
        </>,
        {
          position: "top-center",
        }
      );
      return;
    }

    setStep(step + 1);
  }, [
    step,
    name,
    selectedCategories,
    headline,
    shortDescription,
    uploadedLogoUrl,
    uploadedProductImages,
    website,
    twitter,
  ]);




  const prevStep = useCallback(() => {
    setStep(step - 1);
  }, [step]);

  const handleGoToProducts = () => {
    window.location.href = "/my-products";
  };

  const submitAnotherProduct = () => {
    setStep(1);
    setName("");
    setSlug("");
    setHeadline("");
    setShortDescription("");
    setWebsite("");
    setTwitter("");
    setSelectedCategories([]);
    setUploadedProductImages([]);
    setUploadedLogoUrl("");
  };

  const submitProduct = async () => {
    setLoading(true);

    try {
      await createProduct({
        name,
        slug,
        headline,
        website,
        twitter,
        description: shortDescription,
        logo: uploadedLogoUrl,
        images: uploadedProductImages,
        category: selectedCategories,
      });
      setStep(7);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center py-8 md:py-20">
      <div className="px-8 md:w-3/5 md:mx-auto">
        {step === 1 && (
          <motion.div 
          initial={{ opacity: 0, x: "100%" }} // Slide in from the right
          animate={{ opacity: 1, x: 0 }} // Slide to the center
          exit={{ opacity: 0, x: "-100%" }} // Slide out to the left
          transition={{ duration: 0.3 }}


          
          className="space-y-10">
            <h1 className="text-4xl font-semibold"> New Business</h1>
            <p className="text-xl font-light mt-4 leading-8">
              Ready to showcase your Business to the world? You came to the right
              place. Follow the steps below to get started.
            </p>

            <div className="mt-10">
              <h2 className="font-medium">Name of the Business</h2>
              <input
                type="text"
                value={name}
                placeholder="Devsinc"
                maxLength={30}
                className="rounded-xl p-2 w-full mt-2 focus:outline-none border-[#0E793C] border-[1px]"
                onChange={handleNameChange}
              />
              <div className="text-sm text-gray-500 mt-1">
                {name.length} / 30
              </div>
            </div>

            <div className="mt-10">
              <h2 className="font-medium">
                Slug (URL) - This will be used to create a unique URL for
                your Business
              </h2>

              <input
                type="text"
                value={slug}
                className="rounded-xl p-2 w-full mt-2 focus:outline-none border-[#0E793C] border-[1px]"
                readOnly
              />
              <div className="w-full rounded-md p-6 bg-[#0E793C] mt-4 md:flex items-center gap-x-4">
        <FcIdea className="text-5xl text-[#ffffff] mb-4 md:mb-0" />
        <div className="text-[#ffffffff]">
Simply enter the name of your Business. This will be used to create a unique URL for your Business.
        </div>
      </div>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
          initial={{ opacity: 0, x: "100%" }} // Slide in from the right
          animate={{ opacity: 1, x: 0 }} // Slide to the center
          exit={{ opacity: 0, x: "-100%" }} // Slide out to the left
          transition={{ duration: 0.3 }}
          
          className="space-y-10">
            <h1 className="text-4xl font-semibold">
              {" "}
              📊 What category does your Business belong to ?{" "}
            </h1>
            <p className="text-xl font-light mt-4 leading-8">
              Choose a Category  that best fits your Business. This
              will people discover your Business
            </p>

            <div className="mt-10">
              <h2 className="font-medium">Select Categories</h2>
              <div className="grid grid-cols-4 gap-2 pt-4 items-center justify-center">
                {categories.map((category, index) => (
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
          Note: Select Categories that are relevant to your Business
        </div>
      </div>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
          initial={{ opacity: 0, x: "100%" }} // Slide in from the right
          animate={{ opacity: 1, x: 0 }} // Slide to the center
          exit={{ opacity: 0, x: "-100%" }} // Slide out to the left
          transition={{ duration: 0.3 }}
          
          className="space-y-10">
            <div className="text-4xl font-semibold">📝 Business Details</div>
            <p className="text-xl font-light mt-4 leading-8">
              Keep it simple and clear. Describe your Business in a way that
              makes it easy for people to understand what it does.
            </p>

            <div className="mt-10">
              <h2 className="font-medium">Headline</h2>
              <input
                type="text"
                value={headline}
                placeholder="Devsinc | Pakistan Biggest Developer Agency"
                className="rounded-xl p-2 w-full mt-2 focus:outline-none border-[#0E793C] border-[1px]"
                onChange={handleHeadlineChange}
              />

              <div className="text-sm text-gray-500 mt-1">
                {headline.length} / 70
              </div>
            </div>
            <div className="w-full rounded-md p-3 bg-[#0E793C] mt-2 md:flex items-center gap-x-4">
        <FcIdea className="text-5xl text-[#ffffff] mb-4 md:mb-0" />
        <div className="text-[#ffffffff]">
Note: Define your Business in one Line Try to make Eye-catchinh
        </div>
            </div>


            <div className="mt-10">
              <h2 className="font-medium">Short Description</h2>
              <textarea
                className="rounded-xl p-2 w-full mt-2 focus:outline-none border-[#0E793C] border-[1px]"
                rows={8}
                placeholder="Devsinc is one of Pakistan's premier software development agencies, renowned for its exceptional expertise and innovative solutions. Established with a mission to empower businesses through technology, Devsinc has grown to become a significant player in the software development industry. The agency specializes in various services, including custom software development, mobile app development, web development, and IT consulting.
Devsinc's team comprises highly skilled developers, designers, and IT professionals who are committed to delivering top-notch solutions tailored to meet the unique needs of their clients. They leverage cutting-edge technologies and methodologies, ensuring that their solutions are not only robust but also scalable and future-proof."
                maxLength={1000}
                value={shortDescription}
                onChange={handleShortDescriptionChange}
              />

              <div className="text-sm text-gray-500 mt-1">
                {shortDescription.length} / 1000
              </div>
              <div className="w-full rounded-md p-3 bg-[#0E793C] mt-4 md:flex items-center gap-x-4">
        <FcIdea className="text-5xl text-[#ffffff] mb-4 md:mb-0" />
        <div className="text-[#ffffffff]">
        Note: Write a Detailed note on your Business 
        </div>
      </div>
            </div>
          </motion.div>
        )}

        {step === 4 && (
          <motion.div
          initial={{ opacity: 0, x: "100%" }} // Slide in from the right
          animate={{ opacity: 1, x: 0 }} // Slide to the center
          exit={{ opacity: 0, x: "-100%" }} // Slide out to the left
          transition={{ duration: 0.3 }}
          
          className="space-y-10">
            <h1 className="text-4xl font-semibold">
              🖼️ Add images to showcase your Busimessses
            </h1>
            <p className="text-xl font-light mt-4 leading-8">
              Include images that best represent your Destination. This will help
              people understand what your Busimessses looks like.
            </p>

            <div className="mt-10">
              <h2 className="font-medium">Logo</h2>
              <div className="w-full rounded-md p-4 bg-[#0E793C] mt-4 md:flex items-center gap-x-4">
        <FcIdea className="text-5xl text-[#ffffff] mb-4 md:mb-0" />
        <div className="text-[#ffffffff]">
          Note: Please insert your Business Logo 
        </div>
      </div>
              {uploadedLogoUrl ? (
                <div className="mt-2">
                  <Image
                    src={uploadedLogoUrl}
                    alt="logo"
                    width={1000}
                    height={1000}
                    className="rounded-md h-40 w-40 object-cover"
                  />
                </div>
              ) : (
                <LogoUploader
                  endpoint="productLogo"
                  onChange={handleLogoUpload}
                />
              )}
            </div>
            
            <div className="mt-4">
              <div className="font-medium">
                Product Images 
              </div>
              <div className="w-full rounded-md p-4 bg-[#0E793C] mt-4 md:flex items-center gap-x-4">
        <FcIdea className="text-5xl text-[#ffffff] mb-4 md:mb-0" />
        <div className="text-[#ffffffff]">
          Please Insert atleast 3 Images relevant to your Business. These Images will further Showcase your Busimessses. 
        </div>
      </div>
              {uploadedProductImages.length > 0 ? (
                <div className="mt-2 md:flex gap-2 space-y-4 md:space-y-0">
                  {uploadedProductImages.map((url, index) => (
                    <div key={index} className="relative  md:w-40 h-40 ">
                      <Image
                        priority
                        src={url}
                        alt="Uploaded Product Image"
                        layout="fill"
                        objectFit="cover"
                        className="rounded-md"
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <ImagesUploader
                  endpoint="productImages"
                  onChange={handleProductImagesUpload}
                />
              )}

            </div>
          </motion.div>
        )}

     
        {step === 5 && (
          <motion.div
          initial={{ opacity: 0, x: "100%" }} // Slide in from the right
          animate={{ opacity: 1, x: 0 }} // Slide to the center
          exit={{ opacity: 0, x: "-100%" }} // Slide out to the left
          transition={{ duration: 0.3 }}
          
          className="space-y-10">
            <h1 className="text-4xl font-semibold">Additional InFormation </h1>
            <p className="text-xl font-light mt-4 leading-8">
              Add additional information about your business.
            </p>

            <div className="mt-10">
              <div className="font-medium flex items-center gap-x-2">
                <PiPlanet className="text-2xl text-gray-600" />
                <span>Website</span>
              </div>

              <input
                type="text"
                value={website}
                className="rounded-xl p-2 w-full mt-2 focus:outline-none border-[#0E793C] border-[1px]"
                placeholder="https://www.yourdomain.com"
                onChange={handleWebsiteChange}
              />
            </div>

            <div className="mt-10">
              <div className="font-medium flex items-center gap-x-2">
              <PiPlanet className="text-2xl text-gray-600" />
                <div>Location</div>
              </div>

              <input
                placeholder="HeadMarala,Sialkot"
                type="text"
                className="rounded-xl p-2 w-full mt-2 focus:outline-none border-[#0E793C] border-[1px]"
                value={twitter}
                onChange={handleTwitterChange}
              />
            </div>
          </motion.div>
        )}

        {step === 6 && (
          <motion.div 
          initial={{ opacity: 0, x: "100%" }} // Slide in from the right
          animate={{ opacity: 1, x: 0 }} // Slide to the center
          exit={{ opacity: 0, x: "-100%" }} // Slide out to the left
          transition={{ duration: 0.3 }}
          
          
          className="space-y-10">
            <h1 className="text-4xl font-semibold"> 🔍 Review and submit</h1>
            <p className="text-xl font-light mt-4 leading-8">
              Review the details of your Busimessses and submit it to the world.
              Your Busimessses will be reviewed by our team before it goes live.
            </p>

            <div className="mt-10 grid grid-cols-2 gap-8">
              <div className="">
                <div className="font-semibold">Name of the Busimessses</div>
                <div className=" mt-2 text-gray-600">{name}</div>
              </div>

              <div className="">
                <div className="font-semibold">Slug ( URL ) </div>
                <div className=" mt-2 text-gray-600">{slug}</div>
              </div>

              <div className="">
                <div className="font-semibold">Category</div>
                <div className="  mt-2 text-gray-600">
                  {selectedCategories.join(", ")}
                </div>
              </div>

              <div>
                <div className="font-semibold">Website URL</div>
                <div className=" mt-2 text-gray-600">{website}</div>
              </div>

              <div className="">
                <div className="font-semibold">Headline</div>
                <div className="  mt-2 text-gray-600">{headline}</div>
              </div>
              <div className="">
                <div className="font-semibold">Short description</div>
                <div className=" mt-2 text-gray-600 ">{shortDescription}</div>
              </div>

              <div>
                <div className="font-semibold">Twitter</div>
                <div className=" mt-2 text-gray-600">{twitter}</div>
              </div>
           
              <div className="cols-span-2">
                <div className="font-semibold">Busimessses Images</div>
                <div className="mt-2 md:flex gap-2 w-full">
                  {uploadedProductImages.map((url, index) => (
                    <div key={index} className="relative w-28 h-28">
                      <Image
                        priority
                        src={url}
                        alt="Uploaded Product Image"
                        layout="fill"
                        objectFit="cover"
                        className="rounded-md"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {step === 7 && (
          <div className="space-y-10">
            <div className="text-4xl font-semibold"> Congratulations 🎉 </div>
            <div className="text-xl font-light mt-4 leading-8 ">
              Your Busimesss has been successfully submitted. Our team will review
              it and get back to you soon.
            </div>

            <div className="flex flex-col  gap-4">
              <div
                onClick={handleGoToProducts}
                className="bg-green-600 text-white py-2 px-4
                 rounded mt-4 flex w-60 justify-center items-center cursor-pointer"
              >
                Go to your Businesses
              </div>

              <Separator />

              <div
                onClick={submitAnotherProduct}
                className="text-green-600 py-2 px-4 rounded mt-4 
                flex w-60 justify-center items-center cursor-pointer"
              >
                Submit another Destination
              </div>
            </div>
          </div>
        )}

        {step !== 7 && (
          <>
            <div className="flex justify-between items-center mt-10">
              {step !== 1 && (
                <button onClick={prevStep} className="text-gray-600">
                  Previous
                </button>
              )}

              <div className="flex items-center">
                {step === 6 ? (
                  <button
                    onClick={submitProduct}
                    className="bg-green-600 text-white py-2 px-4 rounded-md mt-4 items-end"
                  >
                    Submit
                  </button>
                ) : (
                  <button
                    onClick={nextStep}
                    className="bg-green-600 text-white py-2 px-4 rounded-md mt-4 items-end"
                  >
                    {step === 6 ? "Submit" : "Continue"}
                  </button>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default NewProduct;
