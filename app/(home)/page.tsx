
import Hero from "@/components/Hero";
import ActiveProducts from "@/components/active-products";
import { getActiveProducts } from "@/lib/server-actions";
import ActiveBusiness from "@/components/active-Business";
import { getActiveBusiness } from "@/lib/Business-server-action";


const Home = async () => {

  const activeProducts = await getActiveProducts();
const activeBusiness = await getActiveBusiness();

  console.log (activeProducts, 'active products here')


  return (
   <>
   <div className="md:w-3/5 mx-auto py-10 px-6">
   <Hero/>
    <ActiveProducts
    activeProducts={activeProducts}
    
    />
    <ActiveBusiness
    activeProducts={activeBusiness}
    />
   </div>
   </>
  );
}


export default Home;