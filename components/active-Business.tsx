import { auth } from "@/auth";
import ProductItem from "./Business-item";
import Search from "./navbar/BusinessSearch";
import { Button } from "./ui/button";
import Link from "next/link";

interface ActiveProductsProps {
  activeProducts: any;
}

const ActiveProducts: React.FC<ActiveProductsProps> = async ({
  activeProducts,
}) => {
  const authenticatedUser = await auth();

  const formattedActiveProducts = activeProducts?.map((product: any) => {
    const {
      id,
      name,
      slug,
      headline,
      description,
      logo,
      releaseDate,
      website,
      twitter,
      discord,
      createdAt,
      updatedAt,
      userId,
      status,
      images,
      categories,
      comments,
      upvotes
    } = product;



    const imageUrls = images.map((image: any) => image.url);
    const categoryNames = categories.map((category: any) => category.name);
    const commentsCount = comments ? comments.length : 0;

    const commentText = comments ? comments.map((comment: any) => ({
        id: comment.id,
        profile: comment.profilePicture,
        body : comment.body,
        user : comment.user.name,
        timestamp : comment.createdAt,
        userId : comment.user.id,
        name: comment.user.name.toLowerCase().replace(/\s/g, '_'),

    })) : [];


    const upvotesCount = upvotes ? upvotes.length : 0;
    const upvotesData = upvotes.map((upvote: any) => upvote.user.id)

    return {
      id,
      name,
      slug,
      headline,
      description,
      logo,
      releaseDate,
      website,
      twitter,
      discord,
      createdAt,
      updatedAt,
      userId,
      status,
      images: imageUrls,
      categories: categoryNames,
      commentsLength: commentsCount,
      commentData : commentText,
      upvoters: upvotesData,
      upvotes: upvotesCount,
    };
  });

  console.log(formattedActiveProducts, 'formattedActiveProducts')


  return (
    <div className="w-full h-[100vh] flex flex-col">
      {/* Header */}
      <div className="mt-[6vh] flex flex-col justify-center items-center border-b pb-3 px-4">
        <h1 className="text-4xl sm:2xl md:3xl lg:4xl xl:4xl font-extrabold text-green-600 ">Businesses</h1>
        <h3 className="text-2xl sm:xl md:2xl lg:2xl xl:2xl font-extrabold text-gray-600 mt-2">Discover the amazing businesses of Pakistan</h3>
        <Search  />
        <div className="flex flex-row sm:flex  items-center ">
        <Button className="mt-2 bg-green-600 text-white">
          <Link href="/BuisnessCategories">
          Browse By Categories
          </Link>
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-2 py-6 px-4 overflow-y-auto flex-1">
        {formattedActiveProducts?.map((product: any) => (
          <ProductItem
            key={product.id}
            product={product}
            authenticatedUser={authenticatedUser}
          />
        ))}
      </div>
    </div>
  );
};


export default ActiveProducts;
