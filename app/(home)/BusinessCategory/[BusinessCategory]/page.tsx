import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { getBusinessessByCategoryName } from "@/lib/Business-server-action";
import Image from "next/image";
import Link from "next/link";

interface IParams {
  BusinessCategory: string;
}

const CategoryPage: React.FC<{ params: IParams }> = async ({ params }) => {
  const decodedCategory = decodeURIComponent(params.BusinessCategory);
  const capitalizedCategory = decodedCategory.charAt(0).toUpperCase() + decodedCategory.slice(1);

  console.log("Decoded Category:", decodedCategory); // Debug log
  console.log("Capitalized Category:", capitalizedCategory); // Debug log

  const businesses = await getBusinessessByCategoryName(capitalizedCategory);

  console.log("Businesses:", businesses); // Debug log

  return (
    <div className="md:w-3/5 mx-auto pt-10 px-6 md:px-0">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/BusinessCategories">Categories</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{capitalizedCategory}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <h1 className="text-4xl font-semibold pt-10">{capitalizedCategory}</h1>
      <p className="text-gray-500 pt-2">
        Check out what’s going on in the {capitalizedCategory}! Discover new products
      </p>

      <div className="pt-10 space-y-4">
        {businesses.length === 0 ? (
          <p>No businesses found in this category.</p>
        ) : (
          businesses.map((business: any) => (
            <Link
              href={`/Business/${business.slug}`}
              key={business.id}
              className="flex gap-x-4 items-center p-2 rounded-md border"
            >
              <Image
                src={business.logo}
                alt="logo"
                width={1000}
                height={1000}
                className="w-16 h-16 md:w-20 md:h-20 rounded-md cursor-pointer"
              />
              <div>
                <h2 className="font-semibold text-lg">{business.name}</h2>
                <p className="text-gray-500 text-sm md:py-2">{business.headline}</p>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
