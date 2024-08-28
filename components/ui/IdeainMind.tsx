import Image from 'next/image'
import React from 'react'
import { Button } from './button'

const IdeanMind = () => {
  return (
    <section
    className='w-full mt-8 h-[23vh] sm:h-[22vh] md:h-[22vh] lg:h-[33vh]  bg-[#0E793C] flex  '
    >
<Image
src={"/bgi.png"}
alt='image'
width={440}
height={440}
className='w-[48vw] h-[57vh] hidden sm:hidden md:hidden lg:block mt-[-14vh] mr-4' />

<div className='ml-4 flex flex-col  '>
<h1 className='text-2xl md:text-lg sm:text-md lg:text-2xl xl:text-2xl text-[#ffffff] font-extrabold mt-6'>Have a Business or Discovered a new Mind</h1>
<p className='text-lg text-gray-200 '>Make Your Spot in Rehbar.pk</p>
<div>
<Button className='mt-6'>Add your Listings</Button>
</div>
</div>
    </section>
  )
}

export default IdeanMind