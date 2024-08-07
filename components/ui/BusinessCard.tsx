import Image from "next/image"
import { Card , CardContent } from "./card"

function RestaurantCard() {
    return (
      <Card className="overflow-hidden">
      <CardContent className="p-0">
        <Image
          src="/rest.jpg"
          alt="Couple dining at a restaurant"
          width={500}
          height={300}
          className="w-full h-auto"
        />
        <div className="p-4">
          <div className="flex items-center">
            <Image
              src="/pr.jpg"
              alt="Reviewer avatar"
              width={40}
              height={40}
              className="rounded-full mr-3"
            />
            <div>
              <p className="font-semibold">Delicious food & excellent service! Highly recommend.</p>
              <div className="flex items-center">
                <div className="flex text-green-500">
                  {[...Array(5)].map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
                <span className="ml-2 text-gray-600">4.5</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
    )
  }


  export default RestaurantCard;