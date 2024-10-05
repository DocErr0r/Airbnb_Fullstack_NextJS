import { useEffect, useState } from "react"
import { HotelInterface } from "../page";

export const useHotel = (id:string)=>{
const [status,setStatus] = useState("Loading")
const [hotelData,setHotelData]  = useState<HotelInterface|null>(null);
const fetchHotelData = async()=>{
const res = await fetch('http://localhost:3000/api/hotel/gethotel/'+id)
const data = await res.json();

setHotelData(data)
}
useEffect(()=>{
fetchHotelData()
},[])

return hotelData
}