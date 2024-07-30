
import Image from "next/image";
import Link from "next/link";

const Logo = () => {
    return ( 
    <div>
     <Link href={"/"} className="md:hidden">
        <Image 
        src={'/logo/Rehbar-logo.png'} 
        alt="logo"
        width={44}
        height={44}
        className="p-1"
        />
     </Link>

     <Link href={"/"} className="hidden md:block">
        <Image 
        src={'/logo/Rehbar-logo.png'} 
        alt="logo"
        width={64}
        height={64}
        />
     </Link>

    </div> );
}
 
export default Logo;