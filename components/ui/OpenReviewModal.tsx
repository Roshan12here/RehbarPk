"use client"

import React from 'react'
import { useState } from 'react'
import { Button } from './button'
import Modal from './modals/QandAModal'
import ModalAuth from './modals/authModal'
import AuthContent from '../navbar/auth-content'

interface OpenReviewModalProps {
Element : React.ReactNode
authenticaitedUser : any
}

const OpenReviewModal : React.FC<OpenReviewModalProps> = ({Element , authenticaitedUser}) => {
    const [open , setopen] = useState(false)
const [OpenRating ,SetOpenrating] = useState(false)

    const HabdleClickModal = () =>{
if(!authenticaitedUser){
    setopen(true)
}
else {
    SetOpenrating(true)
}
    }


    return (
    <div>
        <Button className='bg-[#0E793C] text-slate-50 ' onClick={HabdleClickModal}>Rate this Business</Button>
    <Modal visible={OpenRating} setVisible={SetOpenrating}>
{Element}
    </Modal>

<ModalAuth visible={open} setVisible={setopen}>
<AuthContent />
</ModalAuth>

    </div>
  )
}

export default OpenReviewModal