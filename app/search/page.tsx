'use client'
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { HotelInterface } from '../page'
import { CiGlobe } from "react-icons/ci";
import { MdMenu } from "react-icons/md";
import { Popover } from '@chakra-ui/react';
import { FaUser } from 'react-icons/fa';
import { PopoverArrow } from '@chakra-ui/react';
import { PopoverCloseButton } from '@chakra-ui/react';
import { PopoverTrigger, PopoverContent, PopoverHeader, PopoverBody} from '@chakra-ui/react'
import Searchbox from '../components/Searchbox'
import Card from '../components/Card'

const page = () => {
const searchParams=  useSearchParams();
const [hotels,setHotels] = useState<HotelInterface[]|null>(null);
const destination =  searchParams.get('destination'); 
const category =  searchParams.get('category');
const hoteltype = searchParams.get('category')
const children = searchParams.get('children')
const propertytype = searchParams.get('propertytype')
const maxprice = searchParams.get('maxprice')
const minprice = searchParams.get('minprice')
const beds = searchParams.get('beds')
const bedrooms = searchParams.get('bedrooms')
const adults = searchParams.get('adults')
const start = searchParams.get('start')
const end = searchParams.get('end')
console.log(destination)

useEffect(()=>{
  const fetchHotels = async()=>{
    const res = await fetch(`http://localhost:3000/api/hotel/gethotels?destination=${destination}&category=${category}&hoteltype=${hoteltype}&minprice=${minprice}&maxprice=${maxprice}&children=${children}&beds=${beds}&bedrooms=${bedrooms}&start=${start}&end=${end}`);
    const json =await res.json();
    console.log("I am in fetch hotel")
    console.log(json);
    setHotels(json)
    }
fetchHotels()

},[])

  return (
    <>
    <div className=' w-full h-[100vh]'>

    <Searchbox/>
    <div className=' w-full flex  max-md:flex-col-reverse max-md:static  relative'>
    <div className=' w-full  z-30 bg-white min-h-0 flex flex-wrap justify-center'>


  {
    hotels?.map((hotel)=>{
      return <Card key={hotel._id} hotelProps={hotel}/>
    })
  }
    </div>

    <div className=' sticky top-0 w-full max-md:h-[40vh] h-[100vh] bg-green-400 '>
    <iframe className=' w-full h-full' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3536.891060841665!2d76.60708377412199!3d27.56589123171865!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39729991cb0d9d69%3A0xd0cb202a2d8e5564!2sSector%207%2C%20Alwar%2C%20Rajasthan%20301001!5e0!3m2!1sen!2sin!4v1708877035941!5m2!1sen!2sin"  loading="lazy" referrerPolicy=''></iframe>
    </div>
    </div>

    </div>
    </>
  )
}

export default page