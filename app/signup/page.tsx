import React from 'react'
import { FaUser } from "react-icons/fa";
const page = () => {
  return ( 
    <>
    <div className=' w-full flex justify-center h-12 items-center text-lg font-medium border-b-2'>
      Log in or sign up
    </div>
    <div className=' w-full h-[100vh]  flex justify-center items-center '>
      
     
      <div className='  w-[400px] max-md:w-[90%] h-96 '>
        <p className=' text-2xl font-bold mb-3 '>Welcome to Airbnb</p>
         <div className=' w-full h-16 flex justify-center items-center'>
         <FaUser className=' text-4xl' />
         </div>
        <input type="file"  className=' w-full h-12 border-[1px] border-black outline-none rounded-md  my-4' />
        <input type="text"  placeholder=' Enter Your Name' className=' w-full h-12 border-[1px] border-black outline-none rounded-md  my-4' />
        <input type="text"  placeholder=' Enter Your Email' className=' w-full h-12 border-[1px] border-black  outline-none rounded-md  my-4' />
        <input type="text"  placeholder=' Enter Your Password' className=' w-full h-12 border-[1px] border-black  outline-none rounded-md  my-4' />
       
        <input type="text"  placeholder=' Enter Your Confirm Password' className=' w-full h-12 border-[1px] border-black outline-none rounded-md  my-4' />

        <div className=' w-full flex justify-end my-4'>
          <p className=' text-gray-500 cursor-pointer '>Already have an account ?</p>
        </div>

     
          <button className=' w-full hover:bg-red-500 bg-red-600 h-12 rounded-md text-white font-bold'>Continue</button>
      
        <div className=' my-3 w-full h-12 rounded-md border-[1px] border-black flex items-center'>
          <img className=' w-6  m-4 ' src="https://yt3.googleusercontent.com/rhqKhfZPaVKRfPi1UvaoekFcSVkipICyGmshnUT9SYMR2JMI8G40YqtaOqz94Ao5rdu_NE0nAw=s900-c-k-c0x00ffffff-no-rj" alt="" />
          <p className=' mr-8  font-medium w-full flex justify-center'>Continue with Google</p>
        </div>
      </div>

    </div>
    </>
  )
}

export default page