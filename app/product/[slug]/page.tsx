import { getProductBySlug,updateProduct   } from "@/lib/server-actions";
import Image from "next/image";
import Link from "next/link";
import CarouselComponent from "@/components/carousel-component";
import { auth } from "@/auth";
import RatingComponent from "@/components/RatingStar";
import { StarIcon } from "lucide-react";
import CommentModel from "@/components/CommentModel";
import OpenQA from "@/components/OpenQ&A";
import QandAs from "@/components/ui/QandAs";
import { UpvoteProduct } from "@/components/ui/UpvoteProduct";


interface IParams {
  slug: string;
}

const ProductPage = async ({ params }: { params: IParams }) => {
  const product = await getProductBySlug(params.slug || "");

  if (!product) {
    return <div>Product not found</div>;
  }


  const authenticatedUser = await auth();

  const productImageUrls = product.images.map((image: any) => image.url);

  console.log(product, "product info");

  return (
    <div className="mx-auto md:w-3/5 px-6 py-10 md:px-0">
      <div className="flex items-center justify-between mb-6">
        <div className="flex gap-x-4 items-center">
          <Image
            src={product.logo}
            alt="logo"
            width={1200}
            height={1200}
            className="w-20 h-20 md:w-32 md:h-32 rounded-md"
          />
          <div>
            <h2 className="font-extrabold text-3xl text-[#0E793C]">{product.name}</h2>
            <p className="text-gray-500 text-base py-2">{product.headline}</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
              {product.categories.map((category: any) => (
                <Link
                  href={`/category/${category.name.toLowerCase()}`}
                  key={category.id}
                  className="bg-[#0E793C] text-[#ffffff] px-4 py-2 rounded-md cursor-pointer"
                >
                  <h2 className="text-xs text-center">{category.name}</h2>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      <h1 className="font-bold text-[#0E793C] text-2xl">Location</h1>
      <h3>{product.website}, {product.twitter}, {product.discord}</h3>
      {product.description && (
        <div className="mt-6">
          <p className="text-gray-500 text-base">{product.description}</p>
        </div>
      )}

      <div className="mt-6">
        <CarouselComponent productImages={productImageUrls} />
      </div>

      <input type="checkbox" id="modal-toggle" className="modal-toggle" />
      <div className="flex justify-center items-center m-4">
        <CommentModel authenticatedUser={authenticatedUser} element={<RatingComponent product={product} productId={product.id} authenticatedUser={authenticatedUser} />} />
      </div>
  


      <h2 className="font-semibold text-2xl mt-10 mb-6">Community Feedback</h2>
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
                    <h1 className="text-gray-900 mt-2 mb-2 text-lg ">{rating.HeadLine}</h1>
                    <h3 className="">{formattedDate} - {rating.reviewType}</h3>
                    <p className="text-gray-500 text-base">{rating.comment}</p>
                    {/* Display rating images */}
                    {rating.photos && rating.photos.length > 0 && (
                      <div className="flex gap-2 mt-2">
                        {rating.photos.map((photo: any, index: number) => (
                          <Image
                            key={index}
                            src={photo.url}
                            alt={`Rating photo ${index + 1}`}
                            width={80}
                            height={80}
                            className="object-cover rounded" 
                          />
                        ))}
                      </div>
                    )}
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
      <div  className="flex justify-start  px-4 py-2 rounded-md cursor-pointer  mt-6 ">
<OpenQA Product={product} />
</div>
    </div>
  );
};

export default ProductPage;
