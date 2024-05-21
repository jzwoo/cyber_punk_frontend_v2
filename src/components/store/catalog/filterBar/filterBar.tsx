"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import React from "react"

const FilterBar: React.FC = () => {
  const sections = ["CATEGORY", "PRODUCT RATING COUNT", "PRICE", "LOCATION"]

  return (
    <div className="w-[400px] flex flex-col bg-gray-500 rounded-xl bg-opacity-30 p-4 gap-2">
      <div className="text-xl">FILTER PRODUCTS</div>

      <Accordion type="multiple" defaultValue={sections}>
        {sections.map((sectionName) => (
          <AccordionItem value={sectionName} key={sectionName}>
            <AccordionTrigger>{sectionName}</AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-1 bg-black rounded-xl bg-opacity-30 p-4">
                {sectionName}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}

export default FilterBar
