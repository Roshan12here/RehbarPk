"use client";

import { ImagesUploader } from "@/components/images-uploader";
import { LogoUploader } from "@/components/logo-uploader";
import Image from "next/image";
import React, { useCallback, useState } from "react";
import { FcIdea } from "react-icons/fc";

import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import {
  PiCalendar,
  PiDiscordLogoFill,
  PiPlanet,
  PiTwitterLogoFill,
  PiXCircleFill,
} from "react-icons/pi";
import { Separator } from "@/components/ui/separator";
import { createProduct } from "@/lib/server-actions";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Input } from "@headlessui/react";
import { Card, CardTitle } from "@/components/ui/card";
import  ComboboxDemo  from "@/components/EnterCity";

const categories = [
  "Town",
  "Villege",
  "Parks",
  "Zoo",
  "Forests",
  "Mountains",
  "Beaches",
  "Waterfalls",
  "Historical sites",
  "Forts",
  "Museums",
  "Art galleries",
  "Monuments",
  "Shopping Centres",
  "Hiking",
  "Trekking",
  "Skiing",
  "Rafting",
  "Churches",
  "Mosques",
  "Shrines",
];

const cities = [
  { value: "islamabad", label: "Islamabad" },
  { value: "karachi", label: "Karachi" },
  { value: "lahore", label: "Lahore" },
  { value: "rawalpindi", label: "Rawalpindi" },
  { value: "peshawar", label: "Peshawar" },
  { value: "quetta", label: "Quetta" },
  { value: "multan", label: "Multan" },
  { value: "faisalabad", label: "Faisalabad" },
  { value: "gujranwala", label: "Gujranwala" },
  { value: "gujrat", label: "Gujrat" },
  { value: "sialkot", label: "Sialkot" },
  { value: "bahawalpur", label: "Bahawalpur" },
  { value: "okara", label: "Okara" },
  { value: "jhelum", label: "Jhelum" },
  { value: "chakwal", label: "Chakwal" },
  { value: "sargodha", label: "Sargodha" },
  { value: "rahim-yar-khan", label: "Rahim Yar Khan" },
  { value: "jhang", label: "Jhang" },
  { value: "hyderabad", label: "Hyderabad" },
  { value: "sukkur", label: "Sukkur" },
  { value: "khairpur", label: "Khairpur" },
  { value: "nawabshah", label: "Nawabshah" },
  { value: "mardan", label: "Mardan" },
  { value: "nowshera", label: "Nowshera" },
  { value: "mansehra", label: "Mansehra" },
  { value: "abbottabad", label: "Abbottabad" },
  { value: "swabi", label: "Swabi" },
  { value: "charsadda", label: "Charsadda" },
  { value: "kohat", label: "Kohat" },
  { value: "gwadar", label: "Gwadar" },
  { value: "khuzdar", label: "Khuzdar" },
  { value: "pakpattan", label: "Pakpattan" },
]


