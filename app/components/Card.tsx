import React from 'react'
import { FaStar } from "react-icons/fa";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { HotelInterface } from '../page';
interface CardProps{
hotelProps:HotelInterface
}
const Card = ({hotelProps}:CardProps) => {
  return (
    <div className='  max-md:w-80   w-[310px] h-96   p-2  rounded-lg cursor-pointer  border-slate-400      '>
        <div className=' w-full  h-72  bg-yellow-400 rounded-lg'>
        <Carousel showStatus={false} showThumbs={false} >
          {hotelProps.image.map((img)=>{
            return   <img key={img.public_id} className=' h-72 w-full rounded-lg' src={img.url} alt="" />
          })}
          
          
           </Carousel>
        </div>

        <div className=' w-full h-6  mt-3 flex' >
        
        <div className=' w-3/4 h-6  flex justify-center items-center   '>
        <p className='overflow-hidden whitespace-nowrap  text-ellipsis font-medium p-1'>{hotelProps.title}</p>
        </div>
        <div className=' w-1/4 h-6   flex items-center justify-center'>
        <FaStar  />
        <div className=' mx-2'>
            5.0
        </div>
       
</div>
        </div>

        <div className='  my-2 w-full'>
            <p className=' font-medium '>₹ {hotelProps.price} night</p>
        </div>

    </div>
  )
}

export default Card