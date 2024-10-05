'use client'
import React, { useEffect, useState } from 'react'
import { useBookings } from '../Hooks/useBookings'
import { useHotel } from '../Hooks/useHotel';
import { HotelInterface } from '../page';

const page = () => {
  const bookingData =  useBookings();

  
  const checkInAndOutMonthFunc = (checkInDate:any)=>{
    const date = new Date(checkInDate as any)
    return date
 
}




  console.log(bookingData)
  if(!bookingData){
    return <div>Loading...</div>
  }

 

  return (
   <>


   {
    bookingData.map((booking,index)=>{
      return  <div key={booking._id}>
     

      <div className='  w-full  my-4 px-10 '>

          <div className='  w-full  border-[1px] border-gray-300  rounded-md'>
           
           <div className=' h-32 w-full  flex items-center'>

           <div className='  w-28 h-28  rounded-md   ml-5  '>
                     <img className='w-28 h-28 rounded-md' src={booking.hotelImg
                     }/>
                    </div>
                    <div className=' w-[70%] h-28 pl-3'>
                     <p className=' text-lg font-semibold'>{booking.hotelTitle}</p>
                     
                     <p>Location : {booking.location}</p>
                    </div>
              
           </div>

           <div className=' px-4 py-2'>
                  <p className=' text-xl font-bold'>Trip Details</p>
                  <div className=' flex justify-between'>
                    <p className=' text-lg '>Booking Id</p>
                    <p className=' text-lg '>{booking._id}</p>
                  </div>
                  <div className=' flex justify-between'>
                    <p className=' text-lg '>Hotel Id</p>
                    <p className=' text-lg '>{booking.hotelId}</p>
                  </div>
                  <div className=' flex justify-between'>
                    <p className=' text-lg '>Host Name</p>
                    <p className=' text-lg '>{booking.hostName}</p>
                  </div>
                  <div className=' flex justify-between'>
                    <p className=' text-lg '>Host Id</p>
                    <p className=' text-lg '>{booking.hotelId}</p>
                  </div>
                  <div className=' flex justify-between'>
                    <p className=' text-lg '>Booking Name</p>
                    <p className=' text-lg '>{booking.bookingName}</p>
                  </div>

                  
                  <div className=' flex justify-between'>
                    <p className=' text-lg '>User Id</p>
                    <p className=' text-lg '>{booking.userId}</p>
                  </div>
                  <div className=' flex justify-between'>
                    <p className=' text-lg '>Dates</p>
                    <p className=' text-lg '>{checkInAndOutMonthFunc(booking.checkInDate).getDate()} {checkInAndOutMonthFunc(booking.checkInDate).toLocaleString('default', { month: 'long' }) }-{checkInAndOutMonthFunc(booking.checkOutDate).getDate()} {checkInAndOutMonthFunc(booking.checkOutDate).toLocaleString('default', { month: 'long' }) }</p>
                  </div>
                  <div className=' flex justify-between'>
                    <p className='  text-lg '>Check-In Time</p>
                    <p className=' text-lg '>12:00 PM - 4:00 PM</p>
                  </div>
                  <div className=' flex justify-between'>
                    <p className='  text-lg '>Checked-In </p>
                    <p className={` text-lg font-bold ${booking.checkedIn?" text-green-500":" text-red-500"} `}>{booking.checkedIn?"Yes":"No"}</p>
                  </div>
                  <div className=' flex justify-between'>
                    <p className='  text-lg '>Checked-Out  </p>
                    <p className={` text-lg font-bold ${booking.checkedOut?" text-green-500":" text-red-500"} `}>{booking.checkedOut?"Yes":"No"}</p>
                  </div>
                  <div className=' flex justify-between'>
                    <p className='  text-lg '>Total Guest</p>
                    <p className=' text-lg '>{booking.totalguest} Guest</p>
                  </div>
                 </div>
         
                 <div className=' w-full flex justify-center py-3' >
                     <div className=' w-[90%] h-[1px] bg-gray-300'></div>
                 </div>
        
                 <div className=' px-4 py-2'>
                  <p className=' text-xl font-bold'>Paid Details</p>
                  <div className=' flex justify-between'>
                    <p className=' text-lg '>₹ {booking.price}*{booking.days} nights</p>
                    <p className=' text-lg '>₹ {booking.totalPrice}</p>
                  </div>
                  <div className=' flex justify-between'>
                    <p className=' underline text-lg '>Taxes</p>
                    <p className=' text-lg '>₹ {(booking.totalPrice)*18/100}</p>
                  </div>
                 </div>

                
                 <div className=' w-full flex justify-center py-3' >
                     <div className=' w-[90%] h-[1px] bg-gray-300'></div>
                 </div>
                 <div className=' flex justify-between  px-4 py-2'>
                    <p className=' underline text-xl font-bold'>Total(INR)</p>
                    <p className=' text-xl font-semibold'>₹{booking.priceWithTax}</p>
                  </div>

                  <div className=' w-full flex justify-center py-3' >
                     <div className=' w-[90%] h-[1px] bg-gray-300'></div>
                 </div>

                 <div className=' w-full flex justify-end px-3 my-3'>
                   <button className='  h-10 px-3 rounded-md bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold '>Review The Hotel</button>
                 </div>
          </div>

      </div>
  </div>
    })
   }
   </>
  )
}

export default page