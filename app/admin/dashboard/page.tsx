'use client'
import BarChart from '@/app/components/BarChart'
import DoughnutChart from '@/app/components/DoughnutChart'
import Sidebar from '@/app/components/Sidebar'
import { useBookings } from '@/app/Hooks/useBookings'
import Link from 'next/link'
import React, { useState } from 'react'

import { CiMenuBurger } from "react-icons/ci";

const page = () => {
  const bookings = useBookings()
  const [showSidebar,setShowSideBar] = useState<boolean>(false)
  if(!bookings){
    return <div>Loading...</div>
  }
  return (
    <>
     
     <div className=' w-full  min-h-[120vh] bg-gray-100'>
      
  <Sidebar/>

      <div className=' w-full flex   justify-center py-10'>
      <div className='  mx-7   w-36  h-20   bg-blue-500 text-white  shadow-lg flex flex-col items-center justify-center'>

        <p className=' font-bold'>USERS</p>
        <p className=' text-3xl font-bold'>15</p>

      </div>

      <div className='  mx-7 w-36  h-20  bg-red-400   text-white shadow-lg flex flex-col items-center   justify-center'>

<p className=' font-bold'>HOTELS</p>
<p className=' text-3xl font-bold'>3</p>

</div>

<div className='   mx-7  w-36  h-20  bg-yellow-500  text-white  shadow-lg flex flex-col items-center justify-center'>

<p className=' font-bold'>BOOKINGS</p>
<p className=' text-3xl font-bold'>{bookings.length}</p>

</div>

<div className='   mx-7  w-36  h-20  text-white  bg-green-600 shadow-lg flex flex-col items-center justify-center'>

<p className=' font-bold'>EARNING</p>
<p className=' text-3xl font-bold'>₹4500</p>

</div>
     </div>

    <div className=' min-h-0 flex items-center justify-center'>

     <div className='     w-3/5 '>
      <BarChart/>
     </div>
     <div className=' w-[300px] ml-7'>
     <DoughnutChart/>
     </div>
     </div>
     </div>
    </>
  )
}

export default page