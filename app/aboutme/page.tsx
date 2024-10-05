// src/components/AboutMe.js
'use client'
import React from 'react';
import { useUser } from '../Hooks/useUser';
import { useRouter } from 'next/navigation'
const AboutMe = () => {
  const user = useUser();
  const router = useRouter()



  if(!user){
   return <div>loading...</div>
  }


  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 md:p-12 max-w-4xl w-full">
        <div className="flex flex-col md:flex-row items-center md:items-start">
          <div className="w-32 h-32  md:w-48 md:h-48 rounded-full overflow-hidden md:mr-8">
            <img 
              src="https://media.licdn.com/dms/image/D4D03AQF_-cKXQ6va6g/profile-displayphoto-shrink_200_200/0/1682841600761?e=2147483647&v=beta&t=5vjmbbGYW-iZT5ETj69xPinnEdwIcFxVxo7tPCz0iW4" 
              alt="Profile" 
              className="w-full h-full object-cover" 
            />
          </div>
          <div className="mt-4 md:mt-0 md:text-left">
            <h1 className="text-3xl font-bold text-gray-900">{user.username}</h1>
            <p className="mt-2 text-gray-700">User ID: {user._id}</p>
            <p className="mt-2 text-gray-700">Email: {user.email}</p>
            
            <p className="mt-2 text-gray-700">Phone: {user.phoneno}</p>
           
            <div className="mt-6 flex space-x-4">
              <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300">Update Profile</button>
              <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition duration-300">Update Password</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutMe;
