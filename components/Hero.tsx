/**
 * v0 by Vercel.
 * @see https://v0.dev/t/Xpxoqjf2whR
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Button } from "@/components/ui/button"
import { Input } from "@headlessui/react"

export default function Component() {
  return (
    <section
      className="relative w-full h-[600px] bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: 'url("/1211.jpg")' }}
    >
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 container mx-auto flex flex-col items-center justify-center h-full px-4 md:px-6 lg:px-8 space-y-8">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center leading-tight">
          Elevate Your Digital Presence
        </h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full max-w-2xl">
          <div className="flex gap-0 w-full">
            <Input
              type="text"
              placeholder="Enter your email"
              className="bg-white/80 text-gray-800 rounded-l-md px-6 py-4 flex-1 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <Input
              type="text"
              placeholder="Enter your email"
              className="bg-white/80 text-gray-800 rounded-r-md px-6 py-4 flex-1 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <Button
            type="submit"
            className="bg-primary text-white rounded-md px-6 py-4 font-medium transition-colors hover:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            Get Started
          </Button>
        </div>
      </div>
    </section>
  )
}