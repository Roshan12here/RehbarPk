import Image from "next/image";
import { FcGoogle } from "react-icons/fc";
import { PiFacebookLogoFill } from "react-icons/pi";
import { signIn } from "next-auth/react";

const AuthContent = () => {
  return (
    <div className="flex items-center justify-center   bg-gray-100">
      <div className="flex items-center justify-center flex-col p-6 bg-white rounded-lg shadow-md w-80">
        <Image
          src={"/logo/Rehbar-logo.png"}
          alt="logo"
          width={100}
          height={100}
          className="p-4 bg-[#17C964] rounded-xl hover:cursor-pointer"
        />

        <div className="flex flex-col items-center justify-center text-center mt-4">
          <div className="text-xl font-medium py-2">
            Get Started with Rehbar.Pk
          </div>
        </div>

        <button
          onClick={() => signIn("google", { redirect: false })}
          className="border rounded-md py-2 mt-4 flex hover:bg-[#0E793C] hover:text-white transition duration-900 items-center gap-2 px-6 w-full"
        >
          <FcGoogle className="text-lg" />
          Sign in with Google
        </button>

        <button
          onClick={() => signIn("facebook", { redirect: false })}
          className="border rounded-md py-2 mt-2 flex hover:bg-[#0E793C] hover:text-white items-center gap-2 px-6 w-full"
        >
          <PiFacebookLogoFill className="text-lg" />
          Sign in with Facebook
        </button>
      </div>
    </div>
  );
};

export default AuthContent;
