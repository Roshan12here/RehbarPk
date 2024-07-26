"use client"

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import Modal from '@/components/ui/modals/authModal'
import AuthContent from './auth-content'
import { Card, CardHeader } from '../ui/card'



const RatingButton = () => {
    const [open, setOpen] = useState(false)

    const handleSubmit = () => {
        setOpen(true) 
    }
    return (
        <div>
            <Card className='bg-slate-50 mt-12 flex flex-col justify-center h-[42vh] items-center mx-auto my-auto'>
                <CardHeader className='text-center text-2xl font-semibold text-gray-900'>Please Login to write a review</CardHeader>
            <Button className='bg-[#0E793C] text-slate-50 ' onClick={handleSubmit}>Write a  Review</Button>
            <Modal visible={open} setVisible={setOpen}>
                <AuthContent/>
            </Modal>
            </Card>
        </div>
    )
}

export default RatingButton
