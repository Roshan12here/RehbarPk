import Image from "next/image";
import Link from "next/link";
import { TbWorldSearch } from "react-icons/tb";
import { FaCarAlt } from "react-icons/fa";
import { FaCompass } from "react-icons/fa";

export default function Component() {
  return (
    <header
      className="h-screen relative w-full py-8 md:py-12 lg:py-16"
      style={{
        backgroundImage: "url('/Awara.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black opacity-70"></div>
      <div className="relative grid grid-cols-1 md:grid-cols-2 justify-between items-start gap-4 px-4 md:px-6">
        <div className="space-y-4 lg:max-w-[500px]">
          <div className="flex mb-6">
            <Link href="#" className="inline-flex items-center" prefetch={false}>
              <Image
                src={"/awa.png"}
                width={150}
                height={150}
                alt="image"
                className="h-24 w-24 text-yellow-500" // Increased size for lg and xl
              />
            </Link>
            <span className="text-sm text-yellow-500 mt-20 ml-[-2vw] lg:text-base xl:text-lg">
              By hh Rehbar.pk
            </span>
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-bold tracking-tighter text-white sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl">
              Your dream itinerary, crafted with you
            </h1>
            <p className="text-sm font-inter text-gray-400 md:text-base lg:text-base xl:text-lg">
              Awaragardi by Rehbar offers customized packages for honeymoon, family, and corporate trips anywhere in Pakistan.
            </p>
            <p className="text-sm mt-4 font-inter text-gray-400 md:text-base lg:text-base xl:text-lg">
              If you need help planning your unforgettable tour, Awaragardi will craft a custom itinerary based on your requirements.
            </p>
          </div>
          <Link
            href="#"
            className="inline-flex h-10 items-center justify-center rounded-md bg-[#ffffff] px-6 text-sm font-medium text-gray-900 shadow-sm transition-colors hover:bg-yellow-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 focus-visible:ring-offset-2 lg:h-12 lg:px-8 xl:h-14 xl:px-10"
            prefetch={false}
          >
            Book Now
          </Link>
        </div>
        <div className="flex flex-col sm:flex-col md:flex-col gap-2 lg:gap-4 mt-4 lg:mt-0">
          <div className="flex items-start gap-2 rounded-lg bg-gray-900/50 p-4 lg:p-6 xl:p-8">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-yellow-500">
              <TbWorldSearch className="h-6 w-6 text-gray-900" />
            </div>
            <div>
              <h3 className="text-base lg:text-lg font-semibold text-white">Honeymoon Trips</h3>
              <p className="text-sm lg:text-base font-inter text-gray-400">Romantic getaways for two, tailored to your preferences.</p>
            </div>
          </div>
          <div className="flex items-start gap-2 rounded-lg bg-gray-900/50 p-4 lg:p-6 xl:p-8">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-yellow-500">
              <FaCarAlt className="h-6 w-6 text-gray-900" />
            </div>
            <div>
              <h3 className="text-base lg:text-lg font-semibold text-white">Family Trips</h3>
              <p className="text-sm lg:text-base font-inter text-gray-400">Unforgettable adventures for the whole family.</p>
            </div>
          </div>
          <div className="flex items-start gap-2 rounded-lg bg-gray-900/50 p-4 lg:p-6 xl:p-8">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-yellow-500">
              <FaCompass className="h-6 w-6 text-gray-900" />
            </div>
            <div>
              <h3 className="text-base lg:text-lg font-semibold text-white">Corporate Trips</h3>
              <p className="text-sm lg:text-base font-inter text-gray-400">Tailored experiences for your business needs.</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
