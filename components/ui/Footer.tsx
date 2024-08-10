'use client'

import Link from 'next/link';
import Image from 'next/image';
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-10 px-4 md:px-12 lg:px-24">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 justify-between">
        <div className="col-span-1 md:col-span-2 lg:col-span-2">
          <div className="flex mr-[6vw] flex-col items-center md:items-start">
            <Image
              src="/restlogo.png"
              alt="Rehbar Logo"
              width={272}
              height={64}
              className="mb-4"
            />
            <p className="text-gray-400 text-sm">
              Get Socials with us
            </p>
            <div className="flex space-x-4 mt-4">
              <Link href="#" className="text-gray-400 hover:text-white">
                <FaFacebookF />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white">
                <FaTwitter />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white">
                <FaInstagram />
              </Link>
            </div>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">
            OUR COMPANY
          </h3>
          <ul className="space-y-2">
            <li>
              <Link href="#" className="text-gray-400 hover:text-white">
                About us
              </Link>
            </li>
            <li>
              <Link href="#" className="text-gray-400 hover:text-white">
                Careers
              </Link>
            </li>
            <li>
              <Link href="#" className="text-gray-400 hover:text-white">
                Contact us
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">
            RESOURCES
          </h3>
          <ul className="space-y-2">
            <li>
              <Link href="#" className="text-gray-400 hover:text-white">
                Add a Listing
              </Link>
            </li>
            <li>
              <Link href="#" className="text-gray-400 hover:text-white">
                Articles & Resources
              </Link>
            </li>
            <li>
              <Link href="#" className="text-gray-400 hover:text-white">
                Account Login
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="container mx-auto mt-10 pt-4 border-t border-gray-700">
        <div className='flex justify-between w-[80%] mx-auto '>
        <p className="text-center text-gray-400 text-sm">
          2024 Rehbark.pk, All Rights Reserved.
        </p>
<div className='flex space-x-4'>
<p className="text-center text-gray-400 text-sm">
    Terms & Conditions
        </p>
<p className="text-center text-gray-400 text-sm">
    Privacy Policy
        </p>
</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
