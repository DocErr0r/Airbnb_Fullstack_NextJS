'use client'
import React, { useState } from 'react'
import { CiHeart, CiStar } from "react-icons/ci";
import { FaDoorClosed, FaStar } from 'react-icons/fa';
import { MdRoomService } from 'react-icons/md';
import { TbGridDots } from "react-icons/tb";
import { Carousel } from 'react-responsive-carousel';
import { CiAlarmOn } from "react-icons/ci";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { DateRange } from 'react-date-range';
import { GiButterToast } from "react-icons/gi";
import { FaWifi } from "react-icons/fa";
import { MdIron } from "react-icons/md";
import { MdLocalLaundryService } from "react-icons/md";
import { FaUtensilSpoon } from "react-icons/fa";
import { RootState } from '../../redux/store';
import { decrementAdults, decrementChildren, decrementInfents, incrementAdults, incrementChildren, incrementInfents} from '../../redux/features/queryparameter/queryparameterSlice';
import { CiLocationOn } from "react-icons/ci";
import { FaWater } from "react-icons/fa";
import { PiTelevision } from "react-icons/pi";
import { MdOutlineSportsGymnastics } from "react-icons/md";
import { HotelInterface } from '@/app/page';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { MdOutlinePool } from "react-icons/md";
import { FaHotTub } from "react-icons/fa";
import { MdCottage } from "react-icons/md";
import { FaFire } from "react-icons/fa";
import { GiHeatHaze } from "react-icons/gi";
import { useHotel } from '@/app/Hooks/useHotel';
import { daysfun } from '@/app/utils/days';
import { BiSolidDryer } from "react-icons/bi";
import { GiSmokeBomb } from "react-icons/gi";
import Link from 'next/link';
const page = ({ params }: { params: { id: string } }) => {

  const [photoTourBox,setPhotoTourBox] = useState<boolean>(false);
  const [showGuestBox,setShowGuestBox] = useState<boolean>(false);
  const [showCalendar,setShowCalendar] = useState(false);
  const today = new Date();

  const hotelData:HotelInterface|null = useHotel(params.id)

  const dispatch = useDispatch();
  const queryparameters = useSelector((state:RootState)=>state.queryParameter)
  console.log(hotelData)

  


// Clone the date to avoid modifying the original
const nextDay = new Date(today);
const maxDateOfCalendar = new Date(today);
maxDateOfCalendar.setDate(today.getDate()+700)

nextDay.setDate(today.getDate() + 2);
   const [date,setDate] = useState([
    {
      startDate: new Date(),
      endDate:nextDay,
      key: 'selection'
    }
  ])

  const handlerHideGuest = ()=>{
  
    setShowGuestBox(false)
    }

    const handlerShowGuest = ()=>{
      setShowGuestBox(true)


    }

   const days = daysfun(date[0].startDate.toISOString().slice(0,10),date[0].endDate.toISOString().slice(0,10))

    if(!hotelData){
      return <div>loading...</div>
    }

    const totalAmount = hotelData.price*days
    const hotelFees = (totalAmount*3)/100
    const totalAmoutAfterFees = hotelFees+totalAmount;



  const handlerShowPhotoTourBox = ()=>{
    if(photoTourBox){
      setPhotoTourBox(false)
    }else{
      setPhotoTourBox(true);
    }
  }

 

  const handlerShowCalendar = ()=>{
  
    setShowCalendar(!showCalendar)

  }


  
  return (
   <div className=' min-h-screen w-full'>
     <div className= ' h-screen w-full '>
       
       <div className='  min-h-screen   w-full p-10  max-md:p-0 '>
        

     {/* mobile carousel */}
       <Carousel  className=' md:hidden' showStatus={false} showThumbs={false}>
      
        {hotelData.image.map((image,index)=>{
          return  <div className=' w-full    h-60 bg '> <img src={image.url} alt="" /></div>
        })}
        



            </Carousel>
       

        <div className=' w-full flex   justify-between max-md:p-4'>
        <p className=' max-md:text-xl text-2xl  font-semibold'>{hotelData.destination}</p>
        <div  className=' flex justify-center items-center max-md:hidden'>
        <CiHeart  className = "text-xl" />
        <p className= "border-b-2 border-black ml-1">Like</p>
        </div>
        </div>
        
        <div className=' max-md:hidden w-full relative   h-80 flex  '>
        <button className=' hover:bg-gray-200 absolute bottom-4 right-4 border-2  border-gray-600 bg-slate-100  rounded-md p-1 text-sm flex items-center font-semibold' onClick={handlerShowPhotoTourBox}>
       
        <p> <TbGridDots className="m-1"  /></p>  Show all photos
        </button>
         
         <div className=' w-1/2 h-full  p-2' >
           <img className=' w-full   h-full rounded-l-xl' src={hotelData.image[0].url} alt="" />
         </div>
         <div className=' w-1/2 h-full ' >
          <div className=' w-full h-40 flex' >
            <div className=' w-1/2  h-40 p-2'>
            <img className=' w-full   h-full ' src={hotelData.image[1].url} alt="" />
            </div>
            <div className=' w-1/2  h-full p-2'>
            <img className=' w-full   h-full   rounded-tr-xl' src={hotelData.image[2].url} alt="" />
            </div>
           
          </div>
          <div className=' w-full h-40  flex'>
             <div className='  w-1/2 h-full p-2 '>
             <img className=' w-full   h-full   ' src={hotelData.image[3].url} alt="" />
             </div>
             <div className='  w-1/2 h-full  p-2'>
             <img className=' w-full   h-full   rounded-br-xl' src={hotelData.image[4].url} alt="" />
             </div>
          </div>
         </div>
        </div>

        <div className=' w-full  min-h-screen  flex'>
          <div className=' w-4/6  max-md:w-full  h-full'>
                <div className=' p-5'>
                  <p className=' text-2xl font-semibold '> {hotelData.title}</p>
                   <p   >{hotelData.totalguest} Guest .  {hotelData.bedrooms} Bedroom . {hotelData.bathrooms} Bathroom</p>

                   {hotelData.numofreview===0? <div className=' flex items-center '>
                
                    <p className=' border-b-2 border-black ml-2 '>No Reviews</p> 
                   </div>: <div className=' flex items-center '>
                <FaStar/>  <p className=' ml-2'>{hotelData.rating} </p>
                    <p className=' border-b-2 border-black ml-2 '>27 Reviews</p> 
                   </div>}
                  
                  </div> 
                  <hr />
                  <div className=' w-full h-20  flex items-center p-5'>
                   <img className=' w-14 h-14 rounded-full' src="https://images.unsplash.com/photo-1575936123452-b67c3203c357?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D" alt="" />

                   <p className=' ml-4 font-semibold'>Hosted By {hotelData.hostName}</p>

                  </div>

                  <hr />

                  <div className=' w-full  p-5'>
                  
                    <div className=' mt-2 w-full h-16 flex items-center'>
                     <FaDoorClosed className=" text-3xl"/>
                     <div className='ml-4'>
                     <p className='  font-medium '>Dedicated Workspace</p>
                     <p  className=' font-light text-sm text-gray-500'>Free wifi is available</p>
                     </div>

                     
                    </div>

                    <div className=' mt-2 w-full h-16  flex items-center'>
                     <MdOutlinePool className=" text-3xl"/>
                     <div className='ml-4'>
                     <p className='  font-medium '> Dive right in</p>
                     <p  className=' font-light text-sm text-gray-500'>This is one of the few places in the area with a pool.</p>
                     </div>

                     
                    </div>

                    <div className=' mt-2 w-full h-16  flex items-center'>
                     <CiLocationOn className=" text-3xl"/>
                     <div className='ml-4'>
                     <p className='  font-medium '>Great Location</p>
                     <p  className=' font-light text-sm text-gray-500'>Great location</p>
                     </div>

                     
                    </div>
                    
                  </div>

                  <hr />

                 
             <hr />
                  <div className=' w-full   min-h-0  bg-white  justify-center p-2'>
                   <p className=' text-2xl font-bold my-4'>Description </p>
                   <p  className=' my-2 px-2'>{hotelData.desc}</p>
                  </div>

                 <hr />
                 
                 <div className='  p-2'>
                    <p className={`text-2xl font-bold my-2 `}>What this place offers</p>
                <div className='w-full   min-h-0   flex justify-center'>
                <div className=' w-full h-full '>
                       <div className=' w-full pl-2 h-12 flex bg-white items-center'>
                       <FaWifi className='  w-6 h-6' />
                       <p className={` pl-3 ${hotelData.amenities.wifi?"":"line-through"}`}>Wifi</p>
                       </div>

                       <div className=' w-full pl-2 h-12 flex bg-white items-center'>
                       <FaUtensilSpoon className='  w-5 h-5' />
                       <p className={` pl-3 ${hotelData.amenities.kitchen?"":"line-through"}`}>Kitchen</p>
                       </div>
                       <div className=' w-full pl-2 h-12 flex bg-white items-center'>
                       <FaWater  className='  w-5 h-5' />
                       <p className={` pl-3 ${hotelData.amenities.pool?"":"line-through"}`}>Pool</p>
                       </div>
                       <div className=' w-full pl-2 h-12 flex bg-white items-center'>
                       <PiTelevision className='  w-5 h-5' />
                       <p className={` pl-3 ${hotelData.amenities.tv?"":"line-through"}`}>T.V</p>
                       </div>
                       <div className=' w-full pl-2 h-12 flex bg-white items-center'>
                       <GiButterToast className='  w-6 h-6' />
                       <p className={` pl-3 ${hotelData.amenities.breakfast?"":"line-through"}`}>Breakfast</p>
                       </div>

                       <div className=' line-through w-full pl-2 h-12 flex bg-white items-center'>
                       <CiAlarmOn className='  w-6 h-6' />
                       <p className={` pl-3 ${hotelData.amenities.carbonmonooxidealarm?"":"line-through"}`}>Carbon monoxide Alarm</p>
                       </div>

                       <div className=' w-full pl-2 h-12 flex bg-white items-center'>
                       <MdIron className='  w-7 h-7' />

                       <p className={` pl-3 ${hotelData.amenities.iron?"":"line-through"}`}>Iron</p>
                       </div>
                        
                       <div className=' w-full pl-2 h-12 flex bg-white items-center'>
                       <MdOutlineSportsGymnastics  className='  w-7 h-7' />

                       <p className={` pl-3 ${hotelData.amenities.gym?"":"line-through"}`}>Gym</p>
                       </div>
                     
                      
                      
                     </div>
                     <div className=' h-full w-full '>
                     <div className=' w-full pl-2 h-12 flex bg-white items-center'>
                       <BiSolidDryer className='  w-6 h-6' />
                       <p className={` pl-3 ${hotelData.amenities.dryer?"":"line-through"}`}>Dryer</p>
                       </div>   <div className=' w-full pl-2 h-12 flex bg-white items-center'>
                       <MdLocalLaundryService className='  w-6 h-6' />
                       <p className={` pl-3 ${hotelData.amenities.washingmachine?"":"line-through"}`}>Washing Machine</p>
                       </div>   <div className=' w-full pl-2 h-12 flex bg-white items-center'>
                       <MdCottage className='  w-6 h-6' />
                       <p className={` pl-3 ${hotelData.amenities.cot?"":"line-through"}`}>Cot</p>
                       </div>   <div className=' w-full pl-2 h-12 flex bg-white items-center'>
                       <FaHotTub  className='  w-6 h-6' />
                       <p className={` pl-3 ${hotelData.amenities.hottub?"":"line-through"}`}>Hottub</p>
                       </div>   <div className=' w-full pl-2 h-12 flex bg-white items-center'>
                       <GiHeatHaze className='  w-6 h-6' />
                       <p className={` pl-3 ${hotelData.amenities.heating?"":"line-through"}`}>Heating</p>
                       </div>   <div className=' w-full pl-2 h-12 flex bg-white items-center'>
                       < FaFire  className='  w-6 h-6' />
                       <p className={` pl-3 ${hotelData.amenities.wifi?"":"line-through"}`}>Fire Alarm</p>
                       </div>   <div className=' w-full pl-2 h-12 flex bg-white items-center'>
                       <GiSmokeBomb className='  w-6 h-6' />
                       <p className={` pl-3 ${hotelData.amenities.smokealarm?"":"line-through"}`}>Smoke Alarm</p>
                       </div>   <div className=' w-full pl-2 h-12 flex bg-white items-center'>
                       <FaDoorClosed className='  w-6 h-6' />
                       <p className={` pl-3 ${hotelData.amenities.dadicatedspace?"":"line-through"}`}>Dadicated Space</p>
                       </div>
</div>
                </div>

                  </div>
       
       <hr />
           <div className=' max-md:hidden w-full  min-h-0  justify-center p-2 '>
            <p className=' text-2xl font-bold my-5'>{days} nights in {hotelData.city}</p>
           <DateRange  className=' rounded-2xl p-4 w-[90%]  shadow-2xl '
       
       onChange={item => setDate([item.selection] as any)}
      
     rangeColors={["black"]}
       ranges={date as any}
       months={2}
       direction="horizontal"
       minDate={new Date() as any}
       maxDate={  maxDateOfCalendar }
     />

           </div>

           <hr />


           {/* mobile Calender 
           ---------------- */}

<div className=' md:hidden bg-fuchsia-500 w-full  min-h-0 flex justify-center p-2 '>
           <DateRange  className='  rounded-2xl  w-[90%]  shadow-2xl '
       
       onChange={item => setDate([item.selection] as any)}
      
     rangeColors={["black"]}
       ranges={date as any}
       months={1}
       direction="horizontal"
       minDate={new Date() as any}
       maxDate={  maxDateOfCalendar }
     />

           </div>

          </div>

          <div className=' max-md:hidden  w-2/6 p-4 relative    mix-h-full'>
             <div className='   sticky top-4 bottom-0 right-0 left-0   bg-white   min-h-0 rounded-xl shadow-2xl p-6'>
             <p className=' text-lg font-semibold '>₹ {hotelData.price} night</p>
             <div className='  h-24  mt-2 rounded-xl '>
               <div className=' h-12 w-full rounded-t-xl flex focus:border-2 border-black cursor-pointer ' tabIndex={0}>
                 <div className=' h-full  w-full  items-center p-2  rounded-tl-xl border-1  focus:border-black focus:border-2 ' tabIndex={0} onClick={handlerShowCalendar}>
                   <p className=' uppercase text-xs font-semibold'>check-in</p>
                   <p className=' uppercase text-xs font-semibold'>{date[0].startDate.getDate()}- {date[0].startDate.getMonth()+1}- {date[0].startDate.getFullYear()} </p>
                 </div>

                 <div  className=' h-full   w-full   items-center p-2 border-1 rounded-tr-xl focus:border-2 focus:border-black' tabIndex={0}  onClick={handlerShowCalendar}>
                 <p className=' uppercase text-xs font-semibold'>checkOut</p>
                   <p className=' uppercase text-xs font-semibold'>{date[0].endDate.getDate()}- {date[0].endDate.getMonth()+1}- {date[0].endDate.getFullYear()}</p>
                 </div>
               </div>

             <div  className=' border-1  rounded-b-xl focus:border-2  focus:border-black cursor-pointer w-full h-12  flex justify-between  items-center p-2' onClick={handlerShowGuest} tabIndex={0}>
                <div>
               <p className=' uppercase text-xs font-semibold'>guest</p>
                   <p className=' uppercase text-xs font-semibold'>{queryparameters.adults+queryparameters.children+queryparameters.infents} Guest</p>
                   </div>
                   <div>
                    &darr;
                   </div>
               </div>
             </div>
         <Link href={`http://localhost:3000/book?adults=${queryparameters.adults}&children=${queryparameters.children}&infents=${queryparameters.children}&start=${date[0].startDate.getFullYear()}-${date[0].startDate.getMonth()+1}-${date[0].startDate.getDate()}&end=${date[0].endDate.getFullYear()}-${date[0].endDate.getMonth()+1}-${date[0].endDate.getDate()}&days=${days}&totalamount=${totalAmoutAfterFees}&hotelid=${hotelData._id}&guest=${queryparameters.adults+queryparameters.infents+queryparameters.children}`}>   <button className=' w-full mt-4 h-12 text-md text-white font-bold bg-gradient-to-r from-red-500 to-pink-500 rounded-xl'>Reserve</button></Link> 
              <div className=' flex   justify-between p-2'>
                <p className=' underline'> ₹ {hotelData.price} * {days} nights </p>
                <p > ₹ {totalAmount}</p>
              </div>

              <div className=' flex   justify-between p-2'>
                <p className=' underline'>Airbnb Fees(3%) </p>
                <p >₹ {hotelFees}</p>
              </div>
                
                <hr />
              <div className=' flex justify-between p-2  mt-4'>
                <p className=' font-semibold '>Total Before Tax</p>
                <p className=' font-semibold'>₹ {totalAmoutAfterFees}</p>
              </div>
             

          
             </div>
           
             
            </div>
        </div>


<hr />
<p className='  text-2xl font-bold my-4'>Reviews</p>
   {hotelData.overallrating>=4.5? <div className=' w-full mt-2 '>
     
       <div className=' w-full h-44   flex justify-center items-center'>

        <div className=' flex'>
        <img className='   w-24 h-36' src='https://a0.muscache.com/im/pictures/airbnb-platform-assets/AirbnbPlatformAssets-GuestFavorite/original/78b7687c-5acf-4ef8-a5ea-eda732ae3b2f.png'/>
        <p className=' font-bold text-7xl'>{hotelData.overallrating.toFixed(2)}</p>
        <img  className='   w-24 h-36'  src="https://a0.muscache.com/im/pictures/airbnb-platform-assets/AirbnbPlatformAssets-GuestFavorite/original/b4005b30-79ff-4287-860c-67829ecd7412.png" alt="" />
        </div>

       </div>
       <div className=' w-full  flex justify-center'>

        <p className=' text-xl font-bold'>Guest favourite</p>
        </div>
        <div className=' w-full flex justify-center'>
             <div className='  w-72 '>
              <p>One of the most loved homes on Airbnb based on ratings, reviews and reliability.</p>
             </div>
     
       </div>
    </div>
:""}
        <div className=' w-full  min-h-0  bg-white'>
           
           <div className=' h-16  flex items-center p-10  max-md:p-4 '>
             <p className=' underline flex items-center text-xl font-medium '> <FaStar className="  mr-3"/> {hotelData.overallrating.toFixed(2)} • {hotelData.numofreview} Reviews</p>
           </div>


           <div className=' flex w-full flex-wrap p-10 max-md:p-4 '>
   

  {hotelData.reviews.map((review,index)=>{
    return <div key={review.id} className='  max-md:w-full w-1/2    '>


    <div className=' flex '>
      <img className=' p-2 w-16 h-16 rounded-full content-center  object-cover ' src="https://imgv3.fotor.com/images/slider-image/A-blurry-image-of-a-woman-wearing-red.jpg" alt="" />
    
      <div className='p-2 flex items-center'>
        <p>{review.username}</p>
       
      </div>
    </div>
    
    <div className=' flex items-center'>
    <div className=' flex'>

      {Array(Math.ceil((review.accuracy+review.checkin+review.cleanliness+review.communication+review.location+review.value)/6)).fill("").map((star,index)=>{
        return  <FaStar key={index} className="  h-3 w-3"/>
      })}
     
     
    </div>
     <p className=' ml-2  text-xs font-bold'> • 3 Weeks Ago</p>
    </div>
    
    <div className=' w-full  min-h-0 py-2'>
     <p>{review.comment}</p>
    </div>
    </div>
  })}







           


         
        </div>


        
        <div className=' w-full p-10 max-md:p-4'>

       
          <button className=' p-2 max-md:w-full  bg-white border-2 border-black rounded-lg'>Show All Reviews</button>
        
        </div>
        </div>
       </div>
      
     </div>

 


{/* 
   show Calender Desktop */}
   {showCalendar&&<div className=' fixed left-0 top-0 right-0 bottom-0 bg-black/75 flex justify-center items-center'>
      <div className='   bg-white shadow-2xl p-2 rounded-2xl'>
        <div className='  mb-2'>
          <button className='  h-8 w-8 rounded-full hover:bg-gray-200  flex justify-center items-center  ' onClick={handlerShowCalendar}>X</button>
        </div>
    <DateRange 
       
       onChange={item => setDate([item.selection] as any)}
      
     rangeColors={["black"]}
       ranges={date as any}
       months={1}
       direction="horizontal"
       minDate={new Date() as any}
       maxDate={  maxDateOfCalendar }
     />
     </div>
    </div>
} 
   {photoTourBox&&<div className=' fixed top-0 left-0 right-0 bottom-0 bg-white items-center  flex flex-col  overflow-y-auto '>

<div className=' flex  w-full justify-end    p-4' > <button className='  bg-gray-100 hover:bg-gray-300  w-10 h-10 rounded-lg' onClick={handlerShowPhotoTourBox}>X</button> </div>
 
 <p className=' flex justify-center w-full text-2xl font-semibold pt-2 '>Photo Tour</p>


 
  {hotelData.image.map((image,index)=>{
    return  <img className='  w-2/5 h-80  mt-4  rounded-2xl' src={image.url}  alt="" />
  })}

  
   

</div>}



{/* Guest box */}

{showGuestBox&&<div className='  max-md:hidden fixed top-0 left-0 right-0 bottom-0 z-50    bg-black/50 flex justify-center  items-center' tabIndex={0} onFocus={handlerHideGuest}>
    <div className='   w-96  h-80 bg-white shadow-2xl rounded-xl p-4' onFocus={(e: React.FocusEvent<HTMLDivElement>)=>{
           e.stopPropagation();
          }}>

      <button className='  rounded-full hover:bg-gray-200 h-8 flex items-center justify-center w-8  p-2   bg-white text-lg  font-medium ' onClick={handlerHideGuest}>X</button>
       
        <div className=' flex justify-between h-14  my-4 p-2'>
      <div >
       <p className=' text-lg font-semibold'>Adult</p>
       <p className='  text-sm text-gray-400'>Age 13 or above</p>
      </div>
      <div className=' flex items-center justify-between '>
        <button className=' h-8 w-8 border-1 rounded-full ' onClick={()=>dispatch(decrementAdults())}>-</button>
        <p className=' h-8 w-8  flex items-center justify-center'>{queryparameters.adults}</p>
        <button className=' h-8 w-8 border-1 rounded-full ' onClick={()=>dispatch(incrementAdults())}>+</button>
      </div>
      </div>
   <hr />
      <div className=' flex justify-between h-14  my-4 p-2'>
      <div >
       <p className=' text-lg font-semibold'>
        Children
       </p>
       <p className='  text-sm text-gray-400'>Age 2-12</p>
      </div>
      <div className=' flex items-center justify-between '>
        <button className=' h-8 w-8 border-1 rounded-full ' onClick={()=>dispatch(decrementChildren())}>-</button>
        <p className=' h-8 w-8  flex items-center justify-center'>{queryparameters.children}</p>
        <button className=' h-8 w-8 border-1 rounded-full ' onClick={()=>dispatch(incrementChildren())}>+</button>
      </div>
      </div>

  <hr />
      <div className=' flex justify-between h-14   my-4 p-2'>
      <div >


       <p className=' text-lg font-semibold'>
     Infents
       </p>
       <p className='  text-sm text-gray-400'>Under 2</p>
      </div>
      <div className=' flex items-center justify-between '>
        <button className=' h-8 w-8 border-1 rounded-full ' onClick={()=>dispatch(decrementInfents())}>-</button>
        <p className=' h-8 w-8  flex items-center justify-center'>{queryparameters.infents}</p>
        <button className=' h-8 w-8 border-1 rounded-full ' onClick={()=>dispatch(incrementInfents())}>+</button>
      </div>
      </div>
    </div>
  </div>} 


   </div>
  )
}

export default page;