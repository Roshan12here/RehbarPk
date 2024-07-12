import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link'

const Hero = () => {
  return (
    <div className='w-full h-[85vh] mb-4 mt-8 relative overflow-hidden'>
      {/* Background gradient effect */}
      <div className='flex flex-col items-center justify-center relative z-10'>
        <h1 className='text-4xl sm:text-6xl md:text-8xl font-bold text-green-600'>
          Rehbar.pk 
        </h1>
        <h3 className='text-lg sm:text-xl md:text-2xl text-center font-bold text-gray-900 mt-2'>
          Explore Pakistan's vibrant destinations and thriving businesses. Discover, review, and connect with the best spots and services across the country, all in one place.
        </h3>
        <div className='mt-6 flex flex-col sm:flex-row items-center'>
          <Link href="/businesses" passHref>
            <Button className='bg-green-600 text-white hover:text-green-600 hover:bg-white mb-2 sm:mb-0 sm:mr-2'>
              Browse Businesses
            </Button>
          </Link>
          <Link href="/products" passHref>
            <Button className='bg-green-600 text-white hover:text-green-600 hover:bg-white mb-2 sm:mb-0 sm:mx-2'>
              Browse Destinations
            </Button>
          </Link>
          <Link href="/" passHref>
            <Button variant={'secondary'} className='border-[1px] border-green-600'>
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Hero
