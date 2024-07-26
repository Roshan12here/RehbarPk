"use client"

import React, { useState } from 'react';
import { Button } from './ui/button';
import ShowModal from './ui/modals/share-product-modal';
import Modal from './ui/modals/authModal';
import AuthContent from './navbar/auth-content';
import ProductModal from './ui/modals/product-modal';
import EditProductModal from './ui/modals/edit-product-modal';


interface CommentModelProps { 
  element: React.ReactNode;
  authenticatedUser : any;
}

const CommentModel:  React.FC<CommentModelProps> =  ({ element,authenticatedUser }) => {
  const [authModalVisible, setAuthModalVisible] = useState(false);
  const [showauthModal, setShowauthModal] = useState(false);

  const HandleModalClick = () => {
    if (authenticatedUser) {
      setAuthModalVisible(true);
    }
    else if  (!authenticatedUser){
      setAuthModalVisible(true);
    }
  };

  return (
    <div>
      <Button className='bg-[#0E793C] text-slate-50 mt-6 text-center w-[22vw]' onClick={HandleModalClick}>
        Write a Review
      </Button>

      <EditProductModal visible={authModalVisible} setVisible={setAuthModalVisible}>
        {element}
      </EditProductModal>
      <Modal visible={showauthModal} setVisible={setShowauthModal}>
        <AuthContent />
      </Modal>
    </div>
  );
};

export default CommentModel;
