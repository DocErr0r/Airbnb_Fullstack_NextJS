import { useEffect, useState } from "react"
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
interface Booking {
    _id: string;
    hotelId: string;
    userId: string;
    bookingName: string;
    checkInDate: Date;
    checkOutDate: Date;
    checkedIn: boolean;
    checkedOut: boolean;
    adults: number;
    children: number;
    infants: number;
    totalguest: number;
    days: number;
    price: number;
    totalPrice: number;
    priceWithTax: number;
    noofreview:number,
    hotelImg:string,
    hostName: string,
    rating: number,
    location:string,
    hotelTitle:string
  }
  
export const useBookings = (update?:boolean)=>{
const [bookingData,setBookingData] = useState<Booking[]|null>(null);
const [loading,setLoading] = useState(false);
const [error,setError] = useState(null);
const [success,setSuccess] = useState(null);

const fetchBookingData = async()=>{
const res = await fetch('http://localhost:3000/api/booking/get');
const data = await res.json();
setBookingData(data.bookings);

}

useEffect(()=>{
 fetchBookingData();
},[update])

return bookingData
}