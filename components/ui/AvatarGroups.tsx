import Link from 'next/link'
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { FaFacebook, FaInstagram, FaTwitter, FaTiktok, FaYoutube } from 'react-icons/fa'

const TrustComponent = () => {
  return (
    <div className="flex flex-col items-center space-y-6 p-6">
      <h2 className="text-xl text-center">
        Trusted and Loved by Over <span className="font-extrabold">50,000+</span> Travelers, Locals, and Business Owners
      </h2>
      
      <div className="flex flex-wrap justify-center mt-4">
        {[...Array(12)].map((_, i) => (
          <Avatar key={i} className="w-12 h-12 border-2 border-[#006837] -ml-2">
            <AvatarImage src="/avatar.jpg" />
          </Avatar>
        ))}
      </div>
      
      <div className="flex space-x-4 mt-4">
        <Link href="https://www.facebook.com" passHref>
          <FaFacebook size={24} />
        </Link>
        <Link href="https://www.instagram.com" passHref>
          <FaInstagram size={24} />
        </Link>
        <Link href="https://www.twitter.com" passHref>
          <FaTwitter size={24} />
        </Link>
        <Link href="https://www.tiktok.com" passHref>
          <FaTiktok size={24} />
        </Link>
        <Link href="https://www.youtube.com" passHref>
          <FaYoutube size={24} />
        </Link>
      </div>
      
      <Button variant="default" className="bg-[#006837] text-white mt-4">
        Write a Review
      </Button>
    </div>
  )
}

export default TrustComponent
