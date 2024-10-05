import { useEffect, useState } from "react"
interface UserProfile {
    _id: string;
    profilePic: string;
    username: string;
    email: string;
    phoneno: number;
    isAdmin: boolean;
    isHost: boolean;

    isBanned: boolean;
    isVerified: boolean;
  }
export const useUser = ()=>{
    const [userData,setUserData] = useState<UserProfile|null>(null)
  const fetchUser = async()=>{
    const res = await fetch('http://localhost:3000/api/user/me')
    const json = await res.json();
    console.log(json)
    setUserData(json.user)
  }
    useEffect(()=>{
    fetchUser()
    },[])

    return userData
}