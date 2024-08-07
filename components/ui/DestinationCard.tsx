import Image from "next/image"
import { Card , CardContent } from "./card"
import { MapPinIcon } from "lucide-react"
import Link from "next/link"

function HunzaValleyCard() {
    return (
      <Card className="overflow-hidden absolute bottom-0 right-0 w-2/3">
      <CardContent className="p-0">
        <Image
          src="/hunza.jpg"
          alt="Couple taking selfie in Hunza Valley"
          width={500}
          height={300}
          className="w-full h-auto"
        />
        <div className="absolute bottom-0 left-0 bg-white p-3 rounded-tr-lg">
          <h2 className="text-lg font-semibold">Hunza Valley</h2>
          <p className="text-gray-600 flex items-center text-sm">
            <MapPinIcon className="w-4 h-4 mr-1" />
            Gilgit-Baltistan, Pakistan
          </p>
          <Link href="#" className="text-green-600 font-semibold mt-1 inline-block text-sm">
            View More →
          </Link>
        </div>
      </CardContent>
    </Card>
    )
  }

  export default  HunzaValleyCard