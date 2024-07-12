import { auth } from "@/auth";
import Navbar from "@/components/navbar/navbar";
import {
  getNotifications,
  getProductsByUserId,
  isUserPremium,
} from "@/lib/server-actions";
import { redirect } from "next/navigation";
import ClientOnly from "@/components/ClientOnly";

const NewProductLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const authenticatedUser = await auth();

  const notifications = await getNotifications()

  const products = await getProductsByUserId(authenticatedUser?.user?.id || "");

  const isPremium = await isUserPremium();

  if (!isPremium && products.length === 222) {
    redirect("/");
  }

  if (!authenticatedUser) {
    redirect("/");
  }
  

  return (
    <html lang="en">
      <ClientOnly >
      <body>
        <Navbar
          authenticatedUser={authenticatedUser}
          products={products}
          notifications={notifications}
          />
        
        {children}
        
        </body>
          </ClientOnly>
    </html>
  );
};

export default NewProductLayout;
