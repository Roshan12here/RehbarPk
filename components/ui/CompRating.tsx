"use client"

import React from 'react'
import RatingComponent from '../RatingStar'
import { Button } from 'react-day-picker'
import { useState } from 'react'
import Modal from './modals/authModal'

const CompRating = () => {
    const [authModalVisible, setAuthModalVisible] = useState(false);

    const handleButtonClick = () => {
        setAuthModalVisible(true);
      };

  return (
    <div>
        <Button onClick={handleButtonClick}>Rate this Destination</Button>
        <Modal visible={authModalVisible} setVisible={setAuthModalVisible}>
            <RatingComponent />
        </Modal>
    </div>
  )
}

export default CompRating