import { auth } from "@/auth";
import Navbar from "@/components/navbar/navbar";
import { getNotifications, getProductsByUserId } from "@/lib/server-actions";
import ClientOnly from "@/components/ClientOnly";

const ProductPageLayout = async ({
    children
} : Readonly <{
    children: React.ReactNode   
}>) => {

    //get the user from the server 

    const authenticatedUser = await auth(); 

    const notifications = await getNotifications();

    const products = await getProductsByUserId(authenticatedUser?.user?.id || "");

    return ( 
            <ClientOnly>
        <html lang="en">
                        <Navbar 
                            authenticatedUser={authenticatedUser}
                            products={products}
                            notifications={notifications}
                            />
            <main>
                {children}
            </main>

        </html>
                </ClientOnly>
    )
}

export default ProductPageLayout;