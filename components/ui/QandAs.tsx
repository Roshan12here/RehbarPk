import React from 'react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion";

interface Product {
    Product : any
}

const QandAs : React.FC<Product> = ({Product}) => {
 

  return (
    <div>
 <h2 className="font-semibold text-2xl mt-10 mb-6">Q&A</h2>
      <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>What makes This Destination Unique</AccordionTrigger>
        <AccordionContent>
          {Product.Unique}
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>What can visitors expect to see or do there</AccordionTrigger>
        <AccordionContent>
{Product.VisitorsExpect}
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger> What amenities are available? </AccordionTrigger>
        <AccordionContent>
        {Product.Amenities}
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-4">
        <AccordionTrigger>Does it has any historical or cultural significance?</AccordionTrigger>
        <AccordionContent>
          {Product.Historical}
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-5">
        <AccordionTrigger>Are there any interesting facts about the location?</AccordionTrigger>
        <AccordionContent>
          {Product.InterestStories}
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-6">
        <AccordionTrigger>What should visitors bring with them?</AccordionTrigger>
        <AccordionContent>
          {Product.WhatBringing}
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-7">
        <AccordionTrigger>Have you or others had memorable experiences at this location? If so, what were they?</AccordionTrigger>
        <AccordionContent>
          {Product.MemorableExperiences}
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-8">
        <AccordionTrigger>What is the best time of day or year to visit?*</AccordionTrigger>
        <AccordionContent>
          {Product.BestTimetoVisit}
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-9">
        <AccordionTrigger>Is this place kids friendly?</AccordionTrigger>
        <AccordionContent>
{Product.KidsFriendly}
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-10">
        <AccordionTrigger>Any message for visitors before they visit</AccordionTrigger>
        <AccordionContent>
{Product.AnyMessageForVisitors}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
    </div>
  )
}

export default QandAs