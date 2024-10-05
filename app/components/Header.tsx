'use client'
import { Box, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverTrigger } from '@chakra-ui/react'
import React from 'react'
import { FaUser } from 'react-icons/fa'
import { MdMenu } from 'react-icons/md'
import { useUser } from '../Hooks/useUser'
import Link from 'next/link'

const Header = () => {
    const userData =  useUser();

   
    console.log(userData)
  return (
    <div className=' max-md:hidden w-full h-16   bg-white flex  justify-between items-center ' >

    <div className='ml-4'>
  <Link href={'/'}><img className=' w-28' src='https://www.edigitalagency.com.au/wp-content/uploads/airbnb-logo-png-transparent-background.png'/></Link> 
   </div>
   
   <div className=' mr-4 flex  items-center' >
     
     
    
     <Popover>
<PopoverTrigger>
<div className=' w-20 h-10 px-2 cursor-pointer  rounded-3xl border-gray-400  border-1 hover:shadow-lg hover:bg-slate-50  justify-around  flex items-center mx-4 '>
     <MdMenu className=" text-2xl     " />
     <FaUser  />
    
     </div>
</PopoverTrigger>
<PopoverContent mr={"30px"} w={"160px"}>


<PopoverBody   >




{!userData?<div>
<div className=' flex justify-center my-2'>
<Link className=' w-full'  href={'/login'}><button className='  py-1 px-5  w-[90%]   text-white font-semibold rounded-md bg-gradient-to-r from-red-500 to-pink-500'>Login</button></Link>
</div>

<div className=' flex justify-center my-2'>
<Link className=' w-full'  href={'/admin/dashboard'}><button className='  py-1 px-5  w-[90%]    text-white font-semibold rounded-md bg-gradient-to-r from-red-500 to-pink-500'>Register</button></Link>
</div>
</div>:<div>
<div className=' flex justify-center my-2'>
<Link className=' w-full' href={'/admin/dashboard'} ><button className='  py-1 px-5  w-[90%]    text-white font-semibold rounded-md bg-gradient-to-r from-red-500 to-pink-500'>Dashboard</button></Link>
</div>

<div className=' flex justify-center my-2'>
<Link className=' w-full' href={'/aboutme'}><button className='  py-1 px-5  w-[90%]    text-white font-semibold rounded-md bg-gradient-to-r from-red-500 to-pink-500'>Profile</button></Link>
</div>

<div className=' flex justify-center my-2'>
<Link className=' w-full' href={'/'}><button className='  py-1 px-5  w-[90%]    text-white font-semibold rounded-md bg-gradient-to-r from-red-500 to-pink-500'>Logout</button></Link> 
</div>

</div>}






</PopoverBody>
</PopoverContent>
</Popover>
   
   </div>
  </div>
  )
}

export default Header