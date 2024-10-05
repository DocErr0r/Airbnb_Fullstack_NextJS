'use client'
import Sidebar from '@/app/components/Sidebar';
import React, { useEffect, useState } from 'react'
export interface UserProfile {
    _id: string;
    profilePic: string;
    username: string;
    email: string;
    password: string;
    cpassword: string;
    isAdmin: boolean;
    isHost: boolean;
}
const page = () => {
    const [showModel,setShowModal] = useState<boolean>(false)
    const [id,setId] = useState<string|null>(null)
    const [users,setUsers] = useState<UserProfile[]|null>(null)
    const [role,setRole] = useState(false);
    const [update,setUpdate] = useState(false)
    console.log(role)

    const handleChange = (e:any) => {
        setRole(e.target.value === "job-1");
      };
     const handlerUpdateRole = async()=>{
       
        const res = await fetch('http://localhost:3000/api/admin/user/edituser',{
            method:"PUT",
            body:JSON.stringify({id,role}),
            headers: {
              "Content-Type": "application/json",
            }
        })

        const json = await res.json();
        console.log(json)
        setShowModal(!showModel)
   
       setUpdate(!update)
        }


        const fetchAllUsers = async()=>{
            setUsers(null)
            const res = await fetch('http://localhost:3000/api/admin/user/allusers')
            const json = await res.json()
            console.log(json.allUsers)
            setUsers(json.allUsers)
           

        }
        useEffect(()=>{
         fetchAllUsers()
        },[update])


        if(!users){
            return <div>Loading....</div>
        }
    return (
      <>
      

      <Sidebar/>

<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                
                <th scope="col" className="px-6 py-3">
                   User ID
                </th>
                <th scope="col" className="px-6 py-3">
                    Username
                </th>
                <th scope="col" className="px-6 py-3">
                    Email
                </th>
                <th scope="col" className="px-6 py-3">
                    Admin
                </th>
             
             
                <th scope="col" className="px-6 py-3">
                    Action
                </th>
            </tr>
        </thead>
        <tbody>
        {users?.map((user)=>{
            return <tr key={user._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
             
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {user._id}
            </th>
            <td className="px-6 py-4">
                {user.username}
            </td>
            <td className="px-6 py-4">
                {user.email}
            </td>
            <td className="px-6 py-4">
                {user.isAdmin ? "Yes" : "No"}
            </td>
          
           
            <td className="flex items-center px-6 py-4">
                <button onClick={()=>{setShowModal(true) ,setId(user._id)}} className="font-medium  bg-blue-500 rounded-md  text-white px-5 py-2 hover:underline">Edit</button>
              
            </td>
        </tr>
        })}   
            
            
           
           
           
            
        </tbody>
    </table>

{/* 
    modal/dialog box */}


{(showModel)&&<div id="select-modal" tabIndex={-1} aria-hidden="true" className=" overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full  md:inset-0 h-[calc(100%)] max-h-full bg-black/40">
    <div className="relative p-4 w-full mx-auto items-center max-w-md max-h-full">
        
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
           
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Edit User Role
                </h3>
                <button onClick={()=>{setShowModal(false), setId("fdfd")}} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm h-8 w-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="select-modal">
                  
                   X
                </button>
            </div>
          
            <div className="p-4 md:p-5">
                <p className="text-gray-500 dark:text-gray-400 mb-4">Select User Role</p>
                <ul className="space-y-4 mb-4">
                    <li>
                        <input type="radio" onChange={()=>setRole(true)}className="hidden peer"  id="job-1" name="job" value="job-1"required />
                        <label htmlFor="job-1" className="inline-flex items-center justify-between w-full p-5 text-gray-900 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-500 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-900 hover:bg-gray-100 dark:text-white dark:bg-gray-600 dark:hover:bg-gray-500">                           
                            <div className="block">
                                <div className="w-full text-lg font-semibold"> Admin
                                </div>
                               
                            </div>
                           
                        </label>
                    </li>
                    <li>
                        <input type="radio" onChange={()=>setRole(false)} id="job-2" name="job" value="job-2" className="hidden peer"/>
                        <label htmlFor="job-2" className="inline-flex items-center justify-between w-full p-5 text-gray-900 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-500 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-900 hover:bg-gray-100 dark:text-white dark:bg-gray-600 dark:hover:bg-gray-500">
                            <div className="block">
                                <div className="w-full text-lg font-semibold">User</div>
                               
                            </div>
                         
                        </label>
                    </li>
                  
                </ul>
                <button onClick={handlerUpdateRole} className="text-white inline-flex w-full justify-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Set Role
                </button>
            </div>
        </div>
    </div>
</div> }


</div>

      </>
    )
}

export default page