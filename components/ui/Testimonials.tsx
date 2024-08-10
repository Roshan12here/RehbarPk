"use client"

import { useState } from "react"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { FaStar } from 'react-icons/fa'
import { MdVerified } from "react-icons/md";

export default function Component() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const handlePrev = () => {
    setCurrentSlide((prevSlide) => (prevSlide === 0 ? 2 : prevSlide - 1))
  }
  const handleNext = () => {
    setCurrentSlide((prevSlide) => (prevSlide === 2 ? 0 : prevSlide + 1))
  }
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container grid max-w-5xl gap-8 px-4 md:px-6">
        <div className="flex flex-col mt-6 items-center justify-center ">
              <div className="text-lg font-normal text-[#afafaf]">Hear What others Said</div>
              <div className="w-[11rem] h-px bg-[#afafaf] mt-1"></div>
            </div>     
        <div className="space-y-4 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-2xl md:text-3xl">          
          Hear from our Satisfied travellers about their amazing <br/> experience. Discover why Rehbar.pk is their top  <br/> choice  for exploring Pakistan
          </h2>
      
        </div>
        <div className="relative">
          <div
            className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            <div className="rounded-lg border bg-background p-6 shadow-sm transition-all duration-300 hover:shadow-lg max-w-2xl mx-auto">
  <div className="flex justify-between items-center mb-4">
    <div>
      <h3 className="text-xl font-semibold text-primary">McDonald</h3>
      <p className="text-sm text-[#006837]">Lahore , Pakistan</p>
    </div>
    <div className="flex items-center">
      {[...Array(5)].map((star, index) => (
        <FaStar
          key={index}
          className={`w-5 h-5 ${index < 4 ? 'text-[#006837]' : 'text-gray-300'}`}
        />
      ))}
      <span className="ml-2 text-sm text-muted-foreground">4.5</span>
    </div>
  </div>
  <div className="border-b my-3"></div>
  <div className="mt-2 text-sm leading-relaxed text-muted-foreground">
    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.
  </div>
  <div className="flex items-center mt-4">
    <Avatar className="shrink-0">
      <AvatarImage src="/avatar.jpg" alt="Customer 1" />
      <AvatarFallback>AR</AvatarFallback>
    </Avatar>
    <div className="ml-3">
      <span className="font-semibold">Abdur Rehman</span>
      <br />
      <span className="text-sm text-[#006837]">Lahore, Pakistan</span>
    </div>
    <MdVerified className="ml-auto text-blue-600"/>
  </div>
</div>
            <div className="rounded-lg border bg-background p-6 shadow-sm transition-all duration-300 hover:shadow-lg max-w-2xl mx-auto">
  <div className="flex justify-between items-center mb-4">
    <div>
      <h3 className="text-xl font-semibold text-primary">McDonald</h3>
      <p className="text-sm text-[#006837]">Lahore , Pakistan</p>
    </div>
    <div className="flex items-center">
      {[...Array(5)].map((star, index) => (
        <FaStar
          key={index}
          className={`w-5 h-5 ${index < 4 ? 'text-[#006837]' : 'text-gray-300'}`}
        />
      ))}
      <span className="ml-2 text-sm text-muted-foreground">4.5</span>
    </div>
  </div>
  <div className="border-b my-3"></div>
  <div className="mt-2 text-sm leading-relaxed text-muted-foreground">
    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.
  </div>
  <div className="flex items-center mt-4">
    <Avatar className="shrink-0">
      <AvatarImage src="/avatar.jpg" alt="Customer 1" />
      <AvatarFallback>AR</AvatarFallback>
    </Avatar>
    <div className="ml-3">
      <span className="font-semibold">Abdur Rehman</span>
      <br />
      <span className="text-sm text-[#006837]">Lahore, Pakistan</span>
    </div>
    <MdVerified className="ml-auto text-blue-600"/>
  </div>
</div>
            <div className="rounded-lg border bg-background p-6 shadow-sm transition-all duration-300 hover:shadow-lg max-w-2xl mx-auto">
  <div className="flex justify-between items-center mb-4">
    <div>
      <h3 className="text-xl font-semibold text-primary">McDonald</h3>
      <p className="text-sm text-[#006837]">Lahore , Pakistan</p>
    </div>
    <div className="flex items-center">
      {[...Array(5)].map((star, index) => (
        <FaStar
          key={index}
          className={`w-5 h-5 ${index < 4 ? 'text-[#006837]' : 'text-gray-300'}`}
        />
      ))}
      <span className="ml-2 text-sm text-muted-foreground">4.5</span>
    </div>
  </div>
  <div className="border-b my-3"></div>
  <div className="mt-2 text-sm leading-relaxed text-muted-foreground">
    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.
  </div>
  <div className="flex items-center mt-4">
    <Avatar className="shrink-0">
      <AvatarImage src="/avatar.jpg" alt="Customer 1" />
      <AvatarFallback>AR</AvatarFallback>
    </Avatar>
    <div className="ml-3">
      <span className="font-semibold">Abdur Rehman</span>
      <br />
      <span className="text-sm text-[#006837]">Lahore, Pakistan</span>
    </div>
    <MdVerified className="ml-auto text-blue-600"/>
  </div>
