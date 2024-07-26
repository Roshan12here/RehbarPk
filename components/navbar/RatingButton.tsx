"use client"

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import Modal from '@/components/ui/modals/authModal'
import AuthContent from './auth-content'



const RatingButton = () => {
    const [open, setOpen] = useState(false)

    const handleSubmit = () => {
        setOpen(true) 
    }
    return (
        <div>
            <Button className='bg-[#0E793C] text-slate-50 ' onClick={handleSubmit}>Write a  Review</Button>
            <Modal visible={open} setVisible={setOpen}>
                <AuthContent/>
            </Modal>
        </div>
    )
}

export default RatingButton
