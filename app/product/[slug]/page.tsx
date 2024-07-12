

import { getProductBySlug } from "@/lib/server-actions";
import Image from "next/image";
import Link from "next/link";
import GoToWebsite from "./go-to-website";
import CarouselComponent from "@/components/carousel-component";
import { Button } from "@/components/ui/button";
import Modal from "@/components/ui/modals/authModal";
import { useState } from "react";
import ProductItem from "@/components/CommentButton";
import { auth } from "@/auth";

interface IParams {
  slug: string;
}

const ProductPage = async ({ params }: { params: IParams }) => {
  const product = await getProductBySlug(params.slug);
  
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
              <h3>{product.website}, {product.twitter}, {product.discord},</h3>

      {product.description && (
        <div className="mt-6">
          <p className="text-gray-500 text-base">{product.description}</p>
        </div>
      )}

      <div className="mt-6">
        <CarouselComponent productImages={productImageUrls} />
      </div>

      <h2 className="font-semibold text-2xl mt-10 mb-6">Community Feedback</h2>

<ProductItem
key={product.id}
authenticatedUser={authenticatedUser}
product={product}
/>

      {product.comments.length > 0 ? (
        <div className="space-y-4">
          {product.comments.map((comment: any) => (
            <div key={comment.id} className="border p-4 rounded-lg">
              <div className="flex gap-x-4 items-center">
                <Image
                  src={comment.user.image}
                  alt="profile"
                  width={60}
                  height={60}
                  className="rounded-full h-14 w-14"
                />
                <div>
                  <h2 className="font-semibold text-lg">{comment.user.name}</h2>
                  <p className="text-gray-500 text-base">{comment.body}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-6">
          <h2 className="text-2xl font-semibold">No comments yet</h2>
          <p className="text-gray-500 mt-2">Be the first to comment on this product</p>
        </div>
      )}
    </div>
  );
};

export default ProductPage;
