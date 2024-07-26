"use client"

import React from 'react'
import { useState } from 'react'
import { Button } from './ui/button'
import QandAs from './ui/QandAs'
import Modal from './ui/modals/QandAModal'

interface Element {
    Product : any
}

const OpenQA : React.FC<Element> = ({ Product}) =>  {
    const [open , setopen] = useState(false)

    const handleClick = ()=>{
        setopen(true)
    }
  return (
    <div>
        <Button className='bg-[#0E793C] text-[#ffffff] ' onClick={handleClick}>View Q&As</Button>
        <Modal visible={open} setVisible={setopen}>
 <QandAs Product={Product} />
        </Modal>
</div>
  )
}

export default OpenQA