const NewProduct = () => {
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [Unique , SetUnique] = useState("");
  const [VisitorsExpect , SetVisitorsExpect] = useState("");
  const [Amenities , SetAmenities] = useState("");
  const [Historical , SetHistorical] = useState("");
  const [InterestStories , SetInterestStories] = useState("");
  const [WhatBringing , SetWhatBringing] = useState("");
  const [ScenicSpots , SetScenicSpots] = useState("");
  const [MemorableExperiences , SetMemorableExperiences] = useState("");
  const [BestTimetoVisit , SetBestTimetoVisit] = useState("");
  const [KidsFriendly , SetKidsFriendly] = useState("");
  const [AnyMessageForVisitors , SetAnyMessageForVisitors] = useState("");
  const [headline, setHeadline] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [website, setWebsite] = useState("");
  const [twitter, setTwitter] = useState("");
  const [discord, setDiscord] = useState("");

  const [date, setDate] = React.useState<Date | undefined>(new Date());

  const [uploadedLogoUrl, setUploadedLogoUrl] = useState<string>("");

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [uploadedProductImages, setUploadedProductImages] = useState<string[]>(
    []
  );

  const handleHeadlineChange = (e: any) => {
    const headlineText = e.target.value.slice(0, 200);
    setHeadline(headlineText);
  };

  const handleWebsiteChange = (e: any) => {
    setWebsite(e.target.value);
  };

  const handleTwitterChange = (e: any) => {
    setTwitter(e.target.value);
  };

  const handleUniqueChange = (e: any) => {
    SetUnique(e.target.value);
  };

  const handleVisitorsExpectChange = (e: any) => {
    SetVisitorsExpect(e.target.value);
  };

  const handleAmenitiesChange = (e: any) => {
    SetAmenities(e.target.value);
  };

  const handleHistoricalChange = (e: any) => {
    SetHistorical(e.target.value);
  };

  const handleInterestStoriesChange = (e: any) => {
    SetInterestStories(e.target.value);
  };

  const handleWhatBringingChange = (e: any) => {
    SetWhatBringing(e.target.value);
  };

  const handleScenicSpotsChange = (e: any) => {
    SetScenicSpots(e.target.value);
  };

  const handleMemorableExperiencesChange = (e: any) => {
    SetMemorableExperiences(e.target.value);
  };

  const handleBestTimetoVisitChange = (e: any) => {
    SetBestTimetoVisit(e.target.value);
  };  

  const handleKidsFriendlyChange = (e: any) => {
    SetKidsFriendly(e.target.value);
  };

  const handleAnyMessageForVisitorsChange = (e: any) => {
    SetAnyMessageForVisitors(e.target.value);
  };


  const handleDiscordChange = (e: any) => {
    setDiscord(e.target.value);
  };

  const handleShortDescriptionChange = (e: any) => {
    setShortDescription(e.target.value.slice(0, 2000));
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

    if (step === 5 && !uploadedLogoUrl) {
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

    if (step === 5 && uploadedProductImages.length < 1) {
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

    if (step == 7 && !website && !twitter && !discord) {
      toast(
        <>
          <div className="flex items-center gap-4  mx-auto">
            <PiXCircleFill className="text-red-500 text-3xl" />
            <div className="text-md font-semibold">
              Please enter correct address of this Destination
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
    Unique,
VisitorsExpect,
Amenities,
Historical,
InterestStories,
WhatBringing,
ScenicSpots,
MemorableExperiences,
BestTimetoVisit,
KidsFriendly,
AnyMessageForVisitors,
    shortDescription,
    uploadedLogoUrl,
    uploadedProductImages,
    date,
    website,
    twitter,
    discord,
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
    setDate(new Date());
    setWebsite("");
    SetUnique("")
    SetVisitorsExpect("")
    SetAmenities("")
    SetHistorical("")
    SetInterestStories("")
    SetWhatBringing("")
    SetScenicSpots("")
    SetMemorableExperiences("")
    SetBestTimetoVisit("")
    SetKidsFriendly("")
    SetAnyMessageForVisitors("")
    setHeadline("")
    setShortDescription("")
    setTwitter("");
    setDiscord("");
    setSelectedCategories([]);
    setUploadedProductImages([]);
    setUploadedLogoUrl("");
  };

  const submitProduct = async () => {
    setLoading(true);
    const formattedDate = date ? format(date, "MM/dd/yyyy") : "";

    try {
      await createProduct({
        name,
        slug,
        headline,
        website,
        Unique,
        VisitorsExpect,
        Amenities,
        Historical,
        InterestStories,
        WhatBringing,
        ScenicSpots,
        MemorableExperiences,
        BestTimetoVisit,
        KidsFriendly,
        AnyMessageForVisitors,
        twitter,
        discord,
        description: shortDescription,
        logo: uploadedLogoUrl,
        releaseDate: formattedDate,
        images: uploadedProductImages,
        category: selectedCategories,
      });
      setStep(8);
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
            <h1 className="text-4xl font-semibold"> New Destinaton</h1>
            <p className="text-xl font-light mt-4 leading-8">
              Ready to showcase your Destination to the world? You came to the right
              place. Follow the steps below to get started.
            </p>

            <div className="mt-10">
              <h2 className="font-medium">Name of the Destination</h2>
              <input
                type="text"
                value={name}
                maxLength={30}
                placeholder="Head Marala"
                className="p-2 w-full rounded-xl mt-2 focus:outline-none border-[#0E793C] border-[1px]"
                onChange={handleNameChange}
              />
              <div className="text-sm text-gray-500 mt-1">
                {name.length} / 30
              </div>
            </div>

            <div className="mt-10">
              <h2 className="font-medium">
                Slug (URL) - This will be used to create a unique URL for
                your destination
              </h2>

              <input
                type="text"
                
                value={slug}
                className="rounded-xl p-2 w-full mt-2 focus:outline-none border-[#0E793C] border-[1px]"
                readOnly
              />
            </div>
            <div className="w-full rounded-md p-6 bg-[#0E793C] mt-4 md:flex items-center gap-x-4">
        <FcIdea className="text-5xl text-[#ffffff] mb-4 md:mb-0" />
        <div className="text-[#ffffffff]">
Simply enter the name of your Destination. This will be used to create a unique URL for your Destination.
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
              📊 What category does your Destination belong to ?{" "}
            </h1>
            <p className="text-xl font-light mt-4 leading-8">
              Choose a category that best fits your Destination. This
              will people discover your Destination
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
          Note: Select Categories that are relevant to your Destination
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
            <div className="text-4xl font-semibold">📝 Destination Details</div>
            <p className="text-xl font-light mt-4 leading-8">
              Keep it simple and clear. Describe your Destination in a way that
              makes it easy for people to understand what it does.
            </p>

            <div className="mt-10">
              <h2 className="font-medium">Headline</h2>
              <input
                type="text"
                value={headline}
                placeholder=" Faisal Mosque | The Biggest Mosque in Pakistan"
                className=" p-2 w-full mt-2 focus:outline-none border-[#0E793C]  rounded-xl  border-[0.5px]"
                onChange={handleHeadlineChange}
              />

              <div className="text-sm text-gray-500 mt-1">
                {headline.length} / 200
              </div>
      </div>
              <div className="w-full rounded-md p-3 bg-[#0E793C] mt-2 md:flex items-center gap-x-4">
        <FcIdea className="text-5xl text-[#ffffff] mb-4 md:mb-0" />
        <div className="text-[#ffffffff]">
Note: Define your Destination in one Line Try to make Eye-catchinh
        </div>
            </div>

            <div className="mt-10">
              <h2 className="font-medium">Brief Description</h2>
              <textarea
                className=" rounded-xl p-2 w-full mt-2 focus:outline-none border-[#0E793C]  border-[0.5px]"
                rows={8}
                maxLength={2000}
                placeholder="Faisal Mosque, an architectural marvel in Islamabad, Pakistan, stands as one of the largest mosques in the world. Named after the late King Faisal bin Abdul-Aziz of Saudi Arabia, who generously funded its construction, the mosque is a symbol of the strong ties between Pakistan and Saudi Arabia. Designed by the Turkish architect Vedat Dalokay, its unique design eschews traditional domes in favor of a contemporary, angular structure inspired by a Bedouin tent."
                value={shortDescription}
                onChange={handleShortDescriptionChange}
              />

              <div className="text-sm text-gray-500 mt-1">
                {shortDescription.length} / 2000
              </div>
              <div className="w-full rounded-md p-3 bg-[#0E793C] mt-4 md:flex items-center gap-x-4">
        <FcIdea className="text-5xl text-[#ffffff] mb-4 md:mb-0" />
        <div className="text-[#ffffffff]">
        Note: Write a Detailed note on your Destination 
        </div>
      </div>
            </div>
          </motion.div>
        )}

{
  step === 4 && (
    <motion.div
    initial={{ opacity: 0, x: "100%" }} // Slide in from the right
    animate={{ opacity: 1, x: 0 }} // Slide to the center
    exit={{ opacity: 0, x: "-100%" }} // Slide out to the left
    transition={{ duration: 0.5 }}
    className="space-y-10">

    <h1 className="text-4xl font-semibold">Answer these Questions</h1>
<Card className="flex flex-col items-center">
  <CardTitle>What makes this spot special or unique?</CardTitle>
<Input
     type="text"
     value={Unique}
     className="p-2 w-full focus:outline-none mt-4 border-[#0E793C] rounded-xl border-[0.5px]"
     placeholder="e.g Food, picnicking, bird-watching, sightseeing"
     onChange={handleUniqueChange}
/>
</Card>
<Card className="flex flex-col items-center">
  <CardTitle>What can visitors expect to see or do there</CardTitle>
<Input
     type="text"
     value={VisitorsExpect}
     className="p-2 w-full focus:outline-none mt-4 border-[#0E793C] rounded-xl border-[0.5px]"
     placeholder="Water bottles camera etc"
     onChange={handleVisitorsExpectChange}
/>
</Card>
<Card className="flex flex-col items-center">
  <CardTitle> What amenities are available? </CardTitle>
<Input
     type="text"
     value={Amenities}
     className="p-2 w-full focus:outline-none mt-4 border-[#0E793C] rounded-xl border-[0.5px]"
     placeholder="e.g., restrooms, picnic tables, playgrounds, parking"
     onChange={handleAmenitiesChange}
/>
</Card>
<Card className="flex flex-col items-center">
  <CardTitle>Does it has any historical or cultural significance?</CardTitle>
<Input
     type="text"
     value={Historical}
     className="p-2 w-full focus:outline-none mt-4 border-[#0E793C] rounded-xl border-[0.5px]"
     onChange={handleHistoricalChange}
/>
</Card>
<Card className="flex flex-col items-center">
  <CardTitle>Are there any interesting facts about the location?</CardTitle>
<Input
     type="text"
     value={InterestStories}
     className="p-2 w-full focus:outline-none mt-4 border-[#0E793C] rounded-xl border-[0.5px]"
     onChange={handleInterestStoriesChange}
/>
</Card>
<Card className="flex flex-col items-center">
  <CardTitle>What should visitors bring with them?</CardTitle>
<Input
     type="text"
     value={WhatBringing}
     className="p-2 w-full focus:outline-none mt-4 border-[#0E793C] rounded-xl border-[0.5px]"
  placeholder="e.g., water bottles, camera, etc."
  onChange={handleWhatBringingChange}
/>
</Card>
<Card className="flex flex-col items-center">
  <CardTitle>Have you or others had memorable experiences at this location? If so, what were they?</CardTitle>
<Input
     type="text"
     value={MemorableExperiences}
     className="p-2 w-full focus:outline-none mt-4 border-[#0E793C] rounded-xl border-[0.5px]"
    onChange={handleMemorableExperiencesChange}
/>
</Card>
<Card className="flex flex-col items-center">
  <CardTitle>What is the best time of day or year to visit?*</CardTitle>
<Input
     type="text"
     value={BestTimetoVisit}
     className="p-2 w-full focus:outline-none mt-4 border-[#0E793C] rounded-xl border-[0.5px]"
  placeholder="e.g., water bottles, camera, etc."
  onChange={handleBestTimetoVisitChange}
/>
</Card>
<Card className="flex flex-col items-center">
  <CardTitle>Is this place kids friendly?</CardTitle>
<Input
     type="text"
     value={KidsFriendly}
     className="p-2 w-full focus:outline-none mt-4 border-[#0E793C] rounded-xl border-[0.5px]"
  placeholder="e.g., water bottles, camera, etc."
  onChange={handleKidsFriendlyChange}
/>
</Card>
<Card className="flex flex-col items-center">
  <CardTitle>Any message for visitors before they visit</CardTitle>
<Input
     type="text"
     value={AnyMessageForVisitors}
     className="p-2 w-full focus:outline-none mt-4 border-[#0E793C] rounded-xl border-[0.5px]"
  placeholder="e.g., water bottles, camera, etc."
  onChange={handleAnyMessageForVisitorsChange}
/>
</Card>

    </motion.div>
  )
}

        {step === 5 && (
          <motion.div
          initial={{ opacity: 0, x: "100%" }} // Slide in from the right
          animate={{ opacity: 1, x: 0 }} // Slide to the center
          exit={{ opacity: 0, x: "-100%" }} // Slide out to the left
          transition={{ duration: 0.3 }}
          
          className="space-y-10">
            <h1 className="text-4xl font-semibold">
              🖼️ Add images to showcase your Destination
            </h1>
            <p className="text-xl font-light mt-4 leading-8">
              Include images that best represent your Destination. This will help
              people understand what your Destination looks like.
            </p>

            <div className="mt-10">
              <h2 className="font-medium">Front Image</h2>
            <div className="w-full rounded-md p-4 bg-[#0E793C] mt-4 md:flex items-center gap-x-4">
        <FcIdea className="text-5xl text-[#ffffff] mb-4 md:mb-0" />
        <div className="text-[#ffffffff]">
          Note: This image will be used as the main image of your Destination
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
                Destination Images 
              </div>
              <div className="w-full rounded-md p-4 bg-[#0E793C] mt-4 md:flex items-center gap-x-4">
        <FcIdea className="text-5xl text-[#ffffff] mb-4 md:mb-0" />
        <div className="text-[#ffffffff]">
          Note: Please Upload atleast 3 images These Images will Further Showcase your Destination
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

{step === 6 && (
  <motion.div
    initial={{ opacity: 0, x: "100%" }} // Slide in from the right
    animate={{ opacity: 1, x: 0 }} // Slide to the center
    exit={{ opacity: 0, x: "-100%" }} // Slide out to the left
    transition={{ duration: 0.3 }}
    className="space-y-10"
  >
    <h1 className="text-4xl font-semibold">Address</h1>
    <p className="text-2xl font-bold mt-2 text-[#0E793C]">Add Address of your Destination</p>

    <div className="mt-10">
      <div className="font-medium flex items-center gap-x-2">
        <span>State</span>
      </div>
      <input
        type="text"
        value={website}
        className="p-2 w-full mt-2 focus:outline-none border-[#0E793C] rounded-xl border-[0.5px]"
        placeholder="Punjab"
        onChange={handleWebsiteChange}
      />
      <div className="w-full rounded-md p-3 bg-[#0E793C] mt-4 md:flex items-center gap-x-4">
        <FcIdea className="text-5xl text-[#ffffff] mb-4 md:mb-0" />
        <div className="text-[#ffffffff]">
          Note: Make sure to enter the correct state. This will help users locate your destination easily.
        </div>
      </div>
    </div>

    <div className="mt-10">
      <div>
        <h1>City</h1>
        <select
          value={twitter}
          onChange={handleTwitterChange}
          className="p-2 w-full mt-2 focus:outline-none border-[#0E793C] rounded-xl border-[0.5px]"
        >
          <option value="">Select a city</option>
          {cities.map((city) => (
            <option key={city.label} value={city.label}>
              {city.label}
            </option>
          ))}
        </select>
      </div>

      <div className="w-full rounded-md p-3 bg-[#0E793C] mt-4 md:flex items-center gap-x-4">
        <FcIdea className="text-5xl text-[#ffffff] mb-4 md:mb-0" />
        <div className="text-[#ffffffff]">
          Note: Providing the correct city name ensures users can find your destination without confusion.
        </div>
      </div>
    </div>

    <div className="mt-10">
      <div className="font-medium flex items-center gap-x-2">
        <div>Address</div>
      </div>
      <input
        placeholder="Main GT road Near Rehman Bakery"
        type="text"
        className="border-[1px] border-[#0E793C] rounded-xl p-2 w-full mt-2 focus:outline-none"
        value={discord}
        onChange={handleDiscordChange}
      />
      <div className="w-full rounded-md p-3 bg-[#0E793C] mt-4 md:flex items-center gap-x-4">
        <FcIdea className="text-5xl text-[#ffffff] mb-4 md:mb-0" />
        <div className="text-[#ffffffff]">
          Note: A precise address helps users navigate to your destination easily and accurately.
        </div>
      </div>
    </div>
  </motion.div>
)}

        {step === 7 && (
          <motion.div 
          initial={{ opacity: 0, x: "100%" }} // Slide in from the right
          animate={{ opacity: 1, x: 0 }} // Slide to the center
          exit={{ opacity: 0, x: "-100%" }} // Slide out to the left
          transition={{ duration: 0.3 }}
          
          
          className="space-y-10">
            <h1 className="text-4xl font-semibold"> 🔍 Review and submit</h1>
            <p className="text-xl font-light mt-4 leading-8">
              Review the details of your Destination and submit it to the world.
              Your Destination will be reviewed by our team before it goes live.
            </p>

            <div className="mt-10 grid grid-cols-2 gap-8">
              <div className="">
                <div className="font-semibold">Name of the Destination</div>
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


              <div className="">
                <div className="font-semibold">Headline</div>
                <div className="  mt-2 text-gray-600">{headline}</div>
              </div>
              <div className="">
                <div className="font-semibold">Short description</div>
                <div className=" mt-2 text-gray-600 ">{shortDescription}</div>
              </div>

              
              <div>
                <div className="font-semibold">State URL</div>
                <div className=" mt-2 text-gray-600">{website}</div>
              </div>

              <div>
                <div className="font-semibold">City</div>
                <div className=" mt-2 text-gray-600">{twitter}</div>
              </div>

              <div>
                <div className="font-semibold">Address</div>
                <div className=" mt-2 text-gray-600">{discord}</div>
              </div>

              <div className="">
                <div className="font-semibold">
                  Release date - Pending Approval
                </div>
                <div className=" mt-2 text-gray-600">
                  {date ? date.toDateString() : "Not specified"}
                </div>
              </div>

              <div className="cols-span-2">
                <div className="font-semibold">Destination Images</div>
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
              <div>
              </div>
            </div>
          </motion.div>
        )}

        {step === 8 && (
          <div className="space-y-10">
            <div className="text-4xl font-semibold"> Congratulations 🎉 </div>
            <div className="text-xl font-light mt-4 leading-8 ">
              Your Destination has been successfully submitted. Our team will review
              it and get back to you soon.
            </div>

            <div className="flex flex-col  gap-4">
              <div
                onClick={handleGoToProducts}
                className="bg-green-600 text-white py-2 px-4
                 rounded mt-4 flex w-60 justify-center items-center cursor-pointer"
              >
                Go to your Destination
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

        {step !== 8 && (
          <>
            <div className="flex justify-between items-center mt-10">
              {step !== 1 && (
                <button onClick={prevStep} className="text-gray-600">
                  Previous
                </button>
              )}

              <div className="flex items-center">
                {step === 7 ? (
                  <button
                    onClick={submitProduct}
                    className="bg-[#0E793C] text-white py-2 px-4 rounded-md mt-4 items-end"
                  >
                    Submit
                  </button>
                ) : (
                  <button
                    onClick={nextStep}
                    className="bg-[#0E793C] text-white py-2 px-4 rounded-md mt-4 items-end"
                  >
                    {step === 7 ? "Submit" : "Continue"}
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
