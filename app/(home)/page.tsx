
import Hero from "@/components/Hero";
import ActiveProducts from "@/components/active-products";
import { getActiveProducts } from "@/lib/server-actions";
import ActiveBusiness from "@/components/active-Business";
import { getActiveBusiness } from "@/lib/Business-server-action";
import {auth} from "@/auth";

const Home = async () => {

 const authenticatedUser = await auth()

  const activeProducts = await getActiveProducts();
const activeBusiness = await getActiveBusiness();

  console.log (activeProducts, 'active products here')


  return (
   <>
   <div className="">
   <Hero/>
    <ActiveProducts
    activeProducts={activeProducts}
    authenticatedUser={authenticatedUser}
    />
    <ActiveBusiness
    activeProducts={activeBusiness}
    />
   </div>
   </>
  );
}


export default Home;