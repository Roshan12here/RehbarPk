
import Hero from "@/components/Hero";
import { getActiveProducts } from "@/lib/server-actions";
import { getActiveBusiness } from "@/lib/Business-server-action";
import {auth} from "@/auth";
import DestinationsTitle from "@/components/ui/DestActui";
import Box from "@/components/ui/DestinationSection";
import Aboutus from "@/components/ui/Aboutus";
import Steps from "@/components/ui/HowItWorks";
import Cities from "@/components/ui/Cities";

const Home = async () => {

 const authenticatedUser = await auth()

  const activeProducts = await getActiveProducts();
const activeBusiness = await getActiveBusiness();

  console.log (activeProducts, 'active products here')


  return (
   <>
    <div >
         <Hero/>
         <Box/>
   <DestinationsTitle/>
   <Aboutus/>
   <Cities/>
   <Steps/>
   </div>
   </>
  );
}


export default Home;