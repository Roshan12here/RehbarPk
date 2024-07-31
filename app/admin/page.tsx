import Image from "next/image";
import Link from "next/link";
import { PiBell, PiGear } from "react-icons/pi";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import PendingProducts from "./pending-products";
import PendingBusinesses from "./pending-Business";
import { auth } from "@/auth";
import { 
  getActiveProducts, 
  getAdminData, 
  getPendingProducts, 
  getRejectedProducts, 
  getTotalUpvotes, 
  getUsers
 } from "@/lib/server-actions";

 import { 
  getActiveBusiness, 
  getAdminDataBusiness, 
  getPendingBusiness, 
  getRejectedBusiness, 
  getTotalUpvotesBusiness, 
 } from "@/lib/Business-server-action";

import OverviewChart from "@/components/overview-chart";
import RecentActivity from "@/components/recent-activity";

const Admin = async () => {
  try {
    const users = await getUsers();
    const pendingProducts = await getPendingProducts();
    const authenticatedUser = await auth();
    const pendingBusiness = await getPendingBusiness();
    const activeBusiness = await getActiveBusiness();
    const getrejectedBusiness = await getRejectedBusiness();
    const activeProducts = await getActiveProducts();
    const rejectedProducts = await getRejectedProducts();
    const totalUpvotes = await getTotalUpvotes();
    const totalUpvotesBusiness = await getTotalUpvotesBusiness();
    const dataBusiness = await getAdminDataBusiness();
    const data = await getAdminData();

    const premiumUsers = users.filter((user) => user.isPremium);

    console.log(pendingProducts, "pending products here");

    return (
      <div className="px-8 md:px-20">
        <div>
          <div className="flex justify-between items-center">
            <div className="flex gap-x-6 items-center py-10">
              <Link href={"/"}>
                <Image
                  src={"/logo/Rehbar-logo.png"}
                  alt="logo"
                  width={500}
                  height={500}
                  className="w-20 h-20 md:w-40 md:h-40 border rounded-md cursor-pointer bg-green-300"
                />
              </Link>

              <div className="hidden md:block">
                <h1 className="text-3xl font-bold">Welcome back Umer Hayat</h1>
                <p className="text-gray-500">
                  Here is what&apos;s happening in your business today
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <PiBell className="text-2xl text-gray-500" />
              <PiGear className="text-2xl text-gray-500" />
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-md font-bold">Users</CardTitle>👤
              </CardHeader>
              <CardContent>
                {users.length}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-md font-bold">Premium Users</CardTitle>{" "}
                💰
              </CardHeader>
              <CardContent>
                {premiumUsers.length}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-md font-bold">
                  Active Destinations
                </CardTitle>{" "}
                📦
              </CardHeader>
              <CardContent>
              {activeProducts.length}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-md font-bold">
                  Active Businesses
                </CardTitle>{" "}
                📦
              </CardHeader>
              <CardContent>
              {activeBusiness.length}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-md font-bold">
                  Pending Destinations
                </CardTitle>{" "}
                🕒
              </CardHeader>
              <CardContent>
                {pendingProducts.length}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-md font-bold">
                  Pending Businesses
                </CardTitle>{" "}
                🕒
              </CardHeader>
              <CardContent>
                {pendingBusiness.length}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-md font-bold">
                  Rejected Destinations
                </CardTitle>
                👤
              </CardHeader>
              <CardContent>
                {rejectedProducts.length}
              </CardContent>
            </Card>
            <Card>

              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-md font-bold">
                  Rejected Businesses
                </CardTitle>
                👤
              </CardHeader>
              <CardContent>
                {getrejectedBusiness.length}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-md font-bold">Upvotes Destinations</CardTitle> 🔺
              </CardHeader>
              <CardContent>
                {totalUpvotes}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-md font-bold">Upvoted Businesses</CardTitle> 🔺
              </CardHeader>
              <CardContent>
                {totalUpvotesBusiness}
              </CardContent>
            </Card>

          </div>


          <div className="grid md:grid-cols-2 lg:grid-cols-7 my-4 gap-4">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle className="pb-10">Overview Of Destinations</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <OverviewChart data={data} />
              </CardContent>
            </Card>
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle className="pb-10">Overview of Businesses</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <OverviewChart data={dataBusiness} />
              </CardContent>
            </Card>

<Card className="w-full col-span-4 md:col-span-3">
  <CardHeader>
    <CardTitle>Recent Activity</CardTitle>
    <CardDescription>View recent activity</CardDescription>

  </CardHeader>
  <CardContent>
    <RecentActivity users={users} />
  </CardContent>
</Card>

          </div>

          <Separator className="my-10" />

          <div className="pb-10 space-y-10">
            <h1 className="text-2xl font-bold">Pending Destinations</h1>
            <PendingProducts
              pendingProducts={pendingProducts}
              authenticatedUser={authenticatedUser}
            />
          </div>
          
          <div className="pb-10 space-y-10">
            <h1 className="text-2xl font-bold">Pending Businesses</h1>
            <PendingBusinesses
              pendingProducts={pendingBusiness}
              authenticatedUser={authenticatedUser}
            />
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching data:", error);
    return (
      <div>
        <h1>Error loading admin page</h1>
        <p>Please try again later.</p>
      </div>
    );
  }
};

export default Admin;
