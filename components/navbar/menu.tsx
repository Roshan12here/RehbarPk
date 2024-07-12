import Link from "next/link";

const Menu = () => {
  return (
    <div className="hidden lg:flex items-center relative text-white">
      <div className="space-x-6 text-gray-600 text-sm flex items-center cursor-pointer">
        <div
          className="hover:text-green-200 py-4 text-white"
        >
          <Link href={"/product"}>
          Destinations 
          </Link>
        </div>

        <div
          className="hover:text-green-200 py-4 text-white hover:underline  "
        >
          <Link href={"/Business"}>
          Businesses 
          </Link>
        </div>



        <div
        className="hover:text-green-200 py-4 text-white"
        >
            About 
        </div>
      </div>
    </div>
  );
};

export default Menu;
