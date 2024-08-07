"use client"

import React from "react"
import { FaUsers } from "react-icons/fa";

export default function Component() {
  return (
    <>
      <section className="w-full mt-8">
        <div className="container flex flex-col items-center justify-center gap-4 px-4 text-center md:px-6">
        <div className="flex flex-col ">
        <div className="text-lg font-normal text-[#afafaf]">How it Works</div>
        <div className="w-24 h-px bg-[#afafaf] m-[1px]"></div>
        </div>
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
            <div className="relative overflow-hidden rounded-lg bg-background shadow-lg transition-transform duration-300 ease-in-out hover:shadow-xl hover:-translate-y-2 mt-10vh">
              <div className="absolute top-6 left-6 rounded-md bg-white p-2 text-[#006837]">
                <FaUsers className="h-6 w-6" />
              </div>
              <div className="absolute top-6 right-6 rounded-md bg-muted px-2 py-1 text-xs text-muted-foreground">
                Step 01
              </div>
              <div className="p-8">
                <p className="mt-8 text-[#000000] text-2xl font-bold">
                  Search any Place and Destination in Pakistan
                </p>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-lg bg-background shadow-lg transition-transform duration-300 ease-in-out hover:shadow-xl hover:-translate-y-2 mt-10vh">
              <div className="absolute top-6 left-6 rounded-md bg-white p-2 text-[#006837]">
                <FaUsers className="h-6 w-6" />
              </div>
              <div className="absolute top-6 right-6 rounded-md bg-muted px-2 py-1 text-xs text-muted-foreground">
                Step 02
              </div>
              <div className="p-8">
                <p className="mt-8  text-2xl text-[#000000]  font-bold">
                  Find what others are saying about them
                </p>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-lg bg-background shadow-lg transition-transform duration-300 ease-in-out hover:shadow-xl hover:-translate-y-2 mt-10vh">
              <div className="absolute top-6 left-6 rounded-md bg-white p-2 text-[#006837]">
                <FaUsers className="h-6 w-6" />
              </div>
              <div className="absolute top-6 right-6 rounded-md bg-muted px-2 py-1 text-xs text-muted-foreground">
                Step 03
              </div>
              <div className="p-8">
                <p className="mt-8 text-[#000000] text-2xl font-bold">
                  Give any FeedBacl to help others
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

