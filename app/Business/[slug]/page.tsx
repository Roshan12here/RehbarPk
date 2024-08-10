import { getProductBySlug } from "@/lib/Business-server-action";
import Image from "next/image";
import Link from "next/link";
import GoToWebsite from "./go-to-website";
import CarouselComponent from "@/components/carousel-component";
import { auth } from "@/auth";
import ProductItem from "@/components/BusinessButton";
import { StarIcon } from "lucide-react";
import BusinessRatingComponent from "@/components/ui/RatingBusinessStar";
import OpenReviewModal from "@/components/ui/OpenReviewModal";

interface IParams {
  slug: string;
}

const ProductPage = async ({ params }: { params: IParams }) => {
  const product = await getProductBySlug(params.slug);
  const authenticatedUser = await auth();

  if (!product) {
    return <div>Business not found</div>;
  }

  const productImageUrls = product.images.map((image: any) => image.url);

  return (
    <div className="mx-auto md:w-3/5 px-6 py-10 md:px-0">
      {/* Business Info */}
      <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-4">
        <Image
          src={product.logo}
          alt="logo"
          width={1200}
          height={1200}
          className="w-20 h-20 md:w-32 md:h-32 rounded-md"
        />
        <div>
          <h2 className="font-extrabold text-3xl text-[#0E793C]">{product.name}</h2>
          <p className="text-gray-600 font-bold py-2">{product.headline}</p>
          {/* Categories */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
            {product.categories.map((category: any) => (
              <Link
                href={`/category/${category.name.toLowerCase()}`}
                key={category.id}
                className="bg-[#0E793C] text-[#ffffff] px-4 py-2 rounded-md cursor-pointer"
              >
                <h2 className="text-xs text-center">{category.comment}</h2>
              </Link>
            ))}
          </div>
        </div>
        <GoToWebsite website={product.website} />
      </div>

      {/* Business Description */}
      {product.description && (
        <div className="pt-4">
          <p className="text-gray-600 font-bold">{product.description}</p>
        </div>
      )}

      {/* Business Details */}
      <div className="flex flex-col mt-4">
        {/* Display business details here */}
        {/* ... */}
      </div>

      {/* Image Carousel */}
      <div className="pt-4">
        <CarouselComponent productImages={productImageUrls} />
      </div>

      {/* Review Modal */}
      <div className="flex justify-center items-center m-4">
        <OpenReviewModal
          Element={<BusinessRatingComponent product={product} authenticatedUser={authenticatedUser} businessId={product.id} />}
          authenticaitedUser={authenticatedUser}
        />
      </div>

      {/* Community Feedback */}
      <h2 className="font-semibold text-2xl mt-10 mb-6">Community Feedback</h2>
      <ProductItem product={product} authenticatedUser={authenticatedUser} />

      {/* Ratings */}
      {product.ratings.length > 0 ? (
        <div className="space-y-4">
          {product.ratings.map((rating: any) => {
            // Convert the date to a readable format
            const formattedDate = new Date(rating.selectedDate).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            });

            return (
              <div key={rating.id} className="border p-4 rounded-lg">
                <div className="flex gap-x-4 items-start">
                  <Image
                    src={rating.user.image}
                    alt="profile"
                    width={60}
                    height={60}
                    className="rounded-full h-14 w-14"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <h2 className="font-semibold text-lg">{rating.user.name}</h2>
                      <span className="flex items-center">
                        {[...Array(rating.score)].map((_, i) => (
                          <StarIcon key={i} className="w-5 h-5 text-[#0E793C] fill-[#0E793C]" />
                        ))}
                      </span>
                    </div>
                    <p className="text-gray-500 text-sm mb-2">Rated this Destination</p>
                    <p className="text-gray-500 text-base">{rating.comment}</p>
                    {/* Display rating images */}
                               </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="mt-6">
          <h2 className="text-2xl font-semibold">No Reviews yet</h2>
          <p className="text-gray-500 mt-2">Be the first to Review on this Destination</p>
        </div>
      )}
         </div>
  );
};

export default ProductPage;