</div>
            <div className="rounded-lg border bg-background p-6 shadow-sm transition-all duration-300 hover:shadow-lg max-w-2xl mx-auto">
  <div className="flex justify-between items-center mb-4">
    <div>
      <h3 className="text-xl font-semibold text-primary">McDonald</h3>
      <p className="text-sm text-[#006837]">Lahore , Pakistan</p>
    </div>
    <div className="flex items-center">
      {[...Array(5)].map((star, index) => (
        <FaStar
          key={index}
          className={`w-5 h-5 ${index < 4 ? 'text-[#006837]' : 'text-gray-300'}`}
        />
      ))}
      <span className="ml-2 text-sm text-muted-foreground">4.5</span>
    </div>
  </div>
  <div className="border-b my-3"></div>
  <div className="mt-2 text-sm leading-relaxed text-muted-foreground">
    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.
  </div>
  <div className="flex items-center mt-4">
    <Avatar className="shrink-0">
      <AvatarImage src="/avatar.jpg" alt="Customer 1" />
      <AvatarFallback>AR</AvatarFallback>
    </Avatar>
    <div className="ml-3">
      <span className="font-semibold">Abdur Rehman</span>
      <br />
      <span className="text-sm text-[#006837]">Lahore, Pakistan</span>
    </div>
    <MdVerified className="ml-auto text-blue-600"/>
  </div>
</div>
            <div className="rounded-lg border bg-background p-6 shadow-sm transition-all duration-300 hover:shadow-lg max-w-2xl mx-auto">
  <div className="flex justify-between items-center mb-4">
    <div>
      <h3 className="text-xl font-semibold text-primary">McDonald</h3>
      <p className="text-sm text-[#006837]">Lahore , Pakistan</p>
    </div>
    <div className="flex items-center">
      {[...Array(5)].map((star, index) => (
        <FaStar
          key={index}
          className={`w-5 h-5 ${index < 4 ? 'text-[#006837]' : 'text-gray-300'}`}
        />
      ))}
      <span className="ml-2 text-sm text-muted-foreground">4.5</span>
    </div>
  </div>
  <div className="border-b my-3"></div>
  <div className="mt-2 text-sm leading-relaxed text-muted-foreground">
    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.
  </div>
  <div className="flex items-center mt-4">
    <Avatar className="shrink-0">
      <AvatarImage src="/avatar.jpg" alt="Customer 1" />
      <AvatarFallback>AR</AvatarFallback>
    </Avatar>
    <div className="ml-3">
      <span className="font-semibold">Abdur Rehman</span>
      <br />
      <span className="text-sm text-[#006837]">Lahore, Pakistan</span>
    </div>
    <MdVerified className="ml-auto text-blue-600"/>
  </div>
</div>
            <div className="rounded-lg border bg-background p-6 shadow-sm transition-all duration-300 hover:shadow-lg max-w-2xl mx-auto">
  <div className="flex justify-between items-center mb-4">
    <div>
      <h3 className="text-xl font-semibold text-primary">McDonald</h3>
      <p className="text-sm text-[#006837]">Lahore , Pakistan</p>
    </div>
    <div className="flex items-center">
      {[...Array(5)].map((star, index) => (
        <FaStar
          key={index}
          className={`w-5 h-5 ${index < 4 ? 'text-[#006837]' : 'text-gray-300'}`}
        />
      ))}
      <span className="ml-2 text-sm text-muted-foreground">4.5</span>
    </div>
  </div>
  <div className="border-b my-3"></div>
  <div className="mt-2 text-sm leading-relaxed text-muted-foreground">
    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.
  </div>
  <div className="flex items-center mt-4">
    <Avatar className="shrink-0">
      <AvatarImage src="/avatar.jpg" alt="Customer 1" />
      <AvatarFallback>AR</AvatarFallback>
    </Avatar>
    <div className="ml-3">
      <span className="font-semibold">Abdur Rehman</span>
      <br />
      <span className="text-sm text-[#006837]">Lahore, Pakistan</span>
    </div>
    <MdVerified className="ml-auto text-blue-600"/>
  </div>
</div>
            
          </div>
        </div>
      </div>
    </section>
  )
}
