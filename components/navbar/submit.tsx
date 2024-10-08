"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import MembershipModal from "../ui/modals/upgrade-membership-modal";
import UpgradeMembership from "../upgrade-membership";
import { isUserPremium } from "@/lib/server-actions";
import AuthContent from "../ChooseContent";
import Modal from "../ui/modals/authModal";

interface SubmitProps {
  products: any;
  authenticatedUser: any;
}

const Submit: React.FC<SubmitProps> = ({ products, authenticatedUser }) => {
  const router = useRouter();

  const [isUpgradeModalVisible, setIsUpgradeModalVisible] = useState(false);
const [ShowLoginModal , setShowLoginModal] = useState(false)

const HandleClickChoose =()=>{
setShowLoginModal(true)
}

  const handleClick = async () => {
    const isPremium = await isUserPremium()
    if (!isPremium && products.length === 222) {
      setIsUpgradeModalVisible(true);
    } else {
      router.push("/new-product");
    }
  };

  return (
    <div>
      <button onClick={HandleClickChoose} className="text-green-950 h-[6vh] w-[10vw] bg-white rounded-lg ">
        Get Started 
      </button >
      <MembershipModal
        visible={isUpgradeModalVisible}
        setVisible={setIsUpgradeModalVisible}
      >
        <UpgradeMembership authenticatedUser={authenticatedUser} />
      </MembershipModal>
    
    
      <Modal visible={ShowLoginModal} setVisible={setShowLoginModal}>
          <AuthContent />
        </Modal>

    </div>
  );
};

export default Submit;
