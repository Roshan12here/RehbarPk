import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { getProductsByCityName } from "@/lib/server-actions";
import Image from "next/image";
import Link from "next/link";

interface IParams {
  city: string;
}

const CityPage: React.FC<{ params: IParams }> = async ({ params }) => {
  const capitalizedCity =
    params.city.charAt(0).toUpperCase() + params.city.slice(1);

  const products = await getProductsByCityName(capitalizedCity);

  return (
    <div className="md:w-3/5 mx-auto pt-10 px-6 md:px-0">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/Cities">Cities</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{capitalizedCity}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <h1 className="text-5xl font-semibold pt-10 ">{capitalizedCity}</h1>
      <p className="text-gray-600 pt-2">
        Check Out The Amazing Destinations in {capitalizedCity}
      </p>

      <div className="pt-10 space-y-4">
        <h1 className="text-2xl font-semibold pt-4 ">Popular Destinations</h1>
        {products.map((product: any) => (
          <Link
            href={`/Destination/${product.slug}`}
            key={product.id}
            className="flex gap-x-4 items-center p-2 rounded-md border"
          >
            <Image
              src={product.logo}
              alt="logo"
              width={1000}
              height={1000}
              className="w-16 h-16 md:w-20 md:h-20 rounded-md cursor-pointer"
            />
            <div>
              <h2 className="font-semibold text-lg">{product.name}</h2>
              <p className="text-gray-500 text-sm md:py-2">{product.headline}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CityPage;
