import Hero from "@/components/Hero";
import { getActiveProducts } from "@/lib/server-actions";
import { getActiveBusiness } from "@/lib/Business-server-action";
import {auth} from "@/auth";
import Aboutus from "@/components/ui/Aboutus";
import Steps from "@/components/ui/HowItWorks";
import Cities from "@/components/ui/Cities";
import Avaragardi from "@/components/ui/Avaragardi";
import Testmonials from "@/components/ui/Testimonials";
import TrustComponent from "@/components/ui/AvatarGroups";
import IdeanMind from "@/components/ui/IdeainMind";
import Blog from "@/components/ui/Blog";
import Footer from "@/components/ui/Footer";

const Home = async () => {

 const authenticatedUser = await auth()

  const activeProducts = await getActiveProducts();
const activeBusiness = await getActiveBusiness();

  console.log (activeProducts, 'active products here')


  return (
   <>
    <div >
         <Hero/>
   <Aboutus/>
   <Cities/>
   <Steps/>
   <Avaragardi/>
   <Testmonials/>
   <TrustComponent/>
<IdeanMind/>
<Blog/>
<Footer/>
   </div>
   </>
  );
}


export default Home;