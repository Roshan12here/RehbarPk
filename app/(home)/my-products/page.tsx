import { auth } from "@/auth";
import { getOwnerProducts, isUserPremium } from "@/lib/server-actions";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { PiCrown, PiPlus } from "react-icons/pi";

const MyProducts = async () => {

  const authenticatedUser = await auth();

  if (!authenticatedUser) {
    redirect("/");
  }
  




  const products = await getOwnerProducts();

  const isPremium = await isUserPremium();

  return (
    <div className="mx-auto lg:w-3/5 py-10 px-6">
      {products.length === 0 ? (
        <div>
          <h1 className="text-3xl font-bold">No Destinations Found </h1>
          <p className="text-gray-500">
            Looks like you have not created any Destinations yet, click the button
            below to get started
          </p>

          <Link href={"/new-product"}>
            <div
              className="bg-green-600 text-white p-4 
            rounded-md mt-4 w-60 h-56 flex items-center justify-center flex-col"
            >
              <PiPlus className="text-3xl mb-4" />
              <p className="text-lg">Create a Destination</p>
            </div>
          </Link>
        </div>
      ) : (
        <div>
          <h1 className="text-3xl font-bold">Your Destinations</h1>
          <p>Manage your Destinations here</p>

          {isPremium ? (
            <div className="flex gap-x-4 items-center mt-10">
              <PiCrown className="text-2xl text-orange-300" />
              <p className="text-lg">You are a premium user</p>
            </div>
          ) : (
<>Your Destination are all listed below</>
          )}

          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mt-10">
            {products.map((product) => (
              <Link href={`/edit/${product.id} `} key={product.id}>
                <div>
                  <div
                    className="
                            rounded-lg 
                            hover:scale-105
                            transition-transform
                            duration-300
                            transform
                            ease-in-out
                            justify-center
                            items-center
                            border
                            p-2
                            
                            "
                  >
                    <Image
                      src={product.logo}
                      alt="logo"
                      width={1000}
                      height={1000}
                      className="object-cover rounded-lg h-36 w-full"
                    />
                  </div>
                  <h1 className="flex items-center justify-center font-bold ">{product.name}</h1>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MyProducts;
