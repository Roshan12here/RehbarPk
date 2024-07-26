"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

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

function ComboboxDemo() {
  const [open, setOpen] = React.useState(false)
  const [selectedCity, setSelectedCity] = React.useState("")

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {selectedCity
            ? cities.find((city) => city.value === selectedCity)?.label
            : "Select city..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search city..." />
          <CommandEmpty>No city found.</CommandEmpty>
          <CommandGroup>
            {cities.map((city) => (
              <CommandItem
                key={city.value}
                value={city.value}
                onSelect={(currentValue) => {
                  setSelectedCity(currentValue === selectedCity ? "" : currentValue)
                  setOpen(false)
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    selectedCity === city.value ? "opacity-100" : "opacity-0"
                  )}
                />
                {city.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export default ComboboxDemo
