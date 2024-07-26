import React from 'react'
import MyProductsa from '../My-Businesses/DashboardComp'
import MyProducts from '../my-products/DashBoardComp'

 const Dashboard = () => {
  return (
    <div
    className='flex justify-center items-center h-screen w-full bg-gray-100'
    >
        <MyProducts/>
        <MyProductsa/>
    </div>
  )
}


export default Dashboard