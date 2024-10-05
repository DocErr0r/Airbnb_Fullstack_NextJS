'use client'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation';
import React from 'react'
import { useHotel } from '../Hooks/useHotel';
import { HotelInterface } from '../page';

const page = () => {
  const searchParams=  useSearchParams()

const adults =  searchParams.get('adults');
const children =  searchParams.get('children');
const infents= searchParams.get('infents')
const hotelId = searchParams.get('hotelid')
const checkInDate = searchParams.get('start')
const checkOutDate = searchParams.get('end')
const  totalguest = searchParams.get('guest')
const totalamount = searchParams.get('totalamount')
const checkInday = new Date(checkInDate as any)
const checkOutday = new Date(checkOutDate as any)

const days = searchParams.get('days')
// console.log("adults : "+adults)
// console.log("children : "+children)
// console.log("infents : "+infents)
// console.log("hotelId : "+hotelId)
// console.log("checkInDate : "+checkInDate)
// console.log("checkOutDate : "+checkOutDate)
// console.log("totalamount : "+totalamount)
// console.log("days : "+days)

const tax = (Number(totalamount)*18)/100
const totalAfterTax= tax+Number(totalamount)
let hotelData:HotelInterface|null = null;
if(hotelId){
  hotelData = useHotel(hotelId)
}

if(!hotelData){
  return <div>loading....</div>
}

const createBooking = async()=>{
  const booking = {
    hotelId,
    checkInDate,
    checkOutDate,
    totalguest,
    price:Number(totalamount)/Number(days),
    totalPrice:totalamount,
   
    priceWithTax:totalAfterTax,
    days,
    adults,
    children,
    infents
  }

  const res = await fetch('http://localhost:3000/api/booking/create',{
    method:"POST",
    body:JSON.stringify(booking),
    headers: {
      "Content-Type": "application/json",
    }
  })
  const json =await res.json()
  console.log(json)
}

const createRazorPayOrder = async()=>{
  const res = await fetch("http://localhost:3000/api/booking/razorpayorder",{
   method:"POST",
   headers:{
     "Content-Type":"application/json"
   },
  
  
   body:JSON.stringify({
     amount:totalAfterTax
   })

  })
  const json = await res.json()
  console.log(json)
  return json.order
 }

const createRazorPayPayment = async()=>{
  if (typeof window !== 'undefined') {
  const key = "rzp_test_ls6onRT6Sk1T5y"
  const order = await createRazorPayOrder()
  const options ={
    key: key,
    amount: order.amount,
    currency: "INR",
    name: "Tarun Kataria",
    description: "Pay now",
    image: "https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fHNoaXJ0fGVufDB8fDB8fA%3D%3D&w=1000&q=80",
    order_id: order.id,
    // callback_url: "http://localhost:4000/api/v1/razorpay/paymentvarification",
    handler: async function (){
  
        createBooking()

      
      // alert(response.razorpay_payment_id);
      // alert(response.razorpay_order_id);
      // alert(response.razorpay_signature)
  },
    prefill: {
      name: "Tarun Kataria",
      email: "gaurav.kumar@gmail.com",
      contact: "9999999999"
    },
    notes: {
      address: "Razorpay Corporate Office"
    },
    theme: {
      color: "#9951F0"
    }
  }

  if(order){
  const razor =  new window.Razorpay(options) ;
 
  
      razor.open();
  }
  }
 
}
  return (
     <div className=' w-full h-[100vh] '>
      

        <div className=' w-full  flex'>
            <div className=' w-full  h-[500px] p-4 pl-7 mt-6'>
              <p className=' text-3xl font-bold '>Confirm and pay</p>
              <p  className=' mt-3 text-2xl font-semibold '>Your Trip</p>

              <div className=' flex justify-between mt-4 '>
                <div>
                    <p className=' text-xl font-semibold'>Dates</p>
                     <p className=' text-gray-500'>{checkInday.getDate()} {checkInday.toLocaleString('default', { month: 'long' }) }-{checkOutday.getDate()} {checkOutday.toLocaleString('default', { month: 'long' }) }</p>
                </div>
                <p className='text-lg  underline'>Edit</p>
              </div>
              <div className=' flex justify-between mt-4 '>
                <div>
                    <p className=' text-xl font-semibold'>Check in Time</p>
                     <p className=' text-gray-500'>12:00 PM - 4:00 PM</p>
                </div>
        
              </div>
              <div className=' flex justify-between mt-4 '>
                <div>
                    <p className=' text-xl font-semibold'>Guest</p>
                     <p className=' text-gray-500'>{totalguest}</p>
                </div>
                <p className='text-lg  underline'>Edit</p>
              </div>

              <button className=' mt-4 rounded-lg w-full h-12 bg-gradient-to-r from-red-500 to-pink-500  text-white font-semibold' onClick={createRazorPayPayment}>Book & Pay</button>
            </div>

            
            <div className=' w-full h-[500px] flex justify-center p-3 mt-6'>
              <div className=' w-[70%]  h-[350px] rounded-md border-[1px] border-gray-300'>
                   <div className=' w-full h-[140px] '>

                    <div className=' flex items-center h-full pl-3'>
                      <div className='  w-28 h-28  rounded-md  '>
                       <img className='w-28 h-28 rounded-md' src={hotelData.image[0].url}/>
                      </div>
                    {
                     (hotelData.numofreview!==0)?<div className=' w-[70%] h-28 pl-3'>
                     <p className=' text-lg font-semibold'>{hotelData.title}</p>
                     <p>⭐ {hotelData.overallrating}{`(${hotelData.numofreview} reviews)`}</p>
                    </div>:<div className=' w-[70%] h-28 pl-3'>
                     <p className=' text-lg font-semibold'>{hotelData.title}</p>
                     <p className=' underline'>No Reviews Yet</p>
                    </div>
                    }
                       
                    </div>
                    
                   </div>

                   <div className=' w-full flex justify-center py-3' >
                       <div className=' w-[90%] h-[1px] bg-gray-300'></div>
                   </div>

                   <div className=' px-4 py-2'>
                    <p className=' text-xl font-bold'>Price Details</p>
                    <div className=' flex justify-between'>
                      <p className=' text-lg '>₹{Number(totalamount)/Number(days)}*{days} nights</p>
                      <p className=' text-lg '>₹{totalamount}</p>
                    </div>
                    <div className=' flex justify-between'>
                      <p className=' underline text-lg '>Taxes</p>
                      <p className=' text-lg '>₹{tax}</p>
                    </div>
                   </div>

                   <div className=' w-full flex justify-center py-3' >
                       <div className=' w-[90%] h-[1px] bg-gray-300'></div>
                   </div>

                   <div className=' flex justify-between  px-4 py-2'>
                      <p className=' underline text-xl font-bold'>Total(INR)</p>
                      <p className=' text-xl font-semibold'>₹ {totalAfterTax}</p>
                    </div>
              </div>
</div>

        </div>

     </div>
  )
}

export default page