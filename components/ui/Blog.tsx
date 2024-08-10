import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Component() {
  return (
    <section className="container mx-auto px-4 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-bold mb-4">Stories & Articles</h2>
          <h1 className="text-4xl font-bold mb-8">
            Explore People's Stories
          </h1>
          <p className="mb-8">
            Stories never die. Everyone has a story to share. Every trip create a
            unique story. Let the world know what you got.
          </p>
          <div className="flex items-center gap-4 mb-6">
            <Image
              src={"/women.jpg"}
              alt="women"
              width={400}
              height={400}
              className="w-24 h-24 object-cover rounded-md"
            />
            <div>
              <h3 className="text-md text-gray-500">News Study Reveals</h3>
              <p className="text-xl font-bold text-[#000000]">
                05 Benefits of solo female travel
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 mb-6">
            <Image
              src={"/rest.jpg"}
              alt="women"
              width={400}
              height={400}
              className="w-24 h-24 object-cover rounded-md"
            />
            <div>
              <h3 className="text-md text-gray-500">These are the </h3>
              <p className="text-xl font-bold text-[#000000]">
                05 Best Resturant in Islamabad
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 mb-6">
            <Image
              src={"/camp.jpg"}
              alt="women"
              width={400}
              height={400}
              className="w-24 h-24 object-cover rounded-md"
            />
            <div>
              <h3 className="text-md text-gray-500">Explore the </h3>
              <p className="text-xl font-bold text-[#000000]">
                05 Best sites for Camping
              </p>
            </div>
          </div>
        </div>
        <div>
          <Image
            src={"/forest.jpg"}
            alt="women"
            width={400}
            height={400}
            className="w-full h-96 object-cover rounded-md mb-6"
          />
          <h3 className="text-lg font-bold mb-4">News Study Reveals</h3>
          <p className="mb-8">
            Among our top 1% of places, stays, eats, and experiences - decided by
            you.
          </p>
        </div>
      </div>
      <div className="bg-[#0E793C] p-4 w-full sm:max-w-screen-md mx-auto rounded-lg flex justify-between gap-4">
  <Button className="bg-[#0E793C] underline">Write Your Review</Button>
  <Button className="bg-[#0E793C] underline">Add your Listing</Button>
</div>
    </section>
  );
}