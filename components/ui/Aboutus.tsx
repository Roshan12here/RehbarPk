import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import HunzaValleyCard from "./DestinationCard"
import Image from "next/image"

export default function Component() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="flex items-center justify-center">
            <Image
              src="/sola.jpg"
              alt="Hero Image"
              width={800}
              height={600}
              className="rounded-lg object-cover w-full h-auto sm:max-w-[400px] md:max-w-[600px] lg:max-w-none"
            />
          </div>
          <div className="space-y-4">
            <div className="flex flex-col">
              <div className="text-lg font-normal text-[#afafaf]">Who are We</div>
              <div className="w-24 h-px bg-[#afafaf] my-1"></div>
            </div>
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold tracking-tighter">
              Helping You Find . Book . Review Any Location or Business in Pakistan
            </h2>
            <p className="max-w-[600px] text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground">
              Our mission is to provide a comprehensive platform for users to discover, explore, and review destinations
              and businesses across Pakistan, empowering them to make informed decisions.
            </p>
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-1">
              <div className="flex items-center gap-4">
                <div className="bg-white rounded-md p-3 flex items-center justify-center">
                  <MapPinIcon className="w-6 h-6" style={{ color: '#006837' }} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Destinations</h3>
                  <p className="text-muted-foreground">Discover and explore the best destinations in Pakistan.</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-white rounded-md p-3 flex items-center justify-center">
                  <BuildingIcon className="w-6 h-6" style={{ color: '#006837' }} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Businesses</h3>
                  <p className="text-muted-foreground">Find and review businesses across Pakistan.</p>
                </div>
              </div>
              <Separator className="my-4 col-span-full" />
            </div>
            <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row justify-between items-center gap-4">
              <Link
                href="#"
                className="inline-flex h-10 items-center justify-center rounded-md px-8 text-sm font-medium text-[#ffffff] bg-[#006837] transition-colors hover:bg-[#005127] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 w-full sm:w-auto md:w-full lg:w-auto"
                prefetch={false}
              >
                Learn More
              </Link>
              <div className="bg-muted rounded-md p-4 text-center inline-flex items-center justify-center w-full sm:w-auto md:w-full lg:w-auto">
                <h3 className="text-2xl font-bold">230K+</h3>
                <p className="text-muted-foreground ml-2">Customers</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function BuildingIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="16" height="20" x="4" y="2" rx="2" ry="2" />
      <path d="M9 22v-4h6v4" />
      <path d="M8 6h.01" />
      <path d="M16 6h.01" />
      <path d="M12 6h.01" />
      <path d="M12 10h.01" />
      <path d="M12 14h.01" />
      <path d="M16 10h.01" />
      <path d="M16 14h.01" />
      <path d="M8 10h.01" />
      <path d="M8 14h.01" />
    </svg>
  )
}

function MapPinIